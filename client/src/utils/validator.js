import {isValidUsername} from "6pp"

export const usernameValidator = (value) => {
    if (!value) return "Username is required";
    if (!isValidUsername(value)) return {isValid : false , errorMessage: 'Username format is invalid'}
}
