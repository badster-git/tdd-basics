class VinChecker {
  constructor() {
    this.vin = 0;
    this.numTable = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      J: 1,
      K: 2,
      L: 3,
      M: 4,
      N: 5,
      P: 7,
      R: 9,
      S: 2,
      T: 3,
      U: 4,
      V: 5,
      W: 6,
      X: 7,
      Y: 8,
      Z: 9,
    };
    this.weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
  }

  checkLength(val) {
    return val.length === 17;
  }

  checkLetters(val) {
    return /[IOQ]/i.test(val);
  }

  convertToNum(val) {
    let convertedValues = val
      .split("")
      .map((char) =>
        char.match(/[a-z]/i)
          ? this.numTable[char.toUpperCase()]
          : char.toUpperCase()
      )
      .join("");
    return convertedValues;
  }

  multiplyByWeight(val) {
    let productArray = val
      .split("")
      .map((num, idx) => Number(num) * this.weights[idx]);
    return productArray;
  }

  sumProducts(products) {
    return products.reduce((acc, cv) => acc + cv, 0);
  }

  modulusCheck(sum, converted) {
    let mod11 = sum % 11;

    if (Number(mod11) === 10) {
      return converted[8].toUpperCase() === "X";
    }
    return Number(converted[8]) === mod11;
  }
}

describe("Vin Test", () => {
  let vinChecker;
  beforeEach(() => {
    vinChecker = new VinChecker();
  });

  it("is created set to 0 & numTable initialized", () => {
    const localNumTable = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      J: 1,
      K: 2,
      L: 3,
      M: 4,
      N: 5,
      P: 7,
      R: 9,
      S: 2,
      T: 3,
      U: 4,
      V: 5,
      W: 6,
      X: 7,
      Y: 8,
      Z: 9,
    };
    const localWeights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

    expect(vinChecker.vin).toBe(0);
    expect(vinChecker.numTable).toMatchObject(localNumTable);
    expect(vinChecker.weights).toEqual(localWeights);
  });

  it("check for invalid length", () => {
    const vin = "85YJ3E1EA7HF000337";
    let isNotValid = vinChecker.checkLength(vin);
    expect(isNotValid).toBeFalsy();
  });

  it("check for valid length of 17", () => {
    const vin = "5YJ3E1EA7HF000337";
    let isValid = vinChecker.checkLength(vin);
    expect(isValid).toBeTruthy();
  });

  it("does contain I,O,Q", () => {
    const vin = "IQ3423O33Q2YAER33";
    let isNotValidLetters = vinChecker.checkLetters(vin);
    expect(isNotValidLetters).toBeTruthy();
  });

  it("does contain lowercase I,O,Q", () => {
    const vin = "iq3423O33o2YAER33";
    let isNotValidLetters = vinChecker.checkLetters(vin);
    expect(isNotValidLetters).toBeTruthy();
  });

  it("does not contain I,O,Q", () => {
    const vin = "5YJ3E1EA7HF000337";
    let isValidLetters = vinChecker.checkLetters(vin);
    expect(isValidLetters).toBeFalsy();
  });

  it("ensure lowercase letters are checked", () => {
    const vin = "4yje1eaihf000337";
    let lowerCaseLetters = vinChecker.checkLetters(vin);
    expect(lowerCaseLetters).toBeTruthy();
  });

  it("converts vin correctly", () => {
    const vin = "5YJ3E1EA7HF000337";
    let converted = vinChecker.convertToNum(vin);
    expect(converted).toEqual("58135151786000337");
  });

  it("converts lowercase vin correctly", () => {
    const vin = "5yj3e1ea7hf000337";
    let converted = vinChecker.convertToNum(vin);
    expect(converted).toEqual("58135151786000337");
  });

  it("multiplies by weights correctly", () => {
    const converted = "58135151786000337";
    let weightProduct = vinChecker.multiplyByWeight(converted);
    expect(weightProduct).toEqual([
      40, 56, 6, 15, 20, 3, 10, 10, 0, 72, 48, 0, 0, 0, 12, 9, 14,
    ]);
  });

  it("gets sum of products", () => {
    const multipliedWeights = [
      40, 56, 6, 15, 20, 3, 10, 10, 0, 72, 48, 0, 0, 0, 12, 9, 14,
    ];
    let productSum = vinChecker.sumProducts(multipliedWeights);
    expect(productSum).toBe(315);
  });

  it("9th character in vin is equal to sum modulo 11", () => {
    const productSum = 315;
    const vin = "5YJ3E1EA7HF000337";
    expect(vinChecker.modulusCheck(productSum, vin)).toBeTruthy();
  });

  it("is valid when modulo 11 is equal to 10 & 9th character is `X`", () => {
    const productSum = 318;
    const vin = "5YJ3E1EAXHF000347";

    expect(vinChecker.modulusCheck(productSum, vin)).toBeTruthy();
  });

	it("9th character is not equal to sum modulo 11", () => {
    const productSum = 315;
    const vin = "5YJ3E1EA3HF000337";
    expect(vinChecker.modulusCheck(productSum, vin)).toBeFalsy();


	})

  it("is not valid when modulo 11 is equal to 10 & 9th character is not `X`", () => {
    const productSum = 318;
    const vin = "5YJ3E1EA7HF000347";

    expect(vinChecker.modulusCheck(productSum, vin)).toBeFalsy();
  });

  it("is valid when modulo 11 is equal to 10 & 9th character is lowercase `x`", () => {
    const productSum = 318;
    const vin = "5YJ3E1EAxHF000347";

    expect(vinChecker.modulusCheck(productSum, vin)).toBeTruthy();
  });
});
