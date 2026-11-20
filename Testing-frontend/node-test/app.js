export const greet = (name) => {
  return `Hello, ${name}!`;
};

export const greetInHindi = (name) => {
  return `Namaste, ${name}!`;
};

export const processOrder = (data,dependency)=>{

    const paymentInfo= dependency.processPayment(data.amount);
    return paymentInfo;
};

const processPayment = (amount)=>{
    console.log("I am original processPayment");
    return {id:123,amount};
};

