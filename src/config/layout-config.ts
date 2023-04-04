import { RouteType } from "../model/RouteType";

export const routes: RouteType[] = [
    {path: '/', label: 'Login', no_authenticated: true},   
    {path: '/home', label: 'Home', admin:true, authenticated:true },
    {path: '/logout', label: 'Logout', admin: true, authenticated:true},
    {path: '/customers', label: 'Customers', admin:true},
    {path: '/shoppingcart', label: 'Shopping Cart', admin:true, authenticated:true},
    {path: '/orders', label: 'Orders', admin:true, authenticated:true},
    {path: '/products', label: 'Products', always:true}
]