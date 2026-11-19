export const greet = (name) => {
  return `Hello, ${name}!`;
};

export const greetInHindi = (name) => {
  return `Namaste, ${name}!`;
};

export const processOrder = (order, { processPayment }) => {
  return processPayment(order.amount);
};
