import   React                              from 'react';
import                                           '../style/bootstrap.min.css';
import { Formik, 
         Form }                             from 'formik';
import   SubmitButton                       from './Buttons/submitButton.js';
import { InputComponent }                   from './Inputs/inputs.js';
import { validateInputFilelds }             from '../_helpers/auxilaryFunctions.js';
import { docType,
         docTypeArr,
         sex,
         section }                          from './constants/constants.js';
import { DPickerCompnnt }                   from "./DatePicker/datePicker.js";
import                                           "react-datepicker/dist/react-datepicker.css";
import { DropDSelection }                   from './DropDSelection/dropDSelection.js';

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
            docNumber           : '', 
            phoneNumber         : '',
            docType             : docType.PASSP_RU,          
            birthDate           : '',
            sex                 : sex[0],
            section             : section[0],
            
          }}
          validate={(values) => validateInputFilelds(values)}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            setStatus();
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
                name          :values.name,
                surname       :values.surname,
                patronymic    :values.patronymic,
                email         :values.email,
                docNumber     :values.docNumber,
                phoneNumber   :values.phoneNumber,
                sex           :values.sex,
                birthDate     :values.birthDate,
                docType       :values.docType,
                section       :values.section
              })
            }
            fetch('http://94.140.216.17:8889/php/atlasBusInsert.php', requestOptions)
              .then(
                result=>{
                  setSubmitting(false);
                  result.json()
                    .then(
                      result=>{
                        setStatus(result);
                      }
                    )
                },
                error=>{
                  setSubmitting(false);
                  setStatus(error);
                }
              )
          }}
        >
          {({  values, status, touched, handleChange, errors, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="form-group">
                <h4>Заполните, пожалуйста, свои данные</h4>
              </div>
              <InputComponent form_name={'surname'}         form_cyrName={'Фамилия'}          form_type={'text'}  form_errors={errors.surname}          form_touched={touched.surname}/>
              <InputComponent form_name={'name'}            form_cyrName={'Имя'}              form_type={'text'}  form_errors={errors.name}             form_touched={touched.name}/>
              <InputComponent form_name={'patronymic'}      form_cyrName={'Отчество'}         form_type={'text'}  form_errors={errors.patronymic}       form_touched={touched.patronymic}/>
              <InputComponent form_name={'email'}           form_cyrName={'email'}            form_type={'email'} form_errors={errors.email}            form_touched={touched.email}/>
              <InputComponent form_name={'docNumber'}       form_cyrName={'Номер паспорта'}   form_type={'text'}  form_errors={errors.docNumber}        form_touched={touched.docNumber}/>
              <InputComponent form_name={'phoneNumber'}     form_cyrName={'Номер телефона'}   form_type={'text'}  form_errors={errors.phoneNumber}      form_touched={touched.phoneNumber}/>

              <DropDSelection form_name={'sex'}             form_cyrName={'Пол'}              onChange={handleChange}   value={values.sex}  touched={touched.sex}          items={sex}/>
              <DPickerCompnnt form_name={'birthDate'}       form_cyrName={'Дата рождения'}    onChange={setFieldValue}  value={values.birthDate}/>
              <DropDSelection form_name={'docType'}         form_cyrName={'Тип документа'}    onChange={handleChange}   touched={touched.docType}           items={docTypeArr(docType)}/>
              <DropDSelection form_name={'section'}         form_cyrName={'Раздел'}           onChange={handleChange}   touched={touched.section}           items={section}/>

              <SubmitButton disabled={isSubmitting} errors={errors}/>
              {status && status.Status && status.Status !== 'OK'&&
                <div className={'alert alert-danger'}>{status}</div>
              }
              {status && status.Status && status.Status === 'OK'&&
                <div className={'alert alert-success'}><a href={status.Link} class="alert-link">Проверить запись</a></div>
              }
              {/*<DisplayFormikState transmitprops={{values: values, errors: errors, touched: touched, isSubmitting: isSubmitting}} />*/}
            </Form>
          )}
        </Formik>

      </div>
    )
  }
}

export default AtlasBusInputForm;