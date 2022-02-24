"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJs = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, data, timestamp) => CryptoJs.SHA256(index + previousHash + timestamp + data).toString();
// validation static
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.index === "number";
console.log(Block.calculateBlockHash);
const genesisBlock = new Block(0, "hash", "previousHash", "data", Date.now());
//이 부분은 블록만 받아들이게끔 설계
// blockchain is array
// now, genesisBlock array
let blockchain = [genesisBlock];
console.log("0 index of Block Array");
console.log(blockchain);
// getBlockchain const is total Block array
const getBlockchain = () => blockchain;
// getLatestBlock const is Block array's last value
const getLatestBlock = () => blockchain[getBlockchain().length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
// new Block create Function
// parameter is data(It is string type)
// return value is Block
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const nextTimestamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, nextTimestamp);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp);
// Block validation function
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index !== candidateBlock.index - 1) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.hash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    return true;
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("111");
createNewBlock("222");
createNewBlock("333");
console.log(blockchain);
//# sourceMappingURL=index.js.map