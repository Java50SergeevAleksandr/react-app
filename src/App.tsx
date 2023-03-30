import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/navigators/Layout';
import { Products } from './components/navigators/Products';
import { Bread } from './components/pages/Bread';
import { Customers } from './components/pages/Customers';
import { Dairy } from './components/pages/Dairy';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
import { Orders } from './components/pages/Orders';

import { ShoppingCart } from './components/pages/ShoppingCart';


function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='customers' element={<Customers />} />
        <Route path='orders' element={<Orders />} />
        <Route path='shoppingcart' element={<ShoppingCart />} />
        <Route path='products' element={<Products />}>
          <Route path='dairy' element={<Dairy />} />
          <Route path='bread' element={<Bread />} />
        </Route>
      </Route>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App;