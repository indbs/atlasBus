import React from 'react';
import { docType }                          from '../AtlasBusInputForm/constants/constants.js';

export function validateInputFilelds(values = {}){
  let errors = {};
  
  if (!values.email)                                                        errors.email          = 'Введите email';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))       errors.email          = 'Неправильный email';
  if (!values.name)                                                         errors.name           = 'Введите имя';
  if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.name))                            errors.name           = 'Неправильно введено имя';
  if (!values.surname)                                                      errors.surname        = 'Введите имя';
  if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.surname))                         errors.surname        = 'Неправильно введена фамилия';
  if (!values.patronymic)                                                   errors.patronymic     = 'Введите отчество';
  if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.patronymic))                      errors.patronymic     = 'Неправильно введено отчество';
  if (!values.phoneNumber)                                                                                    errors.phoneNumber     = 'Введите номер телефона';
  if (!/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d[- .]?\d\d$/.test(values.phoneNumber))     errors.phoneNumber     = 'Неправильно введен номер телефона';
  
  if (values.docType===docType.pasp_rus){
    if (!/^[A-Z0-9А-Я]{2,}?[ ]?[A-Z0-9А-Я]{2,}?[ ]?[A-Z0-9А-Я]{6,}$/i.test(values.passportNumber)){                      
      errors.passportNumber = 'Шаблон 12 34 567890';
    }
  }
  if (values.docType===docType.pasp_by){
    if (!/^[A-ZА-Я]{2,}?[0-9]{7,}$/i.test(values.passportNumber)){                      
      errors.passportNumber = 'Шаблон АБ1234567';
    }
  }
  if (values.docType===docType.cert_of_birth_ru){
    if (!/^[A-ZА-Я]{1,}?[-]?[A-ZА-Я]{2,}?[№]?[0-9]{6,}$/i.test(values.passportNumber)){                      
      errors.passportNumber = 'Шаблон I-HA№123456';
    }
  }
  if (values.docType===docType.cert_of_birth_by){
    if (!/^[A-ZА-Я]{1,}?[-]?[A-ZА-Я]{2,}?[№]?[0-9]{7,}$/i.test(values.passportNumber)){                      
      errors.passportNumber = 'Шаблон Р-РД№1234567';
    }
  }
  return errors;
}

export const DisplayFormikState = props =>
  <div style={{ margin: '1rem 0', background: '#f6f8fa', padding: '.5rem' }}>
    <strong>Injected Formik props (the form's state)</strong>
    <div style={{}}>
      <code>touched:</code> {JSON.stringify(props.transmitprops.touched, null, 2)}
    </div>
    <div>
      <code>errors:</code> {JSON.stringify(props.transmitprops.errors, null, 2)}
    </div>
    <div>
      <code>values:</code> {JSON.stringify(props.transmitprops.values, null, 2)}
    </div>
    <div>
      <code>isSubmitting:</code> {JSON.stringify(props.transmitprops.isSubmitting, null, 2)}
    </div>
  </div>;