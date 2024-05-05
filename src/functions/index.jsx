export function validateInput(type, input) {
  let regex;
  switch (type) {
    case "email":
      regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      break;
    case "phoneNumber":
      regex = /^\d{7,}$/;
      break;
    case "name":
      regex = /^[A-Za-z -]+$/;
      break;
    default:
      false;
  }

  return regex.test(input);
}

export function validateEmptyValue(input) {
  if (
    input.dob === "" ||
    input.address.city === "" ||
    input.address.district === "" ||
    input.address.province === "" ||
    input.address.country === ""
  ) {
    return true;
  } else {
    return false;
  }
}
