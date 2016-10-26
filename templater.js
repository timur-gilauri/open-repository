/**
 * JavaScript templater for HTML
 *
 * It needs two parameters to operate with
 * html - is a template string of html with a placeholders 
 * placeholderObj = is an object with a data that needs to replace a placeholder 
 *
 * [~placeholder name~] - placeholder, that will be replaced with a value from the property of placeholderObj ->
 * -> where property name is equal to placeholder name
 * if there is a placeholder that do not matches any placeholderObj property names it replaces with a "[~]" string
 * 
 * RegExp is set to find a placeholder looks like [~placeholder~], ->
 * -> so if you would like to use a diffirent kind of placeholders, you need to reset it with your own one
 *
 * Function returns a string template given to it with a values of given object properties instead of placeholders
 *
 
 ***********************************************************************************************************
 * Шаблонизация html
 *
 * В качестве параметров передаются шаблон html и объект, содержащий нужные данные,
 * которые будут использованы как заменители 
 * [~placeholder~] - вид заменителя
 * Регулярное выражение настроено на поиск именно этого заменителя, вы можете изменить его по желанию
 *  
 * @plhldObj - объект, с определенными свойствами, значения которых будут вставлены на место заменителя с именем этого свойства 
 * @plhldObjNames = массив с именами свойств объекта
 * @plhldLength - количество свойств в объекте
 *
 * каждый заменитель будем заменен на значение свойства,
 * переданного объекта, с соответствующем именем
 *
 * Функция возвращает переданный в нее строку-шаблон со свойствами объекта вместо заменителей
 *
 **/


function setTemplate(html, placeholderObj) {
  'use strict';
  var template = html,
    plhldObj = placeholderObj,
    plhldObjNames = Object.getOwnPropertyNames(plhldObj),
    plhldLength = plhldObjNames.length,
    plhldProp,
    plhldPropValue,
    plhldRegExp = new RegExp('\\[~.+?~\\]', 'gi'),
    i = 0,
    key,
    matchedProp,
    matches;
  for (key in plhldObj) {
    if (plhldObj.hasOwnProperty(key)) {
      plhldProp = key;
      plhldPropValue = String(plhldObj[key]);
      matchedProp = new RegExp('\\[~' + plhldProp + '+?~\\]', 'gi');
      while (matchedProp.exec(template)) {
        if (plhldPropValue.length > 0) {
          template = template.replace(matchedProp, plhldPropValue);
        } else {
          template = template.replace(matchedProp, '');
        }
      }
    }
  }
  while (plhldRegExp.exec(template)) {
    template = template.replace(plhldRegExp, '[~]');
  }
  return template.valueOf();
}


/**
 * Put function in the String.prototype to operate it more comfortable way
 * 
 * function uses as a method of String with only data object as an argument
 * 
 **********************************************************************************************************
 * Заносим функцию в прототип String для более удобного применения
 * Функция применяется как метод строки с передачей только объекта с данными для замены в качестве аргумента
 * 
 **/
String.prototype.setTemplate = function (obj) {
  'use strict';
  return setTemplate.call(this, this, obj);
};
