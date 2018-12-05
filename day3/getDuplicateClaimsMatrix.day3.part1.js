const fs = require('fs');

const fileContent = fs.readFileSync('day3/input.txt', 'utf8');

const claimsArray = fileContent.split("\n");


const claimsToObjectArray = (claims) => {
    const claimsObjArray = [];
    claims.forEach(claim => {
        const size = claim.split(':')[1].trim().split('x');
        const coordiantes = claim.split('@')[1].split(':')[0].trim().split(',');
        const sizeX = Number(size[0]);
        const sizeY = Number(size[1]);
        const cordX = Number(coordiantes[0]);
        const cordY = Number(coordiantes[1]);
        claimsObjArray.push({ cord: { cordX, cordY }, size: { sizeX, sizeY } });
    });

    return claimsObjArray;
};

const claimsObjArrayLoop = (claimsObjArray) => {
    const matrix = Array(1300).fill(null).map(() => Array(1300).fill(0));
    for (let claimObj of claimsObjArray) {
        const { cordX, cordY } = claimObj.cord;
        const { sizeX, sizeY } = claimObj.size;
        for (let sizeXIndex = 0; sizeXIndex < sizeX; sizeXIndex++) {
            const currentSizeXNumber = sizeXIndex + cordX;
            for (let sizeYIndex = 0; sizeYIndex < sizeY; sizeYIndex++) {
                const currentSizeYNumber = sizeYIndex + cordY;;
                matrix[currentSizeXNumber][currentSizeYNumber]++;
            }
        }
    }
    return matrix;
};

const countDuplicateClaims = (matrix) => {
    let duplicates = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            // console.log(matrix[i][j])
            if (matrix[i][j] > 1) {
                duplicates++;
            }
        }
    }
    return duplicates;
};

const getDuplicateClaims = () => {
    
    const claimsObjArray = claimsToObjectArray(claimsArray);
    const filledMatrix = claimsObjArrayLoop(claimsObjArray);
    const count = countDuplicateClaims(filledMatrix);

    return count;
}

console.log('Duplicate claims:', getDuplicateClaims());