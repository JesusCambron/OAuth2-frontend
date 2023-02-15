const EMAIL_REGEX = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const NAME_REGEX = /^([a-zA-ZÑñÁáÉéÍíÓóÚúÜü]+\s{0,1})+[a-zA-ZÑñÁáÉéÍíÓóÚúÜü]$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,15}$/;

export const isEmptyString = (value) => {
  if (value.trim() === "") return true;
  return false;
}

export const isCorrectLength = (value, max, min) => {
  if (value.length > max || value.length < min) return false;
  return true;
}

export const isEmail = (email) => {
  if (EMAIL_REGEX.test(email)) return true;
  return false
}

export const isValidateName = (value) => {
  if (NAME_REGEX.test(value)) return true;
  return false
}

export const isValidatePassword = (password) => {
  if (PASSWORD_REGEX.test(password)) return true;
  return false
}