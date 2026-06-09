const joinClassNames = (...classNames: Array<string | undefined>) => {
  if (classNames.length === 0) {
    return "";
  }

  return classNames.filter(Boolean).join(" ");
};

export { joinClassNames };
