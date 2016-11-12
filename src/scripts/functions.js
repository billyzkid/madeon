export function trace(instance, method, ...args) {
  if (instance.name) {
    // static method
    console.log(instance.name + "::" + method.name, ...args);
  } else if (instance.constructor !== method) {
    // instance method
    console.log(instance.constructor.name + "." + method.name.replace(/^bound\s/, ""), ...args);
  } else {
    // class constructor
    console.log(instance.constructor.name + ".constructor", ...args);
  }
}

export function getClassNames(...args) {
  var array = [];

  for (var i = 0, l = args.length; i < l; i++) {
    var arg = args[i];
    if (arg) {
      if (Array.isArray(arg)) {
        array.push(getClassNames.apply(null, arg));
      } else if (typeof arg === "string") {
        array.push(arg);
      } else if (typeof arg === "object") {
        for (var key in arg) {
          if (arg.hasOwnProperty(key) && arg[key]) {
            array.push(key);
          }
        }
      }
    }
  }
  
  // strip whitespace
  array = array.join(" ").match(/\S+/g) || [];
  
  // remove duplicates
  array = array.filter((value, index, self) => self.indexOf(value) === index);

  if (array.length > 0) {
    return array.join(" ");
  }
}