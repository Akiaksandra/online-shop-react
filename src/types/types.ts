export type ArrType = Array<{value: string, label: string, img?: boolean}>;

export interface OrdersHistoryForAdminTypesData {
  orderId: string,
  userId: string,
  price: number,
  status: string,
  deliveryType: string,
}