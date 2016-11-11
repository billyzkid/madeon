export function trace(instance, method, ...args) {
  if (instance.constructor === method) {
    console.log("%s.constructor", instance.constructor.name, ...args);
  } else {
    console.log("%s.%s", instance.constructor.name, method.name.replace(/^bound\s/, ""), ...args);
  }
}

export function getClassNames() {
  var classNames = [];

  for (var i = 0, l = arguments.length; i < l; i++) {
    var arg = arguments[i];
    if (arg) {
      if (Array.isArray(arg)) {
        classNames.push(getClassNames.apply(null, arg));
      } else {
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classNames.push(arg);
        } else if (argType === "object") {
          for (var key in arg) {
            if (arg.hasOwnProperty(key) && arg[key]) {
              classNames.push(key);
            }
          }
        }
      }
    }
  }
  
  if (classNames.length > 0) {
    return classNames.join(" ");
  }
}