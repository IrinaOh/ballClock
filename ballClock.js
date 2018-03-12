var t0 = performance.now();

function checkOrder(t){
  var l = t.length;
  for (var j=0; j<l; j++) {
    if (t[j] != (j+1)) { // [0]=1, [1]=2, etc.
      return false; //  out of order.
    }
  }
  return true;
}

function checkPerformance(t) {
  var t1 = performance.now();
  console.log("Completed in " + (t1 - t) + " milliseconds (" + Math.round(t1-t)/1000 + " seconds)");
}

//main functionality
function ballClock(numBalls, min){
  if(numBalls < 27 || numBalls > 127){
    console.log("Error: Please choose a number between 27 and 127");
    return;
  }
  var originTray = [];
  var minute = [];
  var fiveMinutes = [];
  var hour = [];
  var minutes = 1;
  var cycleComplete = false;

  for (var i=1; i<=numBalls; i++){ // create an array of balls in the original queue
    originTray.push(i);
  }
  // main functionality
  while(!cycleComplete){
    minute.push(originTray.shift()); // remove first element from the origin tray
    if(minute.length === 5){
      fiveMinutes.push(minute.pop()); //moving the last ball on the next tray
      minute.reverse();
      originTray = originTray.concat(minute); //damp all balls to the origin tray
      minute.splice(0, minute.length); // empty current tray
      if(fiveMinutes.length === 12){
        hour.push(fiveMinutes.pop()); //moving the last ball on the next tray
        fiveMinutes.reverse();
        originTray = originTray.concat(fiveMinutes); //damp all balls to the origin tray
        fiveMinutes.splice(0, fiveMinutes.length); // empty current tray
        if(hour.length === 12){
          var lastOne = hour.pop();
          hour.reverse();
          originTray = originTray.concat(hour);
          hour.length = 0;
          originTray.push(lastOne);
        }
      }
    }
    if(min === minutes) { //second mode stopping point
      console.log("{ 'Min': [" + minute + "], 'FiveMin': [" + fiveMinutes + "], 'Hour': [" + hour + "], 'Main': [" + originTray + "]}");
      checkPerformance(t0);
      return;
    }
    cycleComplete = checkOrder(originTray);//check if balls are back in to the original order
    if(cycleComplete){
      var days = Math.round(minutes/(24*60));
      console.log(numBalls + " balls cycle after " + days + " days.");
      checkPerformance(t0);
      return minutes;
    }
    minutes ++;
  }
}

// first mode
ballClock(30);
ballClock(45);
ballClock(128); //returns an error message
// second mode
ballClock(30, 325);
