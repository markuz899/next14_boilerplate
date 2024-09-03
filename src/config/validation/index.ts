export const messages = {
  required: "Campo Obbligatorio",
  email: "Inserire una email valida",
  notValidNumber: "Numero non valido",
  fiscalCode: "Codice fiscale non valido",
  minLength: "La password deve essere lunga almeno 8 caratteri",
  upperCharacter: "La password deve contenere almeno un carattere maiuscolo",
  oneNumber: "La password deve contenere almeno un numero",
  specialCharacter:
    "La password deve contenere almeno un carattere speciale (!@#$%^&*()_+)",
};

export const regex = {
  email:
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
  fiscalCode: /[a-z]{6}\d{2}[abcdehlmprst]\d{2}[a-z]\d{3}[a-z]/i,
  telephone: /^(([+])39)?((3[0-9][0-9]))(\d{7})$/,
  vat: /^[0-9]{11}$/,
  specialCharacter: /[!@#$%^&*()_+]/,
  oneNumber: /\d/,
  upperCharacter: /[A-Z]/,
  maxLength: /^.{8,60}$/,
};
