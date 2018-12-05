const fs = require('fs');
const dayjs = require('dayjs');

const fileContent = fs.readFileSync('day4/input.1.txt', 'utf8');

const logArray = fileContent.split("\n");



const formatArray = (logArray) => {
    console.log(logArray);
    const logArrayFormatted = [];
    logArray.forEach(log => {
        const time = new Date(log.split('[')[1].split(']')[0]).getTime();
        const msg = log.split(']')[1].trim();
        logArrayFormatted.push({time, msg});
    });
    return logArrayFormatted;
};
const sortArray = (logArrayFormatted) => logArrayFormatted.sort((a, b) =>  a.time - b.time);;

const doFunc = (logArray) => {
    const logArrayFormatted = formatArray(logArray);
    const logArraySorted = sortArray(logArrayFormatted);
    console.log(logArraySorted);
};

doFunc(logArray);