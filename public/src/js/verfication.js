const db = firebase.firestore();
let studentInfo={}
/* studentinfo={
  studentId,
  studentName,
  studentPhoneNumber,
  examTaken
}*/
let currentPage;
let confirmResult;
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "studentIdVerifyBtn",
  {
    size: "invisible",
    callback: function (response) {
      console.log("====================================");
      console.log("captcha solved");
      console.log("====================================");
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    },
  }
);
let appVerifier = window.recaptchaVerifier;

function onProceed() {
  
  console.log("====================================");
  console.log("proceed clicked");
  console.log("====================================");

  //get student id from id input text
  studentInfo.studentId = document.getElementById("studentIdString").value;
  //spin the proceed spinner
  if (!(studentInfo.studentId=="")) {
    document.getElementById("proceedSpinner").style.display="block"
    getPhoneNumberFromStudentId();
  }
  
  //getPhoneNumberFromStudentId has phone number gettingmethod which when return triggers the otp section

}

function getPhoneNumberFromStudentId() {

  //set Student Id
  
 
  db.collection("students").doc(studentInfo.studentId).get().then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      //set student phone name 
      studentInfo.studentName=doc.data().studentName;
      //set student phone name 
      studentInfo.studentPhoneNumber="+977"+doc.data().studentPhoneNumber;
      //set student test taken or not
      studentInfo.testTaken=doc.data().testTaken;

      console.log('====================================');
      console.log("this is srudent info"+ studentInfo);
      console.log('====================================');
      console.log('====================================');
      console.log("phoneNumber:"+ studentInfo.studentPhoneNumber);
      console.log('====================================');
      callFirebaseForOTP();
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
  }).catch(function (error){
    console.log(error);
  })
 
}

function getCodeFromUserInput() {
  return document.getElementById("OTPString").value;
}
function verifyOTP() {
  
  var code = getCodeFromUserInput();
if (!(code=="")) {
  document.getElementById("verifySpinner").style.display="block"
  confirmResult
  .confirm(code)
  .then(function (result) {
    console.log("signed in");
    onVerified();
    // User signed in successfully.
    var user = result.user;
    // ...
  })
  .catch(function (error) {
    // User couldn't sign in (bad verification code?)
    // ...
  });
}
 
}
function onVerified(params) {
  //removing the verify spinner
  document.getElementById("verifySpinner").style.display="none"
  document.getElementById("OTPVerifyBtn").innerText = "Verified !";
  document.getElementById("takeExam").style.display = "block";
  document.getElementById("takeExam").removeAttribute("disabled");
}
function callFirebaseForOTP() {
  console.log("gettingOTP");
  
  if (studentInfo.studentPhoneNumber) {
    firebase
      .auth()
      .signInWithPhoneNumber(studentInfo.studentPhoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        confirmResult = confirmationResult;
        document.getElementById("proceedSpinner").style.display="none"
        document.getElementById("enterOTP").style.display = "block";
      })
      .catch(function (error) {
        console.log(error);
        // Error; SMS not sent
        // ...
      });
  }
}

function takeExam() {
  //if testtaken is false then load exam page or load score page
  if (!studentInfo.testTaken) {
    //close the verification page

closePage("verificationPage")
openPage("examPage")
  }else{

  }
  

  //document.getElementById("verificationPage").style.display="none"

  
}


