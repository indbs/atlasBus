import   React                              from 'react';
import                                           '../style/bootstrap.min.css';
import { Formik, 
         Form }                             from 'formik';
import   SubmitButton                       from './Buttons/submitButton.js';
import { InputComponent }                   from './Inputs/inputs.js';
import { validateInputFilelds }             from '../_helpers/auxilaryFunctions.js';

export class AtlasBusInputForm extends React.Component{
  render(){
    return(
      <div id='main_form_content'>
        <Formik
          initialValues={{ 
            name                : '', 
            surname             : '', 
            patronymic          : '', 
            email               : '', 
            passportNumber      : '', 
            docType             : '',
            birthDate           : '',
            grants              : ''
          }}
          validate={(values) => validateInputFilelds(values)}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <h4>Необходимо заполнить форму!</h4>
              </div>

              <InputComponent form_name={'name'}            form_cyrName={'Имя'}              form_type={'text'}  form_errors={errors} form_touched={touched}/>
              <InputComponent form_name={'surname'}         form_cyrName={'Фамилия'}          form_type={'text'}  form_errors={errors} form_touched={touched}/>
              <InputComponent form_name={'patronymic'}      form_cyrName={'Отчество'}         form_type={'text'}  form_errors={errors} form_touched={touched}/>
              <InputComponent form_name={'email'}           form_cyrName={'email'}            form_type={'email'} form_errors={errors} form_touched={touched}/>
              <InputComponent form_name={'passportNumber'}  form_cyrName={'Номер паспорта'}   form_type={'text'}  form_errors={errors} form_touched={touched}/>

              <SubmitButton disabled={isSubmitting} errors={errors}/>

            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default AtlasBusInputForm;