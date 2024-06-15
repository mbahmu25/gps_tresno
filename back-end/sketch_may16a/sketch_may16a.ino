
unsigned long time = 0;
unsigned long timePrev = 0;

String probe;


float getRandom(float start, float end) {
  float range = end - start;
  // Serial.println(range);
  return random(0, 1000000) * range * 0.00001+start;
}


void setup() {
  Serial.begin(115200);
}
void loop() {
  time = millis() / 1000;
  
  if (timePrev - time >= 1) {
    timePrev = time;

    probe = String(random(1,5));
    probe += "," + String(-getRandom(7.7701,7.7751));
    probe += "," + String(getRandom(110.3721,110.3771));
    probe += "\r";

    // printing with error
    
  //   if (random(100) < 10) {
  //     Serial.print("narosi,qwyupneris.arsyt0wp90naorist2-0 arsto34/anrsotu92\r");
  //   } else {
  //     digitalWrite(6,HIGH);
  //     Serial.println(probe);
  //   }
  // }
  Serial.println(probe);
  // int data = Serial.read();
  // if (data != -1) {
  //   digitalWrite(13, HIGH);
  //   delay(10);
  //   digitalWrite(13, LOW);
  }
}