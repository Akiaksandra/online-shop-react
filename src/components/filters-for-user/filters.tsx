import React from 'react';
import {Button, Switch, FormGroup,  FormControlLabel, Checkbox} from '@material-ui/core';
import './filters.scss';
import { useDispatch } from 'react-redux';
import { filterProductsAction } from '../../store/product-reducer/product-actions'
import { useAppSelector } from '../../types/hooks';

const manufactureSelect = [
  {value: "samsung", label: "Samsung"},
  {value: "xiaomi", label: "Xiaomi"},
  {value: "lg", label: "LG"},
  {value: "sony", label: "Sony"},
  {value: "philips", label: "Philips"},
  {value: "horizont", label: "Horizont"},
]

const Filters:React.FC = () => {

  const dispatch = useDispatch();

  const { filterParams } = useAppSelector(state => state.products);
  const { manufacturer, availability } = useAppSelector(state => state.products.filterParams);

  const handleChangeMinPrice = (event: React.FocusEvent<HTMLInputElement>): void => {
    const newMinPrice  = +event.target.value;
    const newFilterParams = {...filterParams, minPrice: newMinPrice};
    dispatch(filterProductsAction(newFilterParams));
  }

  const handleChangeMaxPrice = (event: React.FocusEvent<HTMLInputElement>): void => {
    const newMaxPrice  = +event.target.value;
    const newFilterParams = {...filterParams, maxPrice: newMaxPrice};
    dispatch(filterProductsAction(newFilterParams));
  }

  const handleChangeAvailability = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newAvailability  = event.target.checked;
    const newFilterParams = {...filterParams, availability: newAvailability}
    dispatch(filterProductsAction(newFilterParams));
  }

  const handleChangeManufacturer = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newManufacturer = {...manufacturer, [event.target.name]: event.target.checked}
    const newFilterParams = {...filterParams, manufacturer: newManufacturer};
    dispatch(filterProductsAction(newFilterParams));
  }

  return (
      <div className="header-filters">
        <div className="filter-price">
          <span>Цена от</span>
          <input className="filter-price-input" type="number" min="1" onBlur={handleChangeMinPrice}></input>
          <span>до</span>
          <input className="filter-price-input" type="number" min="1" onBlur={handleChangeMaxPrice}></input>
        </div>
        <div className = "manufactures-container">
          <Button variant="contained" color="primary">
            Производитель
          </Button>
          <div className = "manufactures-list">
            <FormGroup>
              {
                manufactureSelect.map(({value, label}) => {
                  return (
                    <FormControlLabel key={value}
                      control={<Checkbox 
                                  name={value}
                                  color="primary" 
                                  onChange={handleChangeManufacturer}
                                  value = {manufacturer.value}/>}
                      label={label}
                    />
                  )
                })
              }
            </FormGroup>
          </div>
        </div>
        <div className="filter-availability">
          <span>В наличии</span>
          <Switch
            color="primary"
            name="checkedB"
            checked={availability}
            onChange={handleChangeAvailability}
          />
        </div>
      </div> 
  )
}

export default Filters;