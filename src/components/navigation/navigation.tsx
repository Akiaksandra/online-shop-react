import React  from 'react';
import styles from './styles.module.scss';
import { Home } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { filterProductsAction } from '../../store/product-reducer/product-actions'
import { useAppSelector } from '../../types/hooks';
import { ArrType } from '../../types/types';
import ButtonComponent from '../button';

const Navigation: React.FC = () => {

  const dispatch = useDispatch();

  const { filterParams } = useAppSelector(state => state.products);
  const { category } = useAppSelector(state => state.products.filterParams);

  const hadleChangeFilterValue = (event:any) => {
    const newCategory = event.target.closest('button').value;
    const newFilterParams = {...filterParams, category: newCategory};
    dispatch(filterProductsAction(newFilterParams));
  }

  const createNavButtons = (arr: ArrType) => {
      const items = arr.map(element => {
        const classNameEl = category === element.value ? styles.activeButton : undefined;
        const startIconEl = element.img ? <Home /> : null
        return (
          <ButtonComponent className={classNameEl} onClick={hadleChangeFilterValue} key={element.value} value={element.value} startIcon={startIconEl} text={element.label} />
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