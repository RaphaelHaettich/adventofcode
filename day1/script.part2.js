const fs = require('fs');

const fileContent = fs.readFileSync('day1/input.txt', 'utf8');
const changesInFrequency = fileContent.split("\n");
const startFrequency = 0;
const set = new Set();

const calculateFrequency = (startFrequency, changesInFrequency) => {
    let result = startFrequency;
    for (let change of changesInFrequency) {
        result += Number(change);
        if(set.has(result)) {
            return result;
        }
        set.add(result);
    };

    return calculateFrequency(result, changesInFrequency);
};

const endFrequnecy = calculateFrequency(startFrequency, changesInFrequency);

console.log('twice: ', endFrequnecy);