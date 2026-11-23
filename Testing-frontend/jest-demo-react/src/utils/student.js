export const isEligible=(atten)=>{
    if(atten<0 || atten>100){
        throw new Error("Invalid attendance percentage");
    }
    return atten>=75;
};