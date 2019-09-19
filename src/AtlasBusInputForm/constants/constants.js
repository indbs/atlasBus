export const docType = {
    pasp_rus:                   'Паспорт РФ',
    pasp_by:                    'Паспорт РБ',
    cert_of_birth_ru:           'Свидетельство о рождении РФ',
    cert_of_birth_by:           'Свидетельство о рождении РБ'
}

export function docTypeArr(docType={}) {
    let docTypeArr = [];
    for(var item in docType) {docTypeArr.push(docType[item])}
    return docTypeArr;
}