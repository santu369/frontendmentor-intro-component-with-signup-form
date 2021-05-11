/* get references */

const formEl = document.getElementById("form");

const firstNameFieldEl = document.getElementById("form-control-first-name");
const lastNameFieldEl = document.getElementById("form-control-last-name");
const emailAddressFieldEl = document.getElementById(
  "form-control-email-address"
);
const passwordFieldEl = document.getElementById("form-control-password");

const passwordViewToggleEl = document.getElementById("password-toggle");

const formSuccessMsgEl = document.getElementById("form-success-msg");

/* set states */

let error;
let passwordViewToggled = false;
let passwordViewTimeout = "";

/* form submit */

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  error = false;
  checkInputs();
  if (!error) {
    firstNameFieldEl.children[1].value = "";
    lastNameFieldEl.children[1].value = "";
    emailAddressFieldEl.children[1].value = "";
    passwordFieldEl.children[1].value = "";
    formSuccessMsgEl.style.opacity = 1;
    formSuccessMsgEl.style.visibility = "revert";
  }
});

/* validate all form inputs */

const checkInputs = () => {
  checkInput(
    "text",
    "First Name",
    firstNameFieldEl.children[1].value.trim(),
    firstNameFieldEl
  );
  checkInput(
    "text",
    "Last Name",
    lastNameFieldEl.children[1].value.trim(),
    lastNameFieldEl
  );
  checkInput(
    "email",
    "Email Address",
    emailAddressFieldEl.children[1].value.trim(),
    emailAddressFieldEl
  );
  checkInput(
    "password",
    "Password",
    passwordFieldEl.children[1].value.trim(),
    passwordFieldEl
  );
};

/* validate each form input */

const checkInput = (type, fieldName, value, element) => {
  if (type === "text" || type === "password") {
    if (value === "") {
      setError(element, fieldName + " cannot be empty");
    } else {
      resetError(element);
    }
  } else if (type === "email") {
    if (value === "") {
      setError(element, fieldName + " cannot be empty");
    } else {
      if (!isEmail(value)) {
        setError(element, "Looks like this is not an email");
      } else {
        resetError(element);
      }
    }
  }
};

/* validate email */

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/.test(
    email
  );
}

/* set error */

const setError = (element, msg) => {
  error = true;
  element.classList.add("error");
  element.children[3].textContent = msg;
};

/* reset error */

const resetError = (element) => {
  element.classList.remove("error");
};

/* toggle show/hide password */

passwordFieldEl.children[1].addEventListener("focus", (e) => {
  passwordViewToggleEl.style.display = "block";
});

passwordFieldEl.children[1].addEventListener("blur", (e) => {
  if (!passwordViewToggled) {
    passwordViewTimeout = setTimeout(() => {
      passwordViewToggleEl.style.display = "none";
    }, 250);
  }
});

passwordViewToggleEl.addEventListener("hover", (e) => {
  clearTimeout(passwordViewTimeout);
  passwordViewToggleEl.style.display = "block";
});
passwordViewToggleEl.addEventListener("focus", (e) => {
  clearTimeout(passwordViewTimeout);
  passwordViewToggleEl.style.display = "block";
});

passwordViewToggleEl.addEventListener("click", (e) => {
  togglePassword(e);
});

passwordViewToggleEl.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    togglePassword(e);
  }
});

const togglePassword = (e) => {
  passwordViewToggled = true;
  clearTimeout(passwordViewTimeout);
  if (e.target.classList.contains("fa-eye")) {
    passwordFieldEl.children[1].setAttribute("type", "text");
  } else {
    passwordFieldEl.children[1].setAttribute("type", "password");
  }
  e.target.classList.toggle("fa-eye");
  e.target.classList.toggle("fa-eye-slash");
  passwordFieldEl.children[1].focus();
  passwordViewToggled = false;
};
