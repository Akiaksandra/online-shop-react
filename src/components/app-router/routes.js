import { CART, PRODUCTS, ORDERS_HISTORY } from '../../utils/consts';
import ProductsPageForUsers from '../pages/products-page-for-users';
import ProductsPageForAdmin from '../pages/products-page-for-admin';
import ShoppingCartForUsers from '../pages/shopping-cart-for-users';
import ProductPage from '../pages/product-page';
import OrdersHistoryForUsers from '../pages/orders-history-for-users';
import OrdersHistoryForAdmin from '../pages/orders-history-for-admin';

export const adminRoutes = [
  {
    path: ORDERS_HISTORY,
    Component: OrdersHistoryForAdmin, 
  },
  {
    path: PRODUCTS,
    Component: ProductsPageForAdmin,
  },
];

export const userRoutes = [
  {
    path: PRODUCTS,
    Component: ProductsPageForUsers,
  },
  {
    path: PRODUCTS + '/:id',
    Component: ProductPage,
  },
  {
    path: ORDERS_HISTORY,
    Component: OrdersHistoryForUsers,
  },
  {
    path: CART,
    Component: ShoppingCartForUsers,
  },
];

export const guestRoutes = [
  {
    path: PRODUCTS,
    Component: ProductsPageForUsers,
  },
  {
    path: PRODUCTS + '/:id',
    Component: ProductPage,
  },
];

