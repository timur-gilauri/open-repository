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
class Templater {
  
  constructor(htmlTemplate, inputValuesObj, showEmptyProperties) {
    this.emptyValueRegExp = new RegExp('\\[~[^!].+?~\\]', 'gi');
    this.template = htmlTemplate;
    this.data = inputValuesObj;
  }
  
  setTemplate(stringTemplate) {
    this.template = stringTemplate;
  }
  
  compile() {
    /* Производим замену всех заменителей на значения из переданного объекта */
    
    for (property in this.data) {
      if (this.data.hasOwnProperty(property)) {
        
        let inputPropertyValue = String(this.data[property]);
        propertyRegExp = new RegExp('\\[~' + property + '+?~\\]', 'gi');
        
        while (propertyRegExp.exec(this.template)) {
          if (inputPropertyValue.length > 0) {
            this.template = this.template.replace(propertyRegExp, inputPropertyValue);
          } else {
            if (showEmptyProps) {
              this.template = this.template.replace(propertyRegExp, '[~! ' + property + ' is empty ~]');
            } else {
              this.template = this.template.replace(propertyRegExp, '');
            }
          }
        }
      }
    }
    
    /* Дополнительная проверка на оставшиеся заменители, если значение не переданно в параметрах, заменитель меняется на [~] */
    
    while (emptyValueRegExp.exec(this.template)) {
      this.template = this.template.replace(emptyValueRegExp, '[~]');
    }
    return this.template.valueOf();
  }
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
