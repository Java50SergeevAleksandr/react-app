import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { Bread } from './components/pages/Bread';
import { Customers } from './components/pages/Customers';
import { Dairy } from './components/pages/Dairy';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
import { Orders } from './components/pages/Orders';
import { Login } from './components/pages/Login';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { routes } from './config/layout-config'
import { Navigator } from './components/navigators/Navigator';
import { routesProduct } from './config/products-config';
import { NavigatorDesktop } from './components/navigators/NavigatorDesktop';
import { Logout } from './components/pages/Logout';
import { useSelector } from 'react-redux';
import { RouteType } from './model/RouteType';


function App() {
  const authState = useSelector<any, string>(state => state.auth.authUser);

  function getRoutes(): RouteType[] {
    if (authState.includes('admin')) {
      return routes.filter(v => v.always || v.admin)
    }
    if (authState) {
      return routes.filter(v => v.always || v.authenticated)
    }
    if (!authState) {
      return routes.filter(v => v.always || v.no_authenticated)
    }

    else throw new Error("Error authState");
  }

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavigatorDesktop routes={getRoutes()} />}>
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='home' element={<Home />} />
        <Route path='logout' element={<Logout />} />
        <Route path='customers' element={<Customers />} />
        <Route path='orders' element={<Orders />} />
        <Route path='shoppingcart' element={<ShoppingCart />} />
        <Route path='products' element={<Navigator linkInfo={routesProduct} />}>
          <Route path='dairy' element={<Dairy />} />
          <Route path='bread' element={<Bread />} />
        </Route>
      </Route>

      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App;