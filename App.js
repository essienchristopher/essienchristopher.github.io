const email = document.getElementById("email").value;
const name = document.getElementById("name").value;
const message = document.getElementById("message").value;
const submitBtn = document.getElementById("submitBtn");
const errorMessage = document.getElementById("errorMessage");
const errorIcon = document.getElementById("errorIcon");

const validate = () => {
  if (!emailValue.includes("@") || !emailValue.includes(".com")) {
    errorMessage.style.display = "block";
    errorIcon.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    errorIcon.style.display = "none";
  }
};
if (email > 0) {
  email.style.backGroundColor = "transparent";
}
