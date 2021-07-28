class ISBNValidator {
  isValidISBNLength(isbn) {
    return isbn.length === 10;
  }

  isValidISBNValues(isbn) {
    return /[0-9]{10}|[0-9]{9}X$/i.test(isbn);
  }

  isValidISBNSum(isbn) {
    let sum = [...isbn].reduce((acc, cv, idx) => {
      if (/x/i.test(cv)) return acc + 10 * (idx + 1);
      else return acc + Number(cv) * (idx + 1);
    }, 0);
    return sum % 11 === 0;
  }
}

describe("ISBNValidation", () => {
  let isbnValidation;
  let validISBN;

  beforeEach(() => {
    isbnValidation = new ISBNValidator();
    validISBN = "1112223339";
    validISBNWithX = "048665088X";

    invalidISBN = "1234512345";
    invalidISBNWithX = "X123456788";
    invalidISBNLength = "1112223339X";
  });

  it("is valid length", () => {
    expect(isbnValidation.isValidISBNLength(validISBN)).toBeTruthy();
  });

  it("does contain valid numbers", () => {
    expect(isbnValidation.isValidISBNValues(validISBN)).toBeTruthy();
    expect(isbnValidation.isValidISBNValues(validISBNWithX)).toBeTruthy();
  });

  it("is valid modulo calculation", () => {
    expect(isbnValidation.isValidISBNSum(validISBN)).toBeTruthy();
    expect(isbnValidation.isValidISBNSum(validISBNWithX)).toBeTruthy();
  });

  it("is invalid length", () => {
    expect(isbnValidation.isValidISBNLength(invalidISBNLength)).toBeFalsy();
  });

  it("contains invalid values", () => {
    expect(isbnValidation.isValidISBNValues(invalidISBNWithX)).toBeFalsy();
  });

  it("is invalid ISBN", () => {
    expect(isbnValidation.isValidISBNSum(invalidISBN)).toBeFalsy();
  });
});
