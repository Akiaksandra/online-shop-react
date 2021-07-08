import React from 'react';
import { Formik, Form } from 'formik';
import { FormControl } from '@material-ui/core';
import useStyles from './use-styles';
import './shopping-cart.scss';
import * as Yup from 'yup';
import FormikControl from '../../formik-control';
import { ArrType } from '../../../types/types';
import { OrderDileviryInfo } from '../../../types/store-types';
import ButtonComponent from '../../button';

const radioOptions: ArrType = [
  {value: "post", label: "Почтой"},
  {value: "courier", label: "Курьером"}
];

const initialValues: OrderDileviryInfo = {
  deliveryType: '',
  town: '',
  street: '',
  house: '',
  flat: '',
  floor: '',
  phone: '',
  initials: '',
  comment: '',
};

const validationSchema = Yup.object({
  deliveryType: Yup.string().required("Required!"),
  town: Yup.string().trim().required("Required!").min(1, "The length must be more than 1 characters"),
  street: Yup.string().trim().required("Required!").min(1, "The length must be more than 1 characters"),
  house: Yup.number().min(1, "The number cannot be less than one").required("Required!").integer("A number can't include a decimal point"),
  flat: Yup.number().min(1, "The number cannot be less than one").integer("A number can't include a decimal point"),
  floor: Yup.number().min(1, "The number cannot be less than one").integer("A number can't include a decimal point"),
  phone: Yup.string().trim().min(6, "The length must be more than 5 characters").max(12, "The length can not be more than 12 characters").required("Required!"),
  initials: Yup.string().trim().required("Required!").min(1, "The length must be more than 1 characters"),
  
});

const CartForm: React.FC<{commonCount: number, commonPrice: number, onSubmitForm: any}> = (props) => {

  const { commonCount, commonPrice, onSubmitForm } = props;
  const classes = useStyles();

  const onSubmit = (values: OrderDileviryInfo, onSubmitProp: any) => {
    onSubmitProp.setSubmitting(false);
    onSubmitProp.resetForm();
    onSubmitForm(values);
  }

  const checkCurrentWordForm = (count: number): string => {
    let word = null;

    switch(+count) {
      case (1): 
        word = 'товар';
        break;
      case (2):
      case (3):
      case (4):   
        word = 'товара';
        break;
      default: 
        word = 'товаров'  
    }

    return word
  }
                     
  return (
    <div className="cart-sidebar">
      <div className="cart-sidebar-header">
        <span className="cart-sidebar-count">Выбрано {commonCount} {checkCurrentWordForm(commonCount)}</span>
        <span className="cart-sidebar-price">{commonPrice}р.</span>
      </div>
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount>  
        {formik => {
          return (
        <Form className="cart-form">
        <FormControl component="fieldset" className={classes.fieldset}>
          <FormikControl 
              control = "radio"
              name ="deliveryType"
              label = "Вид доставки"
              options = {radioOptions}
            />
          
          <div className="form-label">Адрес доставки</div> 
            <FormikControl 
              control = "input"
              name ="town"
              label = "Город"
              inputType = "text"
            />
            <FormikControl 
              control = "input"
              name ="street"
              label = "Улица"
              inputType = "text"
            />
            <FormikControl 
              control = "input"
              name ="house"
              label = "Дом"
              inputType = "number"
              // inputClassName = {classes.inputSmall}
              formControlClassName = "form-control-small"
            />
            <FormikControl 
              control = "input"
              name ="flat"
              label = "Квартира"
              inputType = "number"
              // inputClassName = {classes.inputSmall}
              formControlClassName = "form-control-small"
            />
            <FormikControl 
              control = "input"
              name ="floor"
              label = "Этаж"
              inputType = "number"
              // inputClassName = {classes.inputSmall}
              formControlClassName = "form-control-small"
            />
            <FormikControl 
              control = "input"
              name ="phone"
              label = "Телефон"
              inputType = "number"
            />
            <FormikControl 
              control = "input"
              name ="initials"
              label = "ФИО"
              inputType = "text"
            />
            <FormikControl 
              control = "input"
              name ="comment"
              label = "Комментарии"
              inputType = "text"
            />

            <ButtonComponent className={classes.button} type="submit" disabled={!(formik.isValid && commonCount > 0 && !formik.isSubmitting)} text="Оформить заказ" />        
            <ButtonComponent className={classes.button} variant="outlined" type="reset" style={{backgroundColor: "#fff"}} text="Очистить форму" />
                  
          </FormControl>
        </Form>
          )
        }}

      </Formik>
    </div>
  )
}

export default CartForm;
