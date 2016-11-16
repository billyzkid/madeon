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
  let array = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      if (Array.isArray(arg)) {
        array.push(getClassNames.apply(null, arg));
      } else if (typeof arg === "string") {
        array.push(arg);
      } else if (typeof arg === "object") {
        for (const key in arg) {
          if (arg.hasOwnProperty(key) && arg[key]) {
            array.push(key);
          }
        }
      }
    }
  }
  
  // strip whitespace
  array = array.join(" ").match(/\S+/g);
  
  // remove duplicates
  array = [...new Set(array)];

  if (array.length > 0) {
    return array.join(" ");
  }
}

export function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}