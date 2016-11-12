import { trace, getClassNames } from "./functions";

describe("trace", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  test("static method", () => {
    trace(Object, Object.keys, "1", 2, [3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Object::keys", "1", 2, [3]);
  });

  test("instance method", () => {
    const instance = new Object();
    trace(instance, instance.toString, "1", 2, [3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Object.toString", "1", 2, [3]);
  });

  test("bound instance method", () => {
    const instance = new Object();
    instance.toString = instance.toString.bind(instance);
    trace(instance, instance.toString, "1", 2, [3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Object.toString", "1", 2, [3]);
  });

  test("class constructor", () => {
    const instance = new Object();
    trace(instance, instance.constructor, "1", 2, [3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Object.constructor", "1", 2, [3]);
  });
});

describe("getClassNames", () => {
  test("single argument", () => {
    const classNames = getClassNames("class1");
    expect(classNames).toEqual("class1");
  });

  test("multiple arguments", () => {
    const classNames = getClassNames("class1", "class2");
    expect(classNames).toEqual("class1 class2");
  });

  test("variable arguments", () => {
    const classNames = getClassNames("class1", { class2: true, class3: false }, ["class4 class5", { class6: false, class7: true }]);
    expect(classNames).toEqual("class1 class2 class4 class5 class7");
  });

  test("removes duplicates", () => {
    const classNames = getClassNames("class1", { class1: true, class2: true }, ["class1 class2", { class1: true, class2: true }]);
    expect(classNames).toEqual("class1 class2");
  });

  test("strips whitespace", () => {
    const classNames = getClassNames("  class1  class2  ", ["  class3  "], { "  class4  class5  ": true });
    expect(classNames).toEqual("class1 class2 class3 class4 class5");
  });

  test("returns undefined", () => {
    const classNames = getClassNames();
    expect(classNames).toBeUndefined();
  });

  test("returns undefined", () => {
    const classNames = getClassNames(null);
    expect(classNames).toBeUndefined();
  });

  test("returns undefined", () => {
    const classNames = getClassNames(" ");
    expect(classNames).toBeUndefined();
  });

  test("returns undefined", () => {
    const classNames = getClassNames("", { "class1": false }, []);
    expect(classNames).toBeUndefined();
  });
});