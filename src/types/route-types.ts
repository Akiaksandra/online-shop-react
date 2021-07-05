import React, { ComponentType } from "react";
import ProductsPageForAdmin from '../components/pages/products-page-for-admin';

export enum RoutesTypesNames {
  ORDERS_HISTORY = "/orders-history",
  PRODUCTS = "/products",
  PRODUCTS_WITH_ID = "/products/:id",
  CART = "/cart",
}

export type AdminRoutes  = Array<AdminRote>;

export interface AdminRote {
  path: typeof RoutesTypesNames.ORDERS_HISTORY | typeof RoutesTypesNames.PRODUCTS,
  Component: ComponentType<any>,
}

export type UserRoutes = Array<UserRoute>

export interface UserRoute {
  path: RoutesTypesNames,
  Component: ComponentType<any>,
}

export type GuestRoutes = Array<GuestRoute>

export interface GuestRoute {
  path: typeof RoutesTypesNames.PRODUCTS | typeof RoutesTypesNames.PRODUCTS_WITH_ID,
  Component: ComponentType<any>,
}