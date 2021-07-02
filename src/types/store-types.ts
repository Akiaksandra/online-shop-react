export interface IProduct {
  _id: string,
  title: string,
  price: number,
  quantity: number,
  manufacturer:string,
  description: string,
  img: string,
  category:  string[],
  file?: string,
  _created?: string,
  _changed?: string,
  _createdby?: string,
  _changedby?: string,
  _version?: number,
  _tags?: string,
  _keywords?: Array<string>,
}

export type AllProducts = Array<IProduct>;

export type Loading = boolean;
export type Error = boolean | string;
export type SortParam = string;

export interface IFilterParams {
  category: string,
  minPrice: number,
  maxPrice: number,
  manufacturer: {
    [key: string]: boolean
  },
  availability: boolean,
  search: string,
};

export type IsLogin = boolean;

export interface ICurrentUser {
  _id: string,
  email: string,
  password: string,
  isAdmin: string,
};

export interface OrderDileviryInfo {
    deliveryType: string,
    town: string,
    street: string,
    house: number,
    flat: string,
    floor: string,
    phone: number,
    initials: string,
    comment: string,
    _created?: string,
    _changed?: string,
    _createdby?: string,
    _changedby?: string,
    _version?: number,
    _tags?: string,
    _keywords?: Array<string>,
};

export interface Order {
  _id: string,
  forUser: string,
  orderPrice: number,
  orderStatus: string,
  orderProducts: Array<IProduct>,
  orderDileviryInfo: OrderDileviryInfo,
  _created?: string,
  _changed?: string,
  _createdby?: string,
  _changedby?: string,
  _version?: number,
  _tags?: string,
  _keywords?: Array<string>,
}

export interface UserCart {
  _id: string,
  forUser: string,
  products: Array<IProduct>,
  _created?: string,
  _changed?: string,
  _createdby?: string,
  _changedby?: string,
  _version?: number,
  _tags?: string,
  _keywords?: Array<string>,
};
export type OrdersHistory = Array<Order>;

export type IsOpenModal = boolean;
export type Aim = null | string;

//========== STORE ==============
export interface IProducts {
  allProducts: AllProducts,
  currentProduct: Order | null,
  loading: Loading,
  errorProducts: Error,
  sortParam: SortParam,
  filterParams: IFilterParams,
};

export interface IUsers {
  currentUser: ICurrentUser | null,
  ordersHistory: OrdersHistory | null,    
  userCart: UserCart | null,
  loading: Loading,
  errorUsers: Error,
  isLogin: IsLogin,
  currentOrder: Order | false,
};

export interface IModal {
  isOpenModal: IsOpenModal,
  aim: Aim,
};
