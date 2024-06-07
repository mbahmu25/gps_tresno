/*
  This function return a random dummy data generator
  so that user can use it to test the code
*/

const getRandom = (f, t) => {
  return (Math.floor(Math.random() * 100) % (t - f + 1)) + f;
};

const getRandomFloat = (f, t) => {
  return (Math.floor(Math.random() * 100) * (t - f + 1)) / 100 + f;
};

let cnt = 0;
const packetNumber = () => {
  cnt++;
  return cnt.toString();
};

const sateliteStatus = () => {
  return getRandom(1, 5).toString();
};

const errorCode = () => {
  let res = "";
  for (let i = 0; i < 5; i++) {
    res += getRandom(0, 0.5).toString();
  }
  return res;
};

const missionTime = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const hh = String(today.getHours());
  const mi = String(today.getMinutes());
  const ss = String(today.getSeconds());

  const res = dd + "/" + mm + "/" + yyyy + "," + hh + "/" + mi + "/" + ss;
  return res;
};

const pressure = () => {
  // pressure 1 and 2
  return getRandom(0, 100).toString() + "," + getRandom(0, 100).toString();
};

const altitude = () => {
  // altitude 1, 2, difference
  const alt1 = getRandom(0, 100);
  const alt2 = getRandom(0, 100);
  return (
    alt1.toString() +
    "," +
    alt2.toString() +
    "," +
    Math.abs(alt1 - alt2).toString()
  );
};

const descentRate = () => {
  return getRandom(0, 100).toString();
};

const temperature = () => {
  return getRandom(0, 100).toString();
};

const voltage = () => {
  return getRandom(0, 100).toString();
};

let posX = 6.7;
let posY = 6.7;
let posZ = 6.7;
const gps = () => {
  posX += getRandomFloat(0, 2) - 1;
  posY += getRandomFloat(0, 2) - 1;
  posZ += getRandomFloat(0, 2) - 1;
  return posX.toFixed(4) + "," + posY.toFixed(4) + "," + posZ.toFixed(4);
};

const pitchRollYaw = () => {
  return (
    getRandom(0, 100).toString() +
    "," +
    getRandom(0, 100).toString() +
    "," +
    getRandom(0, 100).toString()
  );
};

const lnln = () => {
  const rgb = "RGB";
  return (
    getRandom(0, 9).toString() +
    rgb.charAt(getRandom(0, rgb.length - 1)) +
    getRandom(0, 10).toString() +
    rgb.charAt(getRandom(0, rgb.length - 1))
  );
};

const iotData = () => {
  return getRandom(0, 100).toString();
};

const teamId = () => {
  return getRandom(1000, 9999).toString();
};

const randomDataGenerator = () => {
  return (
    packetNumber() +
    "," +
    sateliteStatus() +
    "," +
    errorCode() +
    "," +
    missionTime() +
    "," +
    pressure() +
    "," +
    altitude() +
    "," +
    descentRate() +
    "," +
    temperature() +
    "," +
    voltage() +
    "," +
    gps() +
    "," +
    pitchRollYaw() +
    "," +
    lnln() +
    "," +
    iotData() +
    "," +
    teamId() +
    ";"
  );
};

export default randomDataGenerator;
