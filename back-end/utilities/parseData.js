/*
  parsing data provided
*/

// checking data validity
const check = (data) => {
  if (data == null) return false;
  if (data[data.length - 1] != ";") return false;
  data = data.slice(0, data.length - 1);
  let arrData = data.split(",");
  if (arrData.length != 22) return false;
  return arrData;
};

// parsing data into Object
const parseData = (data) => {
  let arrData = check(data);
  if (arrData == false) return null;
  let result = {
    packetNum: arrData[0],
    satStatus: arrData[1],
    eCode: arrData[2],
    date: arrData[3],
    clock: arrData[4],
    pres1: arrData[5],
    pres2: arrData[6],
    alt1: arrData[7],
    alt2: arrData[8],
    altDiff: arrData[9],
    descRate: arrData[10],
    temp: arrData[11],
    volt: arrData[12],
    gpsLat: arrData[13],
    gpsLong: arrData[14],
    gpsAlt: arrData[15],
    pitch: arrData[16],
    roll: arrData[17],
    yaw: arrData[18],
    lnln: arrData[19],
    iot: arrData[20],
    teamId: arrData[21],
  };
  return result;
};

export default parseData;
