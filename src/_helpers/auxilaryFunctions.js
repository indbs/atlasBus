import React from 'react';
import { docType }                          from '../AtlasBusInputForm/constants/constants.js';

export function validateInputFilelds(values = {}){
  let errors = {};
  
  if (!values.email)                                                              errors.email          = 'Введите email';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))        errors.email          = 'Неправильный email';
  if (!values.name)                                                               errors.name           = 'Введите имя';
  else if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.name))                             errors.name           = 'Неправильно введено имя';
  if (!values.surname)                                                            errors.surname        = 'Введите имя';
  else if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.surname))                          errors.surname        = 'Неправильно введена фамилия';
  if (!values.patronymic)                                                         errors.patronymic     = 'Введите отчество';
  else if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.patronymic))                       errors.patronymic     = 'Неправильно введено отчество';
  if (errors.phoneNumber&&!/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d[- .]?\d\d$/.test(values.phoneNumber))     
    errors.phoneNumber     = 'Неправильно введен номер телефона';
  
  if (values.docNumber){
    switch (values.docType){
      case docType.PASSP_RU:       if (!/^[A-Z0-9А-Я]{2,}?[ ]?[A-Z0-9А-Я]{2,}?[ ]?[A-Z0-9А-Я]{6,}$/i.test(values.docNumber))
      errors.docNumber = 'Шаблон 12 34 567890';
      break;
      case docType.PASSP_BY:       if (!/^[A-ZА-Я]{2,}?[0-9]{7,}$/i.test(values.docNumber))
      errors.docNumber = 'Шаблон АБ1234567';
      break;
      case docType.CERT_OB_RU:     if (!/^[A-ZА-Я]{1,}?[-]?[A-ZА-Я]{2,}?[№]?[0-9]{6,}$/i.test(values.docNumber))
      errors.docNumber = 'Шаблон I-HA№123456';
      break;
      case docType.CERT_OB_BY:     if (!/^[A-ZА-Я]{1,}?[-]?[A-ZА-Я]{2,}?[№]?[0-9]{7,}$/i.test(values.docNumber))
      errors.docNumber = 'Шаблон Р-РД№1234567';
      break;
      default: break;
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