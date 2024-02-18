export const generateId = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const time = date.getTime();
  const uniqueId = `${year}-${month}-${day}-${time}`;
  //   const randomNum = Math.floor(Math.random() * 100000);
  return uniqueId;
};
