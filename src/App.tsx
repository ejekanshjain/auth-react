import { FC, useEffect, useState } from 'react'

import { Routes } from './Routes'
import { setAuthState } from './authState'
import { fetchRefreshToken } from './fetchRefreshToken'
import { AuthContext } from './AuthContext'

export const App: FC = () => {
  const [loading, setLoading] = useState(true)
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    fetchRefreshToken()
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
          setSignedIn(true)
          setAuthState(userId, accessToken, issuedAt, expiresAt)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to refresh token', err)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      <Routes />
    </AuthContext.Provider>
  )
}
