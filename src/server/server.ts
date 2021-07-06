import axios, { AxiosResponse } from 'axios';
import { AllProducts, IProduct, Order } from '../types/store-types'

const url: string = "https://onlineshop-509e.restdb.io/rest/";
const adminKey: string ="60b4a127318a330b62f588ad" ;

export const getResource = (dbName: string, filterParam: any = "", sortParam: string = ""): Promise<AxiosResponse> => {
  return axios.get(`${url}${dbName}?q={${filterParam}}${sortParam}`, {
  headers: { 'x-apikey': adminKey }
})}

export const postResource = (dbName: string, data: IProduct | Order | string): Promise<AxiosResponse> => axios.post(`${url}${dbName}`, data, {
  headers: { 'x-apikey': adminKey, 'Content-Type': 'application/json' }
});

export const getResourceId = (dbName: string, id: string): Promise<AxiosResponse> => axios.get(`${url}${dbName}/${id}`, {
  headers: { 'x-apikey': adminKey }
});

export const deleteResourceId = (dbName: string, id: string): Promise<AxiosResponse> => axios.delete(`${url}${dbName}/${id}`, {
  headers: { 'x-apikey': adminKey }
});

export const updateResourceId = (dbName: string, data: string | { products: AllProducts} | Order, id: string): Promise<AxiosResponse> => axios.patch(`${url}${dbName}/${id}`, data, {
  headers: { 'x-apikey': adminKey, 'Content-Type': 'application/json' }
});
