import React, { useEffect } from 'react';
import { gsap } from 'gsap';
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
  const t1 = gsap.timeline({ defaults: { ease: 'power1.out' } });
  const intro = React.createRef();
  const vra = React.createRef();
  const slider = React.createRef();

  useEffect(() => {
    t1.to(vra.current, { y: '0%', duration: 1 });
    t1.to(slider.current, { y: '-100%', duration: 1.5, delay: 0.5 });
    t1.to(intro.current, { y: '-100%', duration: 1 }, '-=1');
  }, [vra, slider, intro]);

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
      <div className="intro" ref={intro}>
        <div className="intro-text">
          <h1 className="hide">
            <svg className="vra" ref={vra} viewBox="0 0 160 80">
              <path d="M28.6411 79L1 1.0061L24.7371 1.00609L52.3701 79M28.6411 79H52.3701M28.6411 79L56.2824 1L80 1.00001L66.185 40L52.3701 79" />
              <path d="M107.65 1C96.8522 31.4609 90.7982 48.5391 80 79H103.654C114.453 48.5391 120.508 31.4609 131.307 1M107.65 1L131.307 1M107.65 1C118.443 31.4585 124.494 48.5354 135.286 78.9939C144.547 78.9939 149.739 78.9939 159 78.9939C148.185 48.5354 142.122 31.4585 131.307 1" />
            </svg>
          </h1>
        </div>
      </div>
      <div className="slider" ref={slider} />
    </div>
  );
}
