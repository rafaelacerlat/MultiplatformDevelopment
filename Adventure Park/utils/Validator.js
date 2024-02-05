import {db} from '../Firebase.config.js';
import { doc, updateDoc, getDoc, collection, onSnapshot } from "firebase/firestore";


const alphaLower = 'abcdefghijklmnopqrstuvwxyz';
const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digit = '0123456789';
const special = '!`\'"@#$%^&*()_+{}|\?/.><,+*/-';
const minAge = 10;

function validateEmail(email) {
    // return new RegExp(
    //     '[\\w.-]+@[\\w-]+(\\.[a-z]+)+'
    // ).test(email);
    let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}

function validatePassword(password) {
    // should have a minimum of 6 characters and contain 
    // at least 1 uppercase letter, 1 lowercase letter, 1 special character
    let cleanPassword = password.trim();
    if (cleanPassword.length < 6) {
        return false;
    }
    let hasOneLowerCaseLetter = false, hasOneUpperCaseLetter = false, hasOneSpecial = false;
    for (let i of cleanPassword) {
        if (alphaLower.indexOf(i) != -1) {
            hasOneLowerCaseLetter = true;
        }
        if (alphaUpper.indexOf(i) != -1) {
            hasOneUpperCaseLetter = true;
        }
        if (special.indexOf(i) != -1) {
            hasOneSpecial = true;
        }
        if (hasOneLowerCaseLetter && hasOneUpperCaseLetter && hasOneSpecial) {
            break;
        }
    }
    return hasOneLowerCaseLetter && hasOneUpperCaseLetter && hasOneSpecial;
}

function validateTextField(text) {
    return text.trim().length > 0;
}

function getValidBirthdayDate() {
    let today = new Date();
    let pastAge =  new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    let month = (pastAge.getMonth() + 1).toString();
    if (month.length == 1)
        month = '0' + month;
    return pastAge.getFullYear() + '-' + month + '-' + pastAge.getDate();
}

function toDate(dateStr) {
    let split = dateStr.split('-');
    return new Date(split[0], parseInt(split[1]) - 1, split[2], 1);
}

function isValidBirthdayDate(date) {
    return toDate(date) <= toDate(getValidBirthdayDate());
}

async function isUsernameUnique(username){
    const usersColRef = collection(db, "users");
    let unique = true;
    usersColRef.forEach(doc => {
      if (doc.get('username') === username)
        unique = false;
    });
    return unique;
  }

async function validateUserData(
    name, 
    surname, 
    username, 
    birthdayDate,
    street,
    city,
    postcode,
    email, 
    password,
) {
    let message = [];
    if (validateTextField(name) && validateTextField(surname) && validateTextField(username)) {
        //if (await isUsernameUnique(username)) {
            if (isValidBirthdayDate(birthdayDate)) {
                if (validateTextField(street) && validateTextField(city) && validateTextField(postcode)) {
                    if (validateEmail(email)) {
                        message.push('Enter a valid email!');
                    } else {
                        if(!validatePassword(password))
                            message.push('The password must have at least 6 characters, 1 uppercase letter, 1 lowercase letter and 1 special character!');
                    }
                        
                } else {
                    message.push('Enter valid values for street, city and postal code!');
                }
            } else {
                message.push('Enter valid age! (at least 10 y.o.)');
            }
        // } else {
        //     message.push('This username is taken!');
        // }
    } else {
        message.push('Fill in the name, surname and username fields correctly!');
    }
    return message;
}

export {validateUserData};