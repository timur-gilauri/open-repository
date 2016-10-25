/**
 *
 * Шаблонизация html
 *
 * В качестве параметров передаются шаблон html и объект, содержащий нужные данные,
 * Которые будут использованы как заменители
 * [~placeholder name~] - вид заменителя
 *
 *  @plhldObjNames = массив с именами свойств объекта
 *
 *  @plhldLength - количество свойств в объекте
 *
 * каждый заменитель будем заменен на значение свойства,
 * переданного объекта, с соответствующем именем
 *
 *
 *
 *  Функция возвращает переданный в нее строку-шаблон со свойствами объектов вместо заменителей
 **/


function setTemplate(html, placeholderObj) {
  'use strict';
  var template = html,
    plhldObj = placeholderObj,
    plhldObjNames = Object.getOwnPropertyNames(plhldObj),
    plhldLength = plhldObjNames.length,
    plhldProp,
    i = 0,
    matchedProp,
    matches;
  for (i; i < plhldLength; i += 1) {
    plhldProp = plhldObjNames[i];
    matchedProp = new RegExp('\\[~' + plhldProp + '+?~\\]', 'gi');
    while (matchedProp.exec(template)) {
      if (plhldObj[plhldProp].length > 0) {
        template = template.replace(matchedProp, plhldObj[plhldProp]);
      } else {
        template = template.replace(matchedProp, '');
      }
    }
  }
  return template;
}