import { trace, getClassNames, delay, delayImmediate } from "./functions";

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
  });

  test("returns promise", () => {
    const result = delay(1000);
    expect(result).toBeInstanceOf(Promise);
  });

  test("calls setTimeout", () => {
    const result = delay(1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout.mock.calls[0][0]).toBeInstanceOf(Function);
    expect(setTimeout.mock.calls[0][1]).toBe(1000);
  });
});

describe("delayImmediate", () => {
  beforeEach(() => {
    window.setImmediate = jest.fn();
  });

  test("returns promise", () => {
    const result = delayImmediate();
    expect(result).toBeInstanceOf(Promise);
  });

  test("calls setImmediate", () => {
    const result = delayImmediate(1000);
    expect(setImmediate).toHaveBeenCalledTimes(1);
    expect(setImmediate.mock.calls[0][0]).toBeInstanceOf(Function);
  });
});