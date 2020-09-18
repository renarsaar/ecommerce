import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from '../history';

import Header from './Header';
import SubHeader from './SubHeader';
import ProductCreate from './products/ProductCreate';
import ProductDelete from './products/ProductDelete';
import ProductEdit from './products/ProductEdit';
import ProductList from './products/ProductList';
import ProductShow from './products/ProductShow';
import Footer from './Footer';

export default function App() {
  return (
    <div className="app">
      <Router history={createBrowserHistory}>
        <Header />
        <SubHeader />
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/products/new" exact component={ProductCreate} />
          <Route path="/products/edit/:id" exact component={ProductEdit} />
          <Route path="/products/delete/:id" exact component={ProductDelete} />
          <Route path="/products/:id" exact component={ProductShow} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
