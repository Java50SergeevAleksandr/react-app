import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigator } from './components/navigators/Navigator';
import { Bread } from './components/pages/Bread';
import { Customers } from './components/pages/Customers';
import { Dairy } from './components/pages/Dairy';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
import { Orders } from './components/pages/Orders';
import { ShoppingCart } from './components/pages/ShoppingCart';
import navigators from './config/navigators.json'


function App() {
  const {layout, products} = navigators;
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigator linkInfo={layout}  />}>
        <Route index element={<Home />} />
        <Route path='customers' element={<Customers />} />
        <Route path='orders' element={<Orders />} />
        <Route path='shoppingcart' element={<ShoppingCart />} />
        <Route path='products' element={<Navigator linkInfo={products}  />}>
          <Route path='dairy' element={<Dairy />} />
          <Route path='bread' element={<Bread />} />
        </Route>
      </Route>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App;