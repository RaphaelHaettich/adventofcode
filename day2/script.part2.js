const fs = require('fs');
 
const fileContent = fs.readFileSync('day2/input.txt', 'utf8');
const ids = fileContent.split("\n")
const compareLength = (newPattern, longestPattern) => newPattern.length > longestPattern.length ? newPattern : longestPattern;

const findLongestPattern = (ids) => {
    let longestPattern = '';
    for (let i = 0; i < ids.length; i += 1) {
        const longestPatternFromId = findLongestPatternFromId(ids[i], i);
        longestPattern = compareLength(longestPatternFromId, longestPattern);
    };
    return longestPattern;
};

const findLongestPatternFromId = (id, idIndex) => {
    let longestPattern = '';
    for (let i = 0; i < ids.length; i += 1) {
        if(i === idIndex) {
            continue;
        }
        let matchingPattern = '';
        const idToCheck = ids[i];

        if(id.length !== idToCheck.length) {
            throw new Error('String length different');
        }
        for (let j = 0; j < id.length; j += 1) {
            if (id[j] === idToCheck[j]) {
                matchingPattern += id[j];
            }
        }
        longestPattern = compareLength(matchingPattern, longestPattern);
    };
    return longestPattern;
}


const pattern = findLongestPattern(ids);

console.log('Pattern: ', pattern);