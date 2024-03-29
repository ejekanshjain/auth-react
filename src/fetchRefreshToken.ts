export const fetchRefreshToken = () =>
  fetch(process.env.REACT_APP_API_URL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      query: `
                {
                  refreshToken {
                    userId
                    accessToken
                    issuedAt
                    expiresAt
                  }
                }
            `
    })
  })
