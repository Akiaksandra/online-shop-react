import ProductsPageForUsers from '../pages/products-page-for-users';
import ProductsPageForAdmin from '../pages/products-page-for-admin';
import ShoppingCartForUsers from '../pages/shopping-cart-for-users';
import ProductPage from '../pages/product-page';
import OrdersHistoryForUsers from '../pages/orders-history-for-users';
import OrdersHistoryForAdmin from '../pages/orders-history-for-admin';
import { AdminRoutes, GuestRoutes, RoutesTypesNames, UserRoutes } from '../../types/route-types';

export const adminRoutes: AdminRoutes = [
  {
    path: RoutesTypesNames.ORDERS_HISTORY,
    Component: OrdersHistoryForAdmin, 
  },
  {
    path: RoutesTypesNames.PRODUCTS,
    Component: ProductsPageForAdmin,
  },
];

export const userRoutes: UserRoutes = [
  {
    path: RoutesTypesNames.PRODUCTS,
    Component: ProductsPageForUsers,
  },
  {
    path: RoutesTypesNames.PRODUCTS_WITH_ID,
    Component: ProductPage,
  },
  {
    path: RoutesTypesNames.ORDERS_HISTORY,
    Component: OrdersHistoryForUsers,
  },
  {
    path: RoutesTypesNames.CART,
    Component: ShoppingCartForUsers,
  },
];

export const guestRoutes: GuestRoutes = [
  {
    path: RoutesTypesNames.PRODUCTS,
    Component: ProductsPageForUsers,
  },
  {
    path: RoutesTypesNames.PRODUCTS_WITH_ID,
    Component: ProductPage,
  },
];

