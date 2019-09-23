export const docType = {
    PASSP_RU            :'Паспорт РФ',
    PASSP_BY            :'Паспорт РБ',
    CERT_OB_RU          :'Свидетельство о рождении РФ',
    CERT_OB_BY          :'Свидетельство о рождении РБ'
}

export function docTypeArr(docType={}) {
    let docTypeArr = [];
    for(var item in docType) {docTypeArr.push(docType[item])}
    return docTypeArr;
}

export const sex = [
    'М',
    'Ж'
]

export const section = [
    'А',
    'Б',
    'В'
]