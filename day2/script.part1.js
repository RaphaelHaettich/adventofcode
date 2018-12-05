const fs = require('fs');
 
const fileContent = fs.readFileSync('day2/input.txt', 'utf8');

const ids = fileContent.split("\n")
let twoLetters = 0;
let threeLetters = 0;

const calculateLetters = (ids) => {
    for (let id of ids) {
        const map = lettersToMap(id);
        let twoCount = 0;
        let threeCount = 0;
        map.forEach((count) => {
            if(count === 2) {
                twoCount++;
            }
            if(count === 3) {
                threeCount++;
            }
        });
        if(twoCount > 0) {
            twoLetters++;
        }
        if(threeCount > 0) {
            threeLetters++;
        }
    };
};

const lettersToMap = (id) => {
    const map = new Map();
    for (let letter of id) {
        if (map.has(letter)) {
            let currentValue = map.get(letter);
            currentValue++;
            map.set(letter, currentValue);
        } else {
            map.set(letter, 1);
        }
    }
    return map;
}

calculateLetters(ids);

console.log('twoLetters: ', twoLetters);
console.log('threeLetters: ', threeLetters);
console.log('hash: ', twoLetters * threeLetters);