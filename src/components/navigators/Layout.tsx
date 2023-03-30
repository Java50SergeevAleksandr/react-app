import { NavLink, Outlet } from "react-router-dom"
import './navigators.css'
export const Layout: React.FC = () => {
    return <div>
        <nav>
            <ul className="navigator-list">
                <li className="navigator-item paragraph-l">
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li className="navigator-item paragraph-l">
                    <NavLink to='/shoppingcart'>Shopping Cart</NavLink>
                </li>
                <li className="navigator-item paragraph-l">
                    <NavLink to='/orders'>Orders</NavLink>
                </li>
                <li className="navigator-item paragraph-l">
                    <NavLink to='/customers'>Customers</NavLink>
                </li>
                <li className="navigator-item paragraph-l">
                    <NavLink to='/products'>Products</NavLink>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>
}