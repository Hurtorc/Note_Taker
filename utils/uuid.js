//create a function that generates a unique id
const uuid = () => {
  return Math.random().toString(36).slice(2);
};