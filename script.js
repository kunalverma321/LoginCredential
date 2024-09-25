// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrN9e3dvgv_GSw0pP-U-Ou7BxEBNgLJYQ",
    authDomain: "login-credential-aca23.firebaseapp.com",
    projectId: "login-credential-aca23",
    storageBucket: "login-credential-aca23.appspot.com",
    messagingSenderId: "4056141777",
    appId: "1:4056141777:web:d20c7946639d77e3779af0",
    measurementId: "G-MMLKQ6ML79"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Setup reCAPTCHA
const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',  // Make visible for testing
    'callback': function(response) {
        console.log("reCAPTCHA solved, OTP sending allowed.");
    },
    'expired-callback': function() {
        console.log("reCAPTCHA expired. Solve it again.");
    }
});

// Sending OTP
document.getElementById('sendOtp').addEventListener('click', function() {
    const mobileNumber = "+91" + document.getElementById('mobile').value;  // Modify according to country code

    if (validateMobile(mobileNumber)) {
        // Send OTP using Firebase
        firebase.auth().signInWithPhoneNumber(mobileNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Store confirmationResult to verify later
                window.confirmationResult = confirmationResult;
                document.getElementById('statusMessage').innerText = 'OTP sent! Please check your phone.';
            }).catch((error) => {
                console.error("Error during signInWithPhoneNumber:", error);
                document.getElementById('statusMessage').innerText = `Error sending OTP: ${error.message}`;
            });
    } else {
        document.getElementById('statusMessage').innerText = 'Invalid mobile number';
    }
});

// Verifying OTP
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const enteredOtp = document.getElementById('otp').value;

    // Verify OTP
    window.confirmationResult.confirm(enteredOtp).then((result) => {
        // User signed in successfully
        const user = result.user;
        console.log("User signed in:", user);
        document.getElementById('statusMessage').innerText = 'OTP Verified! Login Successful';
        // Redirect to the next page
        window.location.href = 'nextPage.html';  // Update to the actual next page
    }).catch((error) => {
        console.error("Error verifying OTP:", error);
        document.getElementById('statusMessage').innerText = 'Incorrect OTP';
    });
});

// Simple mobile number validation function
function validateMobile(mobile) {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
}
