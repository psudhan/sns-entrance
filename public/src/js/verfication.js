let confirmResult
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
  size: "invisible",
  callback: function (response) {
    console.log("====================================");
    console.log("captcha solved");
    console.log("====================================");
    // reCAPTCHA solved, allow signInWithPhoneNumber.
  },
});
var appVerifier = window.recaptchaVerifier;

function onSignInSubmit() {
    var phoneNumber = getPhoneNumberFromUserInput();
console.log('====================================');
console.log("proceed clicked");
console.log('====================================');
    document.getElementById("enterOTP").style.display="block"
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      confirmResult=confirmationResult
    
    })
    .catch(function (error) {
      // Error; SMS not sent
      // ...
    });
}

function getPhoneNumberFromUserInput() {
  return "+9779866578457";
}

function getCodeFromUserInput() {
   
    return document.getElementById("OTPString").value

}
function verifyOTP() {
    var code = getCodeFromUserInput();
    confirmResult
      .confirm(code)
      .then(function (result) {
        console.log("signed in");
        // User signed in successfully.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
      });
    
}