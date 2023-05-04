import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { Customers } from './components/pages/Customers';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
import { Orders } from './components/pages/Orders';
import { Login } from './components/pages/Login';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { routes } from './config/layout-config'
import { NavigatorDesktop } from './components/navigators/NavigatorDesktop';
import { Logout } from './components/pages/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { RouteType } from './model/RouteType';
import { productsService } from './config/products-service-config';
import { ProductType } from './model/ProductType';
import { Products } from './components/pages/Products';
import { productsActions } from './redux/productsSlice';
import { Subscription } from 'rxjs';
import { ordersService } from './config/orders-service-config';
import { shoppingActions } from './redux/shoppingSlice';


function App() {
  const authState = useSelector<any, string>(state => state.auth.authUser);
  const dispatch = useDispatch();
  function getRoutes(): RouteType[] {
    const routesRes = routes.filter(routePredicate);
    const logoutRoute = routes.find(route => route.path === '/logout');
    if (logoutRoute) {
      logoutRoute.label = authState;
    }
    return routesRes;
  }

  useEffect(() => {
    const subscription = productsService.getProducts().subscribe({
      next: (products: ProductType[]) => {
        console.log(products)
        dispatch(productsActions.setProducts(products))
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    let subscription: Subscription;
    if (authState !== ('' && authState.includes("admin"))) {
      subscription = ordersService.getShoppingCart(authState).subscribe({
        next: (shopping) => dispatch(shoppingActions.setShopping(shopping))
      })
    } else {
      dispatch(shoppingActions.resetShopping());
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }, [authState])

  function routePredicate(route: RouteType): boolean | undefined {
    return route.always || (route.authenticated && !!authState) || (route.client && !(authState.includes('admin'))) && !!authState
      || (route.admin && authState.includes('admin')) ||
      (route.no_authenticated && !authState)
  }

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavigatorDesktop routes={getRoutes()} />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='home' element={<Home />} />
        <Route path='logout' element={<Logout />} />
        <Route path='customers' element={<Customers />} />
        <Route path='orders' element={<Orders />} />
        <Route path='shoppingcart' element={<ShoppingCart />} />
        <Route path='products' element={<Products />} />

      </Route>

      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App;