export type ArrType = Array<{value: string, label: string, img?: boolean}>;

export interface OrdersHistoryForAdminTypesData {
  orderId: string,
  userId: string,
  price: number,
  status: string,
  deliveryType: string,
}

export type DataType = { [key: string]: string | number } // чтобы можно было сравнивать по ключам

export type HeadCells = {
  id: string,
  numeric: boolean,
  label: string,
}[];

export type OrderType = "asc" | "desc";

export type PropsTypeForTable = {
  classes: any,
  order: "asc" | "desc",
  orderBy: string,
  onRequestSort: (event: React.MouseEvent, property: string) => void
}