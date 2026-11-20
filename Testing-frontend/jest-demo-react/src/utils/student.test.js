import { isEligible } from "./student.js";

describe("isEligible", () => {
  test("returns true when attendance is exactly 75%", () => {
    expect(isEligible(75)).toBe(true);
  });

  test("returns true when attendance is above 75%", () => {
    expect(isEligible(90)).toBe(true);
  });

  test("returns false when attendance is below 75%", () => {
    expect(isEligible(74)).toBe(false);
  });

  test("accepts attendance at the valid limits", () => {
    expect(isEligible(0)).toBe(false);
    expect(isEligible(100)).toBe(true);
  });

  test("throws for attendance below 0%", () => {
    expect(() => isEligible(-1)).toThrow("Invalid attendance percentage");
  });

  test("throws for attendance above 100%", () => {
    expect(() => isEligible(101)).toThrow("Invalid attendance percentage");
  });
});