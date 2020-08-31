// function centuryFromYear(year) {
//     if (year <= 0) {
//         console.log("Please enter a valid year")
//     }
//     else if (year <= 100) {
//         console.log(1);
//     }
//     else if (year % 100 == 0) {
//         console.log(year / 100)
//     }
//     else 
//     console.log(Math.floor(year / 100 + 1))
//     }

//     centuryFromYear(2020)
function checkPalindrome(inputString) {
    const split = inputString.split("");
    console.log(split)
    const reversed = split.reverse().join("");
    console.log(reversed)
    
if (split.join("") === reversed) {

    console.log(true);
}
else {
    console.log(false);
}
}
checkPalindrome("abacb");
