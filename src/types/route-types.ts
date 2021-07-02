import { ORDERS_HISTORY, PRODUCTS } from "../utils/consts";
import OrdersHistoryForAdmin from '../components/pages/orders-history-for-admin';
import ProductsPageForAdmin from "../components/pages/products-page-for-admin";

export type AdminRoutes  = Array<AdminRote>;

export interface AdminRote {
  path: typeof ORDERS_HISTORY | typeof PRODUCTS,
  Component: typeof OrdersHistoryForAdmin | typeof ProductsPageForAdmin,
}

export type UserRoutes = Array<UserRoute>

export interface UserRoute {
  path: typeof ORDERS_HISTORY | typeof PRODUCTS,
  Component: typeof OrdersHistoryForAdmin | typeof ProductsPageForAdmin,
}