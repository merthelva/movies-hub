const serializeErrorMessage = (message: string | Array<string>): string => {
  if (typeof message === "string") {
    return message;
  }
  return message.map((msg) => `❌ ${msg}`).join("\n");
};

export { serializeErrorMessage };
