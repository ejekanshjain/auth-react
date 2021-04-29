import { FC, useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Header } from './components/Header'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { Profile } from './pages/Profile'
import { AuthContext } from './AuthContext'

export const Routes: FC = () => {
  const { signedIn } = useContext(AuthContext) as any
  return (
    <BrowserRouter>
      {signedIn && <Header />}
      {!signedIn ? (
        <Switch>
          <Route path="/" component={SignIn} exact />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} exact />
        </Switch>
      )}
    </BrowserRouter>
  )
}
