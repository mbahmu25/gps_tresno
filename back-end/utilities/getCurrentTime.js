const getTime = () => {
  let today = new Date();
  let hh = String(today.getHours());
  let mi = String(today.getMinutes());
  let ss = String(today.getSeconds());
  let res = hh + "/" + mi + "/" + ss;
  return res;
};

export default getTime;
