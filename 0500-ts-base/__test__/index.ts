export const logMock = (outputs: string[]) => {
  return (message: string) => outputs.push(message);
};
