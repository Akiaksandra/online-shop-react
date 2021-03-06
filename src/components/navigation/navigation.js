import React  from 'react';
import styles from './styles.module.scss';
import { Button } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { filterProductsAction } from '../../store/product-reducer/product-actions'

const Navigation = () => {

  const dispatch = useDispatch();

  const { filterParams } = useSelector(state => state.products);
  const { category } = useSelector(state => state.products.filterParams);

  const hadleChangeFilterValue = (event) => {
    const newCategory = event.target.closest('button').value
    const newFilterParams = {...filterParams, category: newCategory}
    dispatch(filterProductsAction(newFilterParams));
  }

  const createNavButtons = (arr) => {
      const items = arr.map(element => {
        const classNameEl = category === element.value ? styles.activeButton : null;
        const startIconEl = element.img ? <Home /> : null
        return (
        <Button variant="contained" color="primary" key={element.value} value={element.value} startIcon={startIconEl} className={classNameEl} onClick={(event) => hadleChangeFilterValue(event)}>
            {element.label}
        </Button>
        )
      })
      return items;
  }

  const buttons = createNavButtons([
    {value: "all", label: "Все категории", img: true},
    {value: "PC", label: "PC",},
    {value: "home", label: "Home"},
    {value: "electronic", label: "Electronic"},
    {value: "mobile", label: "Mobile"},
    {value: "sport", label: "Sport"},
  ])

  return (
    <div className={styles.navContainer}>
        {buttons}
    </div>
  )
}

export default Navigation;