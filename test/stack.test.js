class Stack {
  constructor() {
    this.top = -1;
    this.items = {};
  }

  get peek() {
    return this.items[this.top];
  }

  push(val) {
    this.top += 1;
    this.items[this.top] = val;
  }

  pop() {
    if (this.top === -1 || this.top === 0) {
      console.log(this.top);
      this.top = -1;
      this.items = {};
    } else {
      delete this.items[this.top];
      this.top -= 1;
    }
  }
}

describe("My Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it("is created empty", () => {
    expect(stack.top).toBe(-1);
    expect(stack.items).toEqual({});
  });

  it("can push to the top", () => {
    stack.push("Avocado");
    expect(stack.top).toBe(0);
    expect(stack.peek).toBe("Avocado");
  });

  it("can pop off", () => {
    stack.pop();
    expect(stack.top).toBe(-1);
    expect(stack.items).toEqual({});
    stack.push("Length");
    stack.pop();
    expect(stack.top).toBe(-1);
    expect(stack.items).toEqual({});
  });
});
