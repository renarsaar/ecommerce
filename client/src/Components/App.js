import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions/authActions';

import SplashScreen from './SplashScreen';
import Header from './Header';
import SubHeader from './SubHeader';
import Catalog from './Catalog';
import ProductCreate from './products/ProductCreate';
import ProductDelete from './products/ProductDelete';
import ProductEdit from './products/ProductEdit';
import ProductShow from './products/ProductShow';
import Account from './account/Account';
import Footer from './Footer';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const url = queryString.parse(location.search);

  // Get the user & log in if jwt token in URL after OAuth login
  useEffect(() => {
    if (!isLoggedIn && url.token) {
      dispatch(getUser(url.token));
    }

    // Log in again on page refresh
    if (!isLoggedIn && sessionStorage.token) {
      dispatch(getUser(sessionStorage.token));
    }
  }, [isLoggedIn, url.token]);

  return (
    <div className="app">
      <Header />
      <SubHeader />
      <Switch>
        <Route path="/" exact component={Catalog} />
        <Route path="/products/new" exact component={ProductCreate} />
        <Route path="/products/edit/:id" exact component={ProductEdit} />
        <Route path="/products/delete/:id" exact component={ProductDelete} />
        <Route path="/products/:id" exact component={ProductShow} />
        {isLoggedIn ? <Redirect to="/" /> : <Route path="/account/login" exact render={() => <Account login />} />}
        {isLoggedIn ? <Redirect to="/" /> : <Route path="/account/register" exact render={() => <Account register />} />}
        <Route path="/account/validation/:id" exact render={(props) => <Account location={props.location} validation />} />
      </Switch>
      <Footer />
      {/* <SplashScreen /> */}
    </div>
  );
}
