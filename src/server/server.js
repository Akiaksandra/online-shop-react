import axios from 'axios';

const url = "https://onlineshop-509e.restdb.io/rest/";
const adminKey ="60b4a127318a330b62f588ad" ;

export const getResource = (dbName, filterParam = "", sortParam = "") => {
  return axios.get(`${url}${dbName}?q={${filterParam}}${sortParam}`, {
  headers: { 'x-apikey': adminKey }
})}

export const postResource = (dbName, data) => axios.post(`${url}${dbName}`, data, {
  headers: { 'x-apikey': adminKey, 'Content-Type': 'application/json' }
});

export const putResource = (dbName, data, id) => axios.post(`${url}${dbName}/${id}`, data, {
  headers: { 'x-apikey': adminKey, 'Content-Type': 'application/json' }
});

export const getResourceId = (dbName, id) => axios.get(`${url}${dbName}/${id}`, {
  headers: { 'x-apikey': adminKey }
});

export const deleteResourceId = (dbName, id) => axios.delete(`${url}${dbName}/${id}`, {
  headers: { 'x-apikey': adminKey }
});

export const updateResourceId = (dbName, data, id) => axios.patch(`${url}${dbName}/${id}`, data, {
  headers: { 'x-apikey': adminKey, 'Content-Type': 'application/json' }
});
