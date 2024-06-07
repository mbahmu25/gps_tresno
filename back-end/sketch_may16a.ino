
unsigned long time = 0;
unsigned long timePrev = 0;
int ledPIN = 6;
String probe;

String TEAM_ID = "1084";
String MISSION_TIME, MODE, STATE, HS_DEPLOYED, PC_DEPLOYED, MAST_RAISED,
  GPS_TIME, CMD_ECHO;
int PACKET_COUNT = 0, GPS_SATS = 0;
float ALTITUDE, TEMPERATURE, VOLTAGE, PRESSURE, GPS_ALTITUDE, GPS_LATITUDE,
  GPS_LONGITUDE, TILT_X, TILT_Y;



// === DUMMY DATA

// TEAM_ID       : 1084
// MISSION_TIME  : 13:14:02.01
// PACKET_COUNT  : 22
// MODE          : F | S
// STATE         : LAUNCH_WAIT | ASCENT | ROCKET_SEPARATION |
//                 DESCENT | HS_RELEASE | LANDED
// ALTITUDE      : 293.1 (meter) (from ground)
// HS_DEPLOYED   : P | N
// PC_DEPLOYED   : C | N
// MAST_RAISED   : M | N
// TEMPERATURE   : 59.1 (celcius)
// VOLTAGE       : 10.1 (volt)
// PRESSURE      : 12.1 (kPa)
// GPS_TIME      : 13.14.01
// GPS_ALTITUDE  : 320.3 (meter) (from sea)
// GPS_LATITUDE  : 12.0001 (degree)
// GPS_LONGITUDE : 16.0001 (degree)
// GPS_SATS      : 4
// TILT_X        : 5.01 (degree)
// TILT_Y        : 12.01 (degree)
// CMD_ECHO      : CXON | CXOFF |
//                 STGPS | ST13:35:59 |
//                 SIMENABLE | SIMACTIVATE | SIMDISABLE |
//                 SIMP101325 | CAL |
//                 [optional ->] RESET | RELEASE

// [,,OPTIONAL_DATA]



float getRandom(float start, float end) {
  float range = end - start;
  return random(0, 10000000) * range * 0.0000001 + start;
}


String secondsToHMS(unsigned long seconds) {
  unsigned long t = seconds;

  int s = t % 60;

  t = (t - s) / 60;
  int m = t % 60;

  t = (t - m) / 60;
  int h = t;

  String ss = s < 10 ? "0" + String(s) : String(s);
  String mm = m < 10 ? "0" + String(m) : String(m);
  String hh = h < 10 ? "0" + String(h) : String(h);

  String timeStr = hh + ":" + mm + ":" + ss;
  return timeStr;
}
String secondsToHMSS(unsigned long seconds) {
  String hms = secondsToHMS(seconds);
  int SS = random(25, 55);
  String hmss = hms + "." + SS;
  return hmss;
}

// LAUNCH_WAIT | ASCENT | ROCKET_SEPARATION | DESCENT | HS_RELEASE | LANDED
String getState() {
  int rand = random(0, 6);
  switch (rand) {
    case 0:
      return "LAUNCH_WAIT";
    case 1:
      return "ASCENT";
    case 2:
      return "ROCKET_SEPARATION";
    case 3:
      return "DESCENT";
    case 4:
      return "HS_RELEASE";
    case 5:
      return "LANDED";
    default:
      return "";
  }
}

String getCmdEcho() {
  int rand = random(0, 11);
  switch (rand) {
    case 0:
      return "CXON";
    case 1:
      return "CXOFF";
    case 2:
      return "STGPS";
    case 3:
      return "ST12:35:59";
    case 4:
      return "SIMENABLE";
    case 5:
      return "SIMACTIVATE";
    case 6:
      return "SIMDISABLE";
    case 7:
      return "SIMP101325";
    case 8:
      return "CAL";
    case 9:
      return "RESET";
    case 10:
      return "RELEASE";
    default:
      return "";
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(6, OUTPUT);
  digitalWrite(6, LOW);
}
void loop() {
  time = millis() / 1000;
  digitalWrite(6, LOW);
  if (timePrev - time >= 1) {
    timePrev = time;

    MISSION_TIME = secondsToHMSS(time);
    PACKET_COUNT += 1;
    MODE = random(0, 2) ? 'F' : 'S';
    STATE = getState();
    ALTITUDE = getRandom(0, 800);
    HS_DEPLOYED = random(0, 2) ? 'P' : 'N';
    PC_DEPLOYED = random(0, 2) ? 'C' : 'N';
    MAST_RAISED = random(0, 2) ? 'M' : 'N';
    TEMPERATURE = getRandom(20, 100);
    VOLTAGE = getRandom(1, 12);
    PRESSURE = getRandom(10, 14);
    GPS_TIME = secondsToHMS(time);
    GPS_ALTITUDE = ALTITUDE + random(-30, 30) + 100;
    // VIRGINIA TECH => min location 37.216511, -80.431597 | max
    // location 37.235897, -80.413782
    GPS_LATITUDE = getRandom(37.2165, 37.2358);
    GPS_LONGITUDE = getRandom(-80.4315, -80.4137);
    GPS_SATS = random(1, 10);
    TILT_X = getRandom(-180, 180);
    TILT_Y = getRandom(-180, 180);
    CMD_ECHO = getCmdEcho();

    probe = TEAM_ID;
    probe += "," + String(MISSION_TIME);
    probe += "," + String(PACKET_COUNT);
    probe += "," + String(MODE);
    probe += "," + String(STATE);
    probe += "," + String(ALTITUDE, 1);
    probe += "," + String(HS_DEPLOYED);
    probe += "," + String(PC_DEPLOYED);
    probe += "," + String(MAST_RAISED);
    probe += "," + String(TEMPERATURE, 1);
    probe += "," + String(VOLTAGE, 1);
    probe += "," + String(PRESSURE, 1);
    probe += "," + String(GPS_TIME);
    probe += "," + String(GPS_ALTITUDE, 1);
    probe += "," + String(GPS_LATITUDE, 4);
    probe += "," + String(GPS_LONGITUDE, 4);
    probe += "," + String(GPS_SATS);
    probe += "," + String(TILT_X, 2);
    probe += "," + String(TILT_Y, 2);
    probe += "," + String(CMD_ECHO);
    probe += "\r";

    // printing with error
    
    if (random(100) < 10) {
      Serial.print("narosi,qwyupneris.arsyt0wp90naorist2-0 arsto34/anrsotu92\r");
    } else {
      digitalWrite(6,HIGH);
      Serial.println(probe);
    }
  }

  // int data = Serial.read();
  // if (data != -1) {
  //   digitalWrite(13, HIGH);
  //   delay(10);
  //   digitalWrite(13, LOW);
  // }
}