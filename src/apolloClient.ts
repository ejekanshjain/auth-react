import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getAccessToken, getAccessTokenExpiry, setAuthState } from './authState'
import { fetchRefreshToken } from './fetchRefreshToken'

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: getAccessToken()
  }
}))

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL + '/graphql',
  credentials: 'include',
  fetch: (uri, options: any) => {
    if (
      options &&
      options.headers &&
      options.headers.authorization &&
      getAccessTokenExpiry() < Date.now()
    ) {
      return fetchRefreshToken()
        .then(res => res.json())
        .then(json => {
          if (
            json &&
            json.data &&
            json.data.refreshToken &&
            json.data.refreshToken.accessToken
          ) {
            const {
              userId,
              accessToken,
              issuedAt,
              expiresAt
            } = json.data.refreshToken
            setAuthState(userId, accessToken, issuedAt, expiresAt)
            options.headers.authorization = accessToken
          }
          return fetch(uri, options)
        })
        .catch(err => {
          console.error('Failed to refresh token', err)
          return fetch(uri, options)
        })
    } else return fetch(uri, options)
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
