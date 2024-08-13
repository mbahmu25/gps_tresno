/*
  parsing data provided
*/

// checking data validity
const check = (data) => {
    const checkRange = (num, f, t) => {
      return f <= num && num <= t;
    };
    const checkBinary = (data2) => {
      if (data2.length !== 5) return false;
      for (const bit of data2) {
        if (bit !== "1" && bit !== "0") return false;
      }
      return true;
    };
    const checkDate = (data3) => {
      const arrDate = data3.split("/");
      if (arrDate.length !== 3) return false;
      return !isNaN(new Date(arrDate[1] + "/" + arrDate[0] + "/" + arrDate[2]));
    };
    const checkClock = (data4) => {
      const arrClock = data4.split("/");
      if (arrClock.length !== 3) return false;
      const HH = parseInt(arrClock[0]);
      const MM = parseInt(arrClock[1]);
      const SS = parseInt(arrClock[2]);
      if (isNaN(HH) || isNaN(MM) || isNaN(SS)) return false;
      return (
        checkRange(HH, 0, 23) && checkRange(MM, 0, 59) && checkRange(SS, 0, 59)
      );
    };
    const checkCommand = (data19) => {
      if (data19.length !== 4) return false;
      return (
        checkRange(parseInt(data19[0]), 0, 9) &&
        "RGB".indexOf(data19[1]) !== -1 &&
        checkRange(parseInt(data19[2]), 0, 9) &&
        "RGB".indexOf(data19[3]) !== -1
      );
    };
    if (data == null) return false;
    if (data[data.length - 1] != ";") return false;
    data = data.slice(0, data.length - 1);
    let arrData = data.split(",");
    if (arrData.length != 22) return false;
    for (let i = 0; i < arrData.length; i++) {
      if (arrData[i] === "" || arrData[i].length === 0) return false;
      if (i != 3 && i != 4 && i != 19 && isNaN(arrData[i])) return false;
    }
    if (
      !checkBinary(arrData[2]) ||
      !checkDate(arrData[3]) ||
      !checkClock(arrData[4]) ||
      !checkCommand(arrData[19])
    )
      return false;
    return arrData;
  };
  export default {check};
  