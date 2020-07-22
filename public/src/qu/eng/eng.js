const db = firebase.firestore();
let loadedPageForFirstTime = true;
//gets the current question number
getQuestionNumber();
let questionInfo = {
  /* questionString,
    opt1,
    opt2,
    opt3,
    opt4,
    correctOption
*/
};
function getQuestionNumber(params) {
  db.collection("questions")
    .doc("English").collection("engQuestions")
    .get()
    .then(function (questioncollection) {
      console.log(questioncollection.docs.length);
      //object.size()returns the length of object
      if (loadedPageForFirstTime) {
        document.getElementById("questionEntryPage").style.display = "block";
      }
      questionInfo.questionNumber=1 + questioncollection.docs.length
      document.getElementById("questionNumber").innerText ="Q. "+questionInfo.questionNumber
        
    })
    .catch(function (error) {
      console.log(error);
    });
}

function submitQuestion() {
  questionInfo.questionString = document.getElementById("questionString").value;
  questionInfo.opt1 = document.getElementById("opt1").value;
  questionInfo.opt2 = document.getElementById("opt2").value;

  questionInfo.opt3 = document.getElementById("opt3").value;

  questionInfo.opt4 = document.getElementById("opt4").value;

  questionInfo.correctOption = document.querySelector(
    "input[name=correctOption]:checked"
  )
    ? document.querySelector("input[name=correctOption]:checked").value
    : "";
  console.log("====================================");
  console.log(questionInfo);
  console.log("====================================");
  uploadQuestion();
}
function uploadQuestion() {
  if (
    !(
      questionInfo == {} ||
      questionInfo.opt1 == "" ||
      questionInfo.opt2 == "" ||
      questionInfo.opt3 == "" ||
      questionInfo.opt4 == "" ||
      questionInfo.questionString == "" ||
      questionInfo.correctOption == ""
    )
  ) {
    // if no fields are empty
    document.getElementById("submitSpinner").style.display="block"
    db.collection("questions")
      .doc("English").collection("engQuestions").doc("Q. "+questionInfo.questionNumber)
      .set(questionInfo)
      .then(function () {
          questionWrote()
        console.log("Wrote Question");
      });
      

      
  } else {
    //some field is empty
    console.log("====================================");
    console.log("not completed");
    console.log("====================================");
    document.getElementById("completeAllFields").innerHTML =
      "Complete All the fields";
  }
}

//returns the number of data in object
Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
function questionWrote() { //remove the spinner
  document.getElementById("submitSpinner").style.display="none"
    //remove the empty message
    document.getElementById("completeAllFields").innerHtml=""
    //gets and reset the question number for next question
    getQuestionNumber()
    //empties the input boxes
    document.getElementById("questionString").value=""
    document.getElementById("opt1").value=""
    document.getElementById("opt2").value=""
    document.getElementById("opt3").value=""

    document.getElementById("opt4").value=""
    document.querySelector("input[name=correctOption]:checked").checked=false

    
}