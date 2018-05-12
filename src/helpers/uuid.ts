/**
 * Inspired by http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/
 */
export const generateUUID = () => {
  let d: number;
  if (Date.now) {
    d = Date.now();
  } else {
    d = new Date().getTime();
  }

  if (window.performance) {
    d += performance.now(); // use high-precision timer if available
  }

  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    // tslint:disable-next-line:no-bitwise
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export default generateUUID;
