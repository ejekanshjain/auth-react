import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'

import { setAuthState } from '../authState'
import { useMeQuery, useSignOutMutation } from '../generated/graphql'
import { AuthContext } from '../AuthContext'

export const Header: FC = () => {
  const { setSignedIn } = useContext(AuthContext) as any
  const { data } = useMeQuery()
  const [signOut] = useSignOutMutation()
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/signIn">Sign In</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
      Status: {data && data.me ? data.me.id : 'Not logged in'}
      <div>
        <button
          onClick={async () => {
            await signOut()
            setSignedIn(false)
            setAuthState('', '', 0, 0)
            window.location.href = '/'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
