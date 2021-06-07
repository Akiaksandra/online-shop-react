import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../header';
import TransitionModal from '../modal';
import { useSelector} from 'react-redux';


import { adminRoutes, userRoutes, guestRoutes } from './routes';


const AppRouter = () => {

  const { currentUser } = useSelector(state => state.users) 
  const isAdmin = currentUser ? currentUser.isAdmin  === "true" : false;
  const { isLogin } = useSelector(state => state.users) 

  return (
    <div>
      <Header />
      <Switch>
        {isAdmin && isLogin && adminRoutes.map(({ path, Component }) => (
          <Route path={path} component={Component} key={path} exact/>
        ))}
        {!isAdmin && isLogin && userRoutes.map(({ path, Component }) => (
          <Route path={path} component={Component} key={path} exact/>
        ))}
        {!isAdmin && !isLogin && guestRoutes.map(({ path, Component }) => (
          <Route path={path} component={Component} key={path} exact/>
        ))}
        <Redirect from="/" to="/products"/>
      </Switch>
      <TransitionModal />
    </div>
  )
}

export default AppRouter;