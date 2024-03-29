const shuffle = require("../src/shuffle");

describe("shuffle should...", () => {
  // CODE HERE
  test("shuffle should return array", () => {
    const input = [1, 2, 3, 4, 5];
    const shuffled = shuffle(input);
    expect(Array.isArray(shuffled)).toBe(true);
  });

  test("items should have been shuffled around", () => {
    const input = [1, 2, 3, 4, 5];
    const originalString = input.join("");
    const shuffled = shuffle(input);
    const shuffledString = shuffled.join("");

    expect(shuffledString).not.toBe(originalString);
  });
});
