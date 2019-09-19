import   React                              from 'react';
import                                           '../style/bootstrap.min.css';
import { Formik, 
         Form,
         Field }                            from 'formik';
import   SubmitButton                       from './Buttons/submitButton.js';
import { CheckboxGroup,
         Checkbox }                         from './CheckBox/checkBox.js';
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
            phoneNumber         : '', 
            docType             : '',
            birthDate           : '',
            grants              : '',
            checkboxGroup       : [],
          }}
          validate={(values) => validateInputFilelds(values)}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ setFieldValue, setFieldTouched, values, touched, errors, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <h4>Необходимо заполнить форму!</h4>
              </div>

              <InputComponent form_name={'name'}            form_cyrName={'Имя'}              form_type={'text'}  form_errors={errors.name}             form_touched={touched.name}/>
              {/*}
              <InputComponent form_name={'surname'}         form_cyrName={'Фамилия'}          form_type={'text'}  form_errors={errors.surname}          form_touched={touched.surname}/>
              <InputComponent form_name={'patronymic'}      form_cyrName={'Отчество'}         form_type={'text'}  form_errors={errors.patronymic}       form_touched={touched.patronymic}/>
              <InputComponent form_name={'email'}           form_cyrName={'email'}            form_type={'email'} form_errors={errors.email}            form_touched={touched.email}/>
              <InputComponent form_name={'passportNumber'}  form_cyrName={'Номер паспорта'}   form_type={'text'}  form_errors={errors.passportNumber}   form_touched={touched.passportNumber}/>
              <InputComponent form_name={'phoneNumber'}     form_cyrName={'Номер телефона'}   form_type={'text'}  form_errors={errors.phoneNumber}      form_touched={touched.phoneNumber}/>
              */}

              <div class="form-group">
                <label for="passportSelection">Выберите тип документа</label>
                <select class="form-control" id="passportSelection">
                  <option>Паспорт РФ</option>
                  <option>Паспорт РБ</option>
                  <option>Свидетельство о рождении</option>
                </select>
              </div>

              {/*
              <CheckboxGroup
                id =        "checkboxGroup"
                label =     "Выберите тип документа"
                value =     {values.checkboxGroup}
                error =     {errors.checkboxGroup}
                touched =   {touched.checkboxGroup}
                onChange =  {setFieldValue}
                onBlur =    {setFieldTouched}
              >
                <Field
                  component={Checkbox}
                  name="checkboxGroup"
                  id="checkbox1"
                  label="Паспорт РФ"
                />
                <Field
                  component={Checkbox}
                  name="checkboxGroup"
                  id="checkbox2"
                  label="Паспорт РБ"
                />
                <Field
                  component={Checkbox}
                  name="checkboxGroup"
                  id="checkbox3"
                  label="Свидетельство о рождении"
                />
              </CheckboxGroup>
              */}

              <SubmitButton disabled={isSubmitting} errors={errors}/>

            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default AtlasBusInputForm;