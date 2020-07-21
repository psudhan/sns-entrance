let timeRemainingContainer=document.getElementById("timeRemaining")
const totalTimeInMinutes=1
let totalTimeInSecond=totalTimeInMinutes*60
let totaltimeInHours=Math.floor(totalTimeInMinutes/60)
let isTimeBadgeRed=false
let timer
//for the first time
//later this has to comde from api
//startTheTimer()
function startTheTimer(){
    timerFunction()

   timer=setInterval(()=>timerFunction(),1000)
}

function timerFunction() {
    console.log('====================================');
    console.log("from the timer");
    console.log('====================================');
    if (totalTimeInSecond==0) {
        timeRemainingContainer.setAttribute("class","badge badge-danger")
        timeRemainingContainer.innerText="Time's Up!"
    clearInterval(timer)
    }
    else{
         
    let minutesRemaining=Math.floor((totalTimeInSecond/60)%60).toString()
    let hoursRemaining=Math.floor(totalTimeInSecond/3600).toString()
    let secondsRemaining=(totalTimeInSecond%60).toString()
    minutesRemaining=minutesRemaining<10?+"0"+minutesRemaining:minutesRemaining
    secondsRemaining=secondsRemaining<10?+"0"+secondsRemaining:secondsRemaining
    hoursRemaining=hoursRemaining<1?"00":hoursRemaining
    //for time less than 5 minutes
    let isTimeLessThanFiveMinutes =parseInt(minutesRemaining)<5
    let timeRemaining=hoursRemaining+":"+ minutesRemaining+":"+secondsRemaining
   
    timeRemainingContainer.innerText=timeRemaining

    
    if (isTimeLessThanFiveMinutes && !isTimeBadgeRed){
        timeRemainingContainer.setAttribute("class","badge badge-danger")
isTimeBadgeRed=true

    }
  

    totalTimeInSecond--
    }
   

   
}
console.log('====================================');
console.log("from timer.js");
console.log('====================================');
