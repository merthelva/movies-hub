const checkIsNumberString = (numStr: string) => {
  return /^-?\d+$/.test(numStr);
};

export { checkIsNumberString };
