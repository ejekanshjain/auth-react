import { FC, FormEvent, useState, useContext } from 'react'

import { setAuthState } from '../authState'
import { useSignInMutation } from '../generated/graphql'
import { AuthContext } from '../AuthContext'

export const SignIn: FC = () => {
  const { setSignedIn } = useContext(AuthContext) as any
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signIn] = useSignInMutation()
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await signIn({
      variables: {
        email,
        password
      }
    })
    setPassword('')
    if (response.data && response.data.signIn) {
      const { userId, accessToken, issuedAt, expiresAt } = response.data.signIn
      setEmail('')
      setSignedIn(true)
      setAuthState(userId, accessToken, issuedAt, expiresAt)
    }
  }
  return (
    <form onSubmit={handleSignIn}>
      <div>
        <input
          type="email"
          value={email}
          placeholder="Email Address"
          onChange={e => setEmail(e.currentTarget.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.currentTarget.value)}
        />
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
  )
}
