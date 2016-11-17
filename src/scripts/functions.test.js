import { trace, getClassNames, delay } from "./functions";

describe("trace", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  test("logs static method", () => {
    trace(Object, Object.keys, "1", 2, [3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Object::keys", "1", 2, [3]);
  });

  test("logs instance method", () => {
    const obj = new Object();
    trace(obj, obj.toString, "1", 2, [3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Object.toString", "1", 2, [3]);
  });

  test("logs bound method", () => {
    const obj = new Object();
    obj.toString = obj.toString.bind(obj);
    trace(obj, obj.toString, "1", 2, [3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Object.toString", "1", 2, [3]);
  });

  test("logs class constructor", () => {
    const obj = new Object();
    trace(obj, obj.constructor, "1", 2, [3]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Object.constructor", "1", 2, [3]);
  });
});

describe("getClassNames", () => {
  test("handles simple arguments", () => {
    const result = getClassNames("class1", "class2 class3");
    expect(result).toBe("class1 class2 class3");
  });

  test("handles complex arguments", () => {
    const result = getClassNames("class1", { class2: true, class3: false }, ["class4 class5", { class6: false, class7: true }]);
    expect(result).toBe("class1 class2 class4 class5 class7");
  });

  test("removes duplicates", () => {
    const result = getClassNames("class1", { class1: true, class2: true }, ["class1 class2", { class1: true, class2: true }]);
    expect(result).toBe("class1 class2");
  });

  test("strips whitespace", () => {
    const result = getClassNames("  class1  class2  ", ["  class3  "], { "  class4  class5  ": true });
    expect(result).toBe("class1 class2 class3 class4 class5");
  });

  test("returns undefined", () => {
    const result = getClassNames(" ", null, { "class1": false }, []);
    expect(result).toBeUndefined();
  });
});

describe("delay", () => {
  beforeEach(() => {
    window.setTimeout = jest.fn();
    window.setImmediate = jest.fn();
  });

  test("calls setTimeout with time argument", () => {
    const result = delay(1000);
    expect(result).toBeInstanceOf(Promise);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test("calls setImmediate without time argument", () => {
    const result = delay();
    expect(result).toBeInstanceOf(Promise);
    expect(setImmediate).toHaveBeenCalledTimes(1);
  });
});