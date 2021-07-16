import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../header';
import TransitionModal from '../modal';
import { adminRoutes, userRoutes, guestRoutes } from './routes';
import { useAppSelector } from '../../types/hooks';
import { RoutesTypesNames } from '../../types/route-types';


const AppRouter: React.FC = () => {

  const { currentUser } = useAppSelector(state => state.users); 
  const isAdmin = currentUser ? currentUser.isAdmin  === "true" : false;
  const { isLogin } = useAppSelector(state => state.users); 

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
        <Redirect from="/" to={RoutesTypesNames.PRODUCTS}/>
        {/* <Route exact path="/">
            <Redirect to={RoutesTypesNames.PRODUCTS} />
        </Route>
        <Route path={RoutesTypesNames.PRODUCTS} component={ProductsPageForUsers} key={333}/> */}
      </Switch>
      <TransitionModal />
    </div>
  )
}

export default AppRouter;