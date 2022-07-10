const preloader = document.querySelector(".prev-loader");
window.onload = hidePreloader = () => {
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
};

const registerFormInputs = document.querySelectorAll(".register_inputs_input");
const registerSubmitBtn = document.querySelector(".register-form-submit-btn");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const userNameInput = document.querySelector("#user-name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const reEnteredPasswordInput = document.querySelector("#password-confirm");

const minLengthPassword = 8;
const inputValueObj = {
  "first-name": "",
  "last-name": "",
  "user-name": "",
  email: "",
  password: "",
  "password-confirm": "",
};

const clearSpaceTwoLead = (str) => str.trim();

const mapManyCenterSpaceToOneSpace = (str) => str.replace(/  +/g, " ");

const capitalizeFirstLetter = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const requiredField = (valueInput) => valueInput || false;

const validateLettersAndSpaces = (valueInput) => {
  const regexLettersAndSpaces = /^[a-zA-Z\s]*$/;
  return regexLettersAndSpaces.test(valueInput);
};

const validateVietNameseLettersAndSpaces = (valueInput) => {
  valueInput = mapManyCenterSpaceToOneSpace(valueInput);
  valueInput = capitalizeFirstLetter(valueInput);
  const regexVietnameseLettersAndSpaces =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/;
  return regexVietnameseLettersAndSpaces.test(valueInput);
};

const validateLettersAndNumbers = (valueInput) => {
  const regexLettersAndNumbers = /^[a-zA-Z0-9]*$/;
  return regexLettersAndNumbers.test(valueInput);
};

const validateEmail = (inputValue) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(inputValue);
};

const validateLength = (valueInput, minLength) => {
  return valueInput.length >= minLength;
};

const validateSameValue = (oldValue, newValue) => {
  return oldValue === newValue;
};

const validateForm = (idInput, valueInput) => {
  switch (idInput) {
    case "first-name":
    case "last-name":
      return (
        requiredField(valueInput) &&
        validateVietNameseLettersAndSpaces(valueInput)
      );
    case "user-name":
      return requiredField(valueInput) && validateLettersAndNumbers(valueInput);
    case "email":
      return requiredField(valueInput) && validateEmail(valueInput);
    case "password":
      return (
        requiredField(valueInput) &&
        validateLettersAndNumbers(valueInput) &&
        validateLength(valueInput, 8)
      );
    case "password-confirm":
      return (
        requiredField(valueInput) &&
        validateSameValue(passwordInput.value, valueInput)
      );
    default:
      alert("Something is wrong");
  }
};

const checkInputWhenBlur = (e) => {
  const valueInput = clearSpaceTwoLead(e.target.value);
  if (validateForm(e.target.id, valueInput)) {
    inputValueObj[e.target.id] = valueInput;
    e.target.nextElementSibling.nextElementSibling.classList.add(
      "register-input_valid--display"
    );
  } else {
    e.target.classList.add("register_inputs_input--danger");
    e.target.nextElementSibling.classList.add("register-input_error--display");
  }
};

const clearMessageInputWhenFocus = (e) => {
  e.target.classList.remove("register_inputs_input--danger");
  e.target.nextElementSibling.classList.remove("register-input_error--display");
  e.target.nextElementSibling.nextElementSibling.classList.remove(
    "register-input_valid--display"
  );
};

registerFormInputs.forEach((inputElement) => {
  inputElement.addEventListener("blur", checkInputWhenBlur);
  inputElement.addEventListener("focus", clearMessageInputWhenFocus);
});

registerSubmitBtn.addEventListener("click", () => {
  const checkAllInputValid = Object.values(inputValueObj).every(
    (inputValue) => inputValue !== ""
  );
  if (checkAllInputValid) {
    alert("Register success. You will be redirected to the homepage");
    window.location.href = "http://127.0.0.1:5500";
  } else {
    alert("Has invalid input. Please check back.");
  }
});
