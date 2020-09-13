class ValidationUtils {
  public isEmailValid(email: string) {
    const regX = new RegExp(/^[a-zA-Z0-9_]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/);
    return regX.test(email);
  }

  public isValidNumber(num: string, length: number) {
    const regX = new RegExp(/^[0-9]*$/);
    const result = regX.test(num);
    if (result) {
      return num.length === length && Number(num) !== 0;
    }
    return false;
  }

  public isValidText(text: string) {
    const regX = new RegExp(/^[a-zA-Z .]*$/);
    return regX.test(text);
  }

  public isValidGender(gender: string) {
    let isValid = false;
    const _gender = gender.toLowerCase();
    if (_gender === "male" || _gender === "female" || _gender === "other") {
      isValid = true;
    }
    return isValid;
  }

  public isValidPinCode(pin: string) {
    const regX = new RegExp(/^[1-9]{1}[0-9]{5}$/);
    return regX.test(pin);
  }
}
export default ValidationUtils;
