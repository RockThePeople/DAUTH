require('dotenv').config();
const { Web3 } = require('web3');
const { abi } = require('./DidStorage.json');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.SEPOLIA_URL));

const contractAddress = process.env.CONTRACT_ADDRESS;
const accountAddress = process.env.ACCOUNT_ADDRESS;
const contract = new web3.eth.Contract(abi, contractAddress);
const privateKey = process.env.PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

async function storeHexData(hexData) {
    const tx = contract.methods.storeHexData(hexData);
    const gas = await tx.estimateGas({ from: accountAddress });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(accountAddress,'pending');

    console.log(data);

    const signedTx = await account.signTransaction({
        to: contract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 11155111
    }, privateKey);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transaction receipt:', receipt);
}

async function retrieveUserHexData() {
    const hexDataCount = await contract.methods.getHexDataCount(accountAddress).call();
    const hexDataArray = [];
    for (let i = 0; i < hexDataCount; i++) {
      const hexData = await contract.methods.retrieveHexData(accountAddress, i).call();
      hexDataArray.push(hexData);
    }
    console.log(hexDataArray);
    return hexDataArray;
  }
async function main() {
    // const hexDataToStore = 'Initial Vaule. String.';
    // await storeHexData(hexDataToStore);
    await retrieveUserHexData();
}

main().catch((error) => {
    console.error('Error:', error);
});
