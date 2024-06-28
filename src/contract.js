import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractABI = [
    // Replace this array with your contract's ABI
];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

export default contractInstance;
