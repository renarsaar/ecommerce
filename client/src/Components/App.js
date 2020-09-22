import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from '../history';

import SplashScreen from './SplashScreen';
import Header from './Header';
import SubHeader from './SubHeader';
import Catalog from './Catalog';
import ProductCreate from './products/ProductCreate';
import ProductDelete from './products/ProductDelete';
import ProductEdit from './products/ProductEdit';
import ProductShow from './products/ProductShow';
import Footer from './Footer';

export default function App() {
  return (
    <div className="app">
      <Header />
      <SubHeader />
      <Router history={createBrowserHistory}>
        <Switch>
          <Route path="/" exact component={Catalog} />
          <Route path="/products/new" exact component={ProductCreate} />
          <Route path="/products/edit/:id" exact component={ProductEdit} />
          <Route path="/products/delete/:id" exact component={ProductDelete} />
          <Route path="/products/:id" exact component={ProductShow} />
        </Switch>
      </Router>
      <Footer />
      <SplashScreen />
    </div>
  );
}
