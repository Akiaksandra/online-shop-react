import React from 'react';
import useStyles from '../modal/use-styles';
import { Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../formik-control';
import { useDispatch } from 'react-redux';
import { checkEmailAndPassword } from '../../store/users-reducer/users-actions';
import LoadingModal from '../modal/loading-modal';
import SuccessModal from '../modal/success-modal';
import ErrorModal from '../modal/error-modal';
import { useAppSelector } from '../../types/hooks';

interface LogInTypes {
  email: string,
  password: string,
}

const initialValues: LogInTypes = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").trim().required("Required!"),
  password: Yup.string().trim().required("Required!").min(6, "The length must be more than 1 characters"),
});


const LogInForm: React.FC = () => {

  const dispatch = useDispatch();
  const classes = useStyles();

  const { currentUser, loading, errorUsers } = useAppSelector(state => state.users);

  const onSubmit = (values: LogInTypes, onSubmitProp: any): void => {
    const {email, password } = values;
    dispatch(checkEmailAndPassword(email, password));
    onSubmitProp.setSubmitting(false);
    onSubmitProp.resetForm();
  }
  
  const needCartRequest = currentUser ? !(currentUser.isAdmin  === "true") : false;
  const needClearFilters = currentUser?.isAdmin === "true" ? true : false

  if (loading) return <LoadingModal text = {"Проверка введенных данных..."} />

  if (errorUsers) return <ErrorModal errorText = {errorUsers} />

  if (currentUser) return <SuccessModal text = {"Вы вошли в систему!"} needCartRequest = {needCartRequest} needClearFilters = {needClearFilters} />

  return (
    <div className={classes.paper} >
    <h2 className ="transition-modal-title">Вход</h2>
    <div className ="transition-modal-content">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
      { formik => {
          return (
            <Form className={classes.form}>
              <FormikControl 
                control="input"
                name="email"
                inputType="email"
                label="Email"
              />
              <FormikControl 
                control="input"
                name="password"
                inputType="password"
                label="Password"
              />
              <Button variant="contained" color="primary" className={classes.button} type="submit" disabled={!formik.isValid}>
                Войти
              </Button>
          </Form>  
          )
        }}
      </Formik>
    </div>
  </div>
  )
}

export default LogInForm;