// practise testing service

export const helper = () => {
  const num = Math.floor(Math.random() * 10);
  return num % 2 == 0;
};

export const execute = () => {
  const result = helper;
  if (result) {
    return "Learning JS";
  } else {
    return "Learning reactJS";
  }
};

export default {
  execute,
  helper,
};
