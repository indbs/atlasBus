import   React                              from 'react';
import                                           '../style/bootstrap.min.css';
import { Formik, 
         Form }                             from 'formik';
import   SubmitButton                       from './Buttons/submitButton.js';
//import { CheckboxGroup,
//         Checkbox }                         from './CheckBox/checkBox.js';
import { InputComponent }                   from './Inputs/inputs.js';
import { validateInputFilelds,
         DisplayFormikState }               from '../_helpers/auxilaryFunctions.js';
import { docType,
         docTypeArr }                       from './constants/constants.js';

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
            phoneNumber         : '',
            
            docType             : docType[0],
            
            birthDate           : '',
            grants              : '',
            
          }}
          validate={(values) => validateInputFilelds(values)}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({  values, touched, handleChange, errors, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <h4>Необходимо заполнить форму!</h4>
              </div>
              <InputComponent form_name={'name'}            form_cyrName={'Имя'}              form_type={'text'}  form_errors={errors.name}             form_touched={touched.name}/>
              
              <InputComponent form_name={'surname'}         form_cyrName={'Фамилия'}          form_type={'text'}  form_errors={errors.surname}          form_touched={touched.surname}/>
              <InputComponent form_name={'patronymic'}      form_cyrName={'Отчество'}         form_type={'text'}  form_errors={errors.patronymic}       form_touched={touched.patronymic}/>
              <InputComponent form_name={'email'}           form_cyrName={'email'}            form_type={'email'} form_errors={errors.email}            form_touched={touched.email}/>
              <InputComponent form_name={'passportNumber'}  form_cyrName={'Номер паспорта'}   form_type={'text'}  form_errors={errors.passportNumber}   form_touched={touched.passportNumber}/>
              <InputComponent form_name={'phoneNumber'}     form_cyrName={'Номер телефона'}   form_type={'text'}  form_errors={errors.phoneNumber}      form_touched={touched.phoneNumber}/>
              

              <div class="form-group">
                <label for="docType">Выберите тип документа</label>
                <select name="docType" onChange={handleChange} touched={touched.docType} class="form-control">
                {
                  docTypeArr(docType).map(item =>{
                    return <option value={item}>{item}</option>}
                  )
                }
                </select>
              </div>

              <SubmitButton disabled={isSubmitting} errors={errors}/>
              {/*<DisplayFormikState transmitprops={{values: values, errors: errors, touched: touched, isSubmitting: isSubmitting}} />*/}
            </Form>
          )}
        </Formik>


      </div>
    )
  }
}

export default AtlasBusInputForm;