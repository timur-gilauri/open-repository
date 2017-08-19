/*
* mixed @source -  source to find entries to replace.
* Could be an instance of Object, Array or String
*
* mixed @regexp - a regular expression to find in the source and to replace.
* could be an instance of RegExp or Array of RegExp's
*
* mixed @replacement - a replacement.
* could be an instance of string or array of replacement strings.
*
* */


function escapeChars(source, regexp, replacement) {
  
  function replaceChars(source) {
    
    if (!source) {
      throw new Error("Объект не передан");
    } else if (!regexp) {
      throw new Error("Argument 2 could be an instance of RegExp or String. Undefined given");
    } else if (!replacement) {
      throw new Error("Argument 3 could be an instance of RegExp or String. Undefined given");
    }
    
    
    if (typeof source === 'string') {
      if (regexp.__proto__.constructor.name === 'RegExp' && typeof replacement === 'string') {
        return source.replace(new RegExp(regexp, 'gi'), replacement);
      } else if (regexp.__proto__.constructor.name === 'RegExp' && replacement.__proto__.constructor.name === "Array") {
        return source.replace(new RegExp(regexp, 'gi'), replacement[0]);
      } else if (regexp.__proto__.constructor.name === "Array" && typeof replacement === 'string') {
        regexp.forEach(function (regExpItem) {
          source = source.replace(new RegExp(regExpItem, 'gi'), replacement);
        });
        return source;
      } else if (regexp.__proto__.constructor.name === "Array" && replacement.__proto__.constructor.name === "Array") {
        regexp.forEach(function (regExpItem, index) {
          if (replacement[index]) {
            source = source.replace(new RegExp(regExpItem, 'gi'), replacement[index]);
          }
        });
        return source;
      }
    } else if (typeof source === 'number') {
      return source;
    } else if (source.__proto__.constructor.name === 'Array') {
      return source.map(function (element, index) {
        return replaceChars(element);
      });
    } else if (source.__proto__.constructor.name === 'Object') {
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          source[prop] = replaceChars(source[prop]);
        }
      }
      return source;
    }
  }
  
  return replaceChars(source);
}