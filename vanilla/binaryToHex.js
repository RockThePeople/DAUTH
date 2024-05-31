const fs = require('fs');
const crypto = require('crypto');

const binaryData = fs.readFileSync('data0.json', 'utf-8');
const hexData = BigInt(`0b${binaryData}`).toString(16);

async function convertToHash() {
    const hash = crypto.createHash('sha256',).update(hexData, 'hex').digest('hex');
    console.log(hash);

    const binaryRecover = BigInt(`0x${hash}`).toString('2');
    if (binaryData === binaryRecover); {
        console.log("Recovered Perfectly");
    }
}

convertToHash();

// 할거
// 일단
// private - public key로 암호화해서 보관하기.