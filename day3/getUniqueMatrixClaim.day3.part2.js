const fs = require('fs');

const fileContent = fs.readFileSync('day3/input.txt', 'utf8');

const claimsArray = fileContent.split("\n");


const claimsToObjectArray = (claims) => {
    const claimsObjArray = [];
    claims.forEach(claim => {
        const size = claim.split(':')[1].trim().split('x');
        const coordiantes = claim.split('@')[1].split(':')[0].trim().split(',');
        const id = claim.split('@')[0].trim();
        const sizeX = Number(size[0]);
        const sizeY = Number(size[1]);
        const cordX = Number(coordiantes[0]);
        const cordY = Number(coordiantes[1]);
        claimsObjArray.push({ cord: { cordX, cordY }, size: { sizeX, sizeY }, id });
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
                const currentSizeYNumber = sizeYIndex + cordY;
                matrix[currentSizeXNumber][currentSizeYNumber]++;
            }
        }
    }
    for (let claimObj of claimsObjArray) {
        let unique = true;
        const { cordX, cordY } = claimObj.cord;
        const { sizeX, sizeY } = claimObj.size;
        const { id } = claimObj; 
        for (let sizeXIndex = 0; sizeXIndex < sizeX; sizeXIndex++) {
            const currentSizeXNumber = sizeXIndex + cordX;
            for (let sizeYIndex = 0; sizeYIndex < sizeY; sizeYIndex++) {
                const currentSizeYNumber = sizeYIndex + cordY;
                if(matrix[currentSizeXNumber][currentSizeYNumber] !== 1) {
                    unique = false;
                }
            }
        }
        if(unique) {
            return id;
        }
    }
};

const getDuplicateClaims = () => {

    const claimsObjArray = claimsToObjectArray(claimsArray);
    const uniqueId = claimsObjArrayLoop(claimsObjArray);

    return uniqueId;
}

console.log('UniqueId:', getDuplicateClaims());