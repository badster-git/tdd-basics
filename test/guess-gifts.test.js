class GuessGifts {
  constructor() {
    this.wishlist = [];
    this.presents = [];
  }

  guessesArray(wishlist, presents) {
    if (wishlist.length === 0 || presents.length === 0) {
      return false;
    }

    let guesses = wishlist.reduce((acc, item) => {
      const objKeys = Object.keys(item);
      let isEqual = false;
      for (let x in presents) {
        let numEqual = 0;
        for (let i in objKeys) {
          if (objKeys[i] !== "name") {
            if (item[objKeys[i]] === presents[x][objKeys[i]]) numEqual += 1;
            else break;
          }
        }
        if (numEqual === 3) {
          isEqual = true;
          break;
        }
      }

      if (isEqual) {
        acc.push(item.name);
      }
      return acc;
    }, []);
    console.log(guesses);
    return guesses;
  }
}

describe("GuessGifts", () => {
  let guessGifts;

  beforeEach(() => {
    guessGifts = new GuessGifts();
  });

  it("starts with wishlish & presents set to `[]`", () => {
    expect(guessGifts.wishlist).toEqual([]);
    expect(guessGifts.presents).toEqual([]);
  });

  it("lists are empty", () => {
    const wishlist = [];
    const presents = [];
    let isEqual = guessGifts.guessesArray(wishlist, presents);
    expect(isEqual).toBeFalsy();
  });

  it("wishlist and present list are equal", () => {
    const wishlist = [
      { name: "mini puzzle", size: "small", clatters: "yes", weight: "light" },
    ];
    const present = [{ size: "small", clatters: "yes", weight: "light" }];
    let isEqual = guessGifts.guessesArray(wishlist, present);

    expect(isEqual).toEqual(["mini puzzle"]);
  });

  it("return Mini Puzzle & Toy Car", () => {
    const wishlist = [
      { name: "Mini Puzzle", size: "small", clatters: "yes", weight: "light" },
      { name: "Toy Car", size: "medium", clatters: "a bit", weight: "medium" },
      { name: "Card Game", size: "small", clatters: "no", weight: "light" },
    ];
    const presents = [
      { size: "medium", clatters: "a bit", weight: "medium" },
      { size: "small", clatters: "yes", weight: "light" },
    ];
    let guesses = guessGifts.guessesArray(wishlist, presents);

    guesses.forEach((x) => expect(["Toy Car", "Mini Puzzle"]).toContain(x));
  });

  it("return one of each regardless of same values for multiple presents and wishlist items", () => {
    const wishlist = [
      { name: "Mini Puzzle", size: "small", clatters: "yes", weight: "light" },
      { name: "Mini Bands", size: "small", clatters: "yes", weight: "light" },
      { name: "Mini Licks", size: "small", clatters: "yes", weight: "heavy" },
      { name: "Toy Car", size: "medium", clatters: "a bit", weight: "medium" },
      {
        name: "Toy Truck",
        size: "medium",
        clatters: "a bit",
        weight: "medium",
      },
    ];
    const presents = [
      { size: "medium", clatters: "a bit", weight: "medium" },
      { size: "medium", clatters: "a bit", weight: "medium" },
      { size: "small", clatters: "yes", weight: "light" },
    ];
    let guesses = guessGifts.guessesArray(wishlist, presents);

    guesses.forEach((x) =>
      expect(["Toy Car", "Mini Puzzle", "Toy Truck", "Mini Bands"]).toContain(x)
    );
  });
});
