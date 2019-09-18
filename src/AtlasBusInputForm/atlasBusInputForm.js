import   React                              from 'react';
import                                           '../style/bootstrap.min.css';
import { Formik, 
         Form, 
         Field, 
         ErrorMessage }                     from 'formik';

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
          validate={values => {
            let errors = {};
            if (!values.email)                                                        errors.email          = 'Введите email';
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))       errors.email          = 'Неправильный email';
            if (!values.passportNumber)                                               errors.passportNumber = 'Введите номер паспорта';
            if (!/^[A-Z0-9]{8,}$/i.test(values.passportNumber))                       errors.passportNumber = 'В номере паспорта должно быть 8-мь символов';
            if (!values.name)                                                         errors.name           = 'Введите имя';
            if (!/^[A-Z]{2,}$/i.test(values.name))                                    errors.name           = 'Неправильно введено имя';
            if (!values.surname)                                                      errors.surname        = 'Введите имя';
            if (!/^[A-Z]{2,}$/i.test(values.surname))                                 errors.surname        = 'Неправильно введена фамилия';
            if (!values.patronymic)                                                   errors.patronymic     = 'Введите отчество';
            if (!/^[A-Z]{2,}$/i.test(values.patronymic))                              errors.patronymic     = 'Неправильно введено отчество';
            return errors;
          }}
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
              <div className="form-group">
                <h6><label htmlFor="name">Имя</label></h6>
                <Field className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} type="text" name="name" />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <h6><label htmlFor="surname">Фамилия</label></h6>
                <Field className={'form-control' + (errors.surname && touched.surname ? ' is-invalid' : '')} type="text" name="surname" />
                <ErrorMessage name="surname" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <h6><label htmlFor="patronymic">Отчество</label></h6>
                <Field className={'form-control' + (errors.patronymic && touched.patronymic ? ' is-invalid' : '')} type="text" name="patronymic" />
                <ErrorMessage name="patronymic" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <h6><label htmlFor="email">email</label></h6>
                <Field className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} type="email" name="email" />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <h6><label htmlFor="passportNumber">Номер паспорта</label></h6>
                <Field className={'form-control' + (errors.passportNumber && touched.passportNumber ? ' is-invalid' : '')} type="text" name="passportNumber" />
                <ErrorMessage name="passportNumber" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <button type="submit" disabled={isSubmitting} className={(!errors.passportNumber&&!errors.email)?"btn btn-primary":"btn btn-danger"}>
                  Отправить данные
                </button>
                {this.props.isSubmitting &&
                  <img alt='loading' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default AtlasBusInputForm;