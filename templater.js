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
 * каждый заменитель будем заменен на значение свойства,
 * переданного объекта, с соответствующем именем
 *
 * Функция возвращает переданный в нее строку-шаблон со свойствами объекта вместо заменителей
 *
 **/


function setTemplate(html, inputValuesObj, showEmptyProps) {
  'use strict';
  
  let template = html,
    inputPropertyValue,
    emptyValueRegExp = new RegExp('\\[~[^!].+?~\\]', 'gi'),
    inputProperty,
    matchedProp;
  
  /* Производим замену всех заменителей на значения из переданного объекта */
  
  for (inputProperty in inputValuesObj) {
    if (inputValuesObj.hasOwnProperty(inputProperty)) {
      inputPropertyValue = String(inputValuesObj[inputProperty]);
      matchedProp = new RegExp('\\[~' + inputProperty + '+?~\\]', 'gi');
      while (matchedProp.exec(template)) {
        if (inputPropertyValue.length > 0) {
          template = template.replace(matchedProp, inputPropertyValue);
        } else {
          if (showEmptyProps) {
            template = template.replace(matchedProp, '[~! ' + inputProperty + ' is empty ~]');
          } else {
            template = template.replace(matchedProp, '');
          }
        }
      }
    }
  }
  
  /* Дополнительная проверка на оставшиеся заменители, если значение не переданно в параметрах, заменитель меняется на [~] */
  
  while (emptyValueRegExp.exec(template)) {
    template = template.replace(emptyValueRegExp, '[~]');
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
String.prototype.setTemplate =  String.prototype.setTemplate || function (params, showEmptyProps) {
  'use strict';
  return setTemplate.call(this, this, params, showEmptyProps);
};
