const fs = require('fs');
 
const fileContent = fs.readFileSync('day1/input.txt', 'utf8');

const startFrequency = 0;
const changesInFrequency = fileContent.split("\n")

const calculateFrequency = (startFrequency, changesInFrequency) => {
    let result = startFrequency;
    changesInFrequency.forEach(change => {
        result += Number(change);
    });

    return result;
};

const endFrequnecy = calculateFrequency(startFrequency, changesInFrequency);

console.log('endFrequnecy: ', endFrequnecy);