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

export function validateEmptyValue(name) {
  switch (name) {
    case "dob":
      return 0;

    case "city":
      return 1;
    case "district":
      return 2;
    case "province":
      return 3;
    case "country":
      return 4;
    default:
      return;
  }
  // if (
  //   input.dob === "" ||
  //   input.address.city === "" ||
  //   input.address.district === "" ||
  //   input.address.province === "" ||
  //   input.address.country === ""
  // ) {
  //   return true;
  // } else {
  //   return false;
  // }
}
