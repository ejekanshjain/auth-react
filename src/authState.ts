const authState = {
  userId: '',
  accessToken: '',
  issuedAt: 0,
  expiresAt: 0
}

export const getAuthState = () => authState

export const setAuthState = (
  userId: string,
  accessToken: string,
  issuedAt: number,
  expiresAt: number
) => {
  authState.userId = userId
  authState.accessToken = accessToken
  authState.issuedAt = issuedAt
  authState.expiresAt = expiresAt
}

export const getAccessToken = () => authState.accessToken

export const getAccessTokenExpiry = () => authState.expiresAt * 1000
