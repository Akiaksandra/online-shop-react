import React, { useEffect } from 'react';
import useStyles from '../modal/use-styles';
import { Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../formik-control';
import { useDispatch} from 'react-redux';
import { addProduct } from '../../store/product-reducer/product-actions';
import { deleteCurrentProduct, updateProduct } from '../../store/product-reducer/product-actions';
import LoadingModal from '../modal/loading-modal';
import SuccessModal from '../modal/success-modal';
import ErrorModal from '../modal/error-modal';
import { useAppSelector } from '../../types/hooks';
import { IProduct, NewProduct } from '../../types/store-types';
import { ArrType } from '../../types/types';

const initialValues: NewProduct = {
  title: '',
  category: [],
  price: '',
  quantity: '',
  manufacturer: '',
  description: '',
  img: '',
};

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Required!"),
  category: Yup.array().min(1, "Required!"),
  price: Yup.number().min(1, "The number cannot be less than one").required("Required!"),
  quantity: Yup.number().min(0, "The number cannot be less than zero").required("Required!").integer("A number can't include a decimal point"),
  manufacturer: Yup.string().trim().required("Required!"),
  description: Yup.string().trim().required("Required!"),
  img: Yup.string().required("Required!"),
});

const categorySelect: ArrType = [
  {value: "PC", label: "PC"},
  {value: "home", label: "Home"},
  {value: "electronic", label: "Electronic"},
  {value: "mobile", label: "Mobile"},
  {value: "sport", label: "Sport"}
]

const manufactureSelect: ArrType = [
  {value: "samsung", label: "Samsung"},
  {value: "xiaomi", label: "Xiaomi"},
  {value: "lg", label: "LG"},
  {value: "sony", label: "Sony"},
  {value: "philips", label: "Philips"},
  {value: "horizont", label: "Horizont"},
]

const NewProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { currentProduct, loading, errorProducts } = useAppSelector(state => state.products);
  const { aim } = useAppSelector(state => state.modal)

  useEffect(() => {
    if ( currentProduct ) {
      onSubmit = onSubmitFormEditProduct;
      currentValues = currentProduct;
    }
    }, [])  
  
  const onSubmitFormNewProduct = async (values: any, onSubmitProp: any): Promise<void> => {
    onSubmitProp.setSubmitting(false);
    onSubmitProp.resetForm();
    const data = JSON.stringify(values)
    dispatch(addProduct(data))
  }  

  const onSubmitFormEditProduct = async (values: any, onSubmitProp: any): Promise<void> => {
    onSubmitProp.setSubmitting(false);
    await dispatch(updateProduct(values, values._id));
    dispatch(deleteCurrentProduct())
  }

  let onSubmit:(values: NewProduct | IProduct, onSubmitProp: any) => Promise<void> =  onSubmitFormNewProduct; 
  
  let currentValues = initialValues;

  if ( currentProduct ) {
    onSubmit = onSubmitFormEditProduct;
    currentValues = currentProduct;
  }

  if (loading && aim === "editProduct") return <LoadingModal text = {"Происходит редактирование товара..."} />

  if (loading && aim === "newProduct") return <LoadingModal text = {"Происходит создание товара..."} />

  if (!currentProduct && aim === "editProduct") return <SuccessModal text = {"Товар успешно отредактирован!"}/>

  // if (aim === "newProduct") return <SuccessModal text = {"Товар успешно добавлен!"}/>

  if (errorProducts) return <ErrorModal errorText = {errorProducts} />

  return (
    <div className={classes.paper} style = {{maxWidth: "500px", height: "100%", maxHeight: "100vh"}}>
    <h2 className ="transition-modal-title"> {aim === "newProduct" ? "Добавление нового товара" : "Редактирование товара" }</h2>
    <div className ="transition-modal-content">
      <Formik
        initialValues={currentValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize
      >
      { formik => {
          return (
            <Form className={classes.form}>
              <FormikControl 
                control="input"
                name="title"
                inputType="text"
                label="Название"
              />
              <FormikControl 
                control="select"
                name="category"
                label="Выберите категории"
                options = {categorySelect}
                isMultiple = {true}
              />
              <FormikControl 
                control="input"
                name="price"
                inputType="number"
                label="Цена за единицу"
              />
              <FormikControl 
                control="input"
                name="quantity"
                inputType="number"
                label="Количество"
              />
              <FormikControl 
                control="select"
                name="manufacturer"
                label="Производитель"
                options = {manufactureSelect}
                isMultiple = {false}
              />
              <FormikControl 
                control="textarea"
                name="description"
                label="Описание"
              />     
              <FormikControl 
                control="file"
                name="files"
                inputType="file"
                label="File"
              />             
              <Button variant="contained" color="primary" className={classes.button} type="submit" disabled={!formik.isValid}>
                Подтвердить
              </Button>
              <Button className={classes.button} color="primary" variant="outlined" type="reset" style={{backgroundColor: "#fff"}} >
              Очистить форму
            </Button>    
          </Form>  
          )
        }}
      </Formik>
    </div>
  </div>
  )
}

export default NewProductForm;

