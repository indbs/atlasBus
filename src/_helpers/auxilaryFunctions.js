

export function validateInputFilelds(values = {}){
  let errors = {};
  /*
  if (!values.email)                                                        errors.email          = 'Введите email';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))       errors.email          = 'Неправильный email';
  if (!values.passportNumber)                                               errors.passportNumber = 'Введите номер паспорта';
  if (!/^[A-Z0-9]{8,}$/i.test(values.passportNumber))                       errors.passportNumber = 'В номере паспорта должно быть 8-мь символов';
  */
  if (!values.name)                                                         errors.name           = 'Введите имя';
  if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.name))                            errors.name           = 'Неправильно введено имя';
  /*
  if (!values.surname)                                                      errors.surname        = 'Введите имя';
  if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.surname))                         errors.surname        = 'Неправильно введена фамилия';
  if (!values.patronymic)                                                   errors.patronymic     = 'Введите отчество';
  if (!/^[A-Zа-яА-ЯЁё]{2,}$/i.test(values.patronymic))                      errors.patronymic     = 'Неправильно введено отчество';
  if (!values.phoneNumber)                                                                                    errors.phoneNumber     = 'Введите номер телефона';
  if (!/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d[- .]?\d\d$/.test(values.phoneNumber))     errors.phoneNumber     = 'Неправильно введен номер телефона';
  */
  if (!values.checkboxGroup)                                                errors.checkboxGroup     = 'Выберите один тип документа';
  return errors;
}