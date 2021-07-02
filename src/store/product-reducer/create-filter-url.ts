import { IFilterParams } from '../../types/store-types'

const createFilterUrl = (filter: IFilterParams): string => {
  const {minPrice, maxPrice, manufacturer, availability} = filter;
  const priceUrl = `"price": {"$bt": [${minPrice || 0}, ${maxPrice || 10000}]}`
  const availabilityUrl = availability ? `"quantity" : {"$gt": ${0}},` : "";

  const manufacturerArr = Object.entries(manufacturer).filter(([key, value]) => value === true)
  const manufacturerUrlArr = manufacturerArr.length > 0 ? manufacturerArr.map(([key, value]) => ({"manufacturer": key})) : "";
  const manufacturerUrl = manufacturerUrlArr.length > 0 ? `"$or": ${ JSON.stringify(manufacturerUrlArr)},` : ""; 

  const finalFilterUrl = `${availabilityUrl}${manufacturerUrl}${priceUrl}`
  return finalFilterUrl;
}

export default createFilterUrl;