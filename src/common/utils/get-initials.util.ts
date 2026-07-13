const getInitials = (name: string) => {
  if (name.trim().length === 0) {
    return "";
  }

  const tokens = name.trim().split(/\s+/);

  if (tokens.length === 1) {
    return tokens[0][0].toUpperCase();
  }

  let initials: Array<string> = [];
  let initialsCounter = 0;
  for (const token of tokens) {
    if (initialsCounter === 2) {
      break;
    }

    if (/^[a-zıİöüşç0-9]+$/i.test(token)) {
      initials.push(token[0]);
      initialsCounter++;
    }
  }

  const [first, second] = initials;
  return `${first?.[0] ?? ""}${second?.[0] ?? ""}`.toUpperCase();
};

export { getInitials };
