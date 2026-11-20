export const isEligible = (attendance) => {
  if (attendance < 0 || attendance > 100) {
    throw new Error("Invalid attendance percentage");
  }

  return attendance >= 75;
};
