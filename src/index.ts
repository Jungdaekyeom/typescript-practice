import * as CryptoJs from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string =>
    CryptoJs.SHA256(index + previousHash + timestamp + data).toString();

  // validation static
  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.index === "number";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

console.log(Block.calculateBlockHash);

const genesisBlock: Block = new Block(
  0,
  "hash",
  "previousHash",
  "data",
  Date.now()
);

//이 부분은 블록만 받아들이게끔 설계
// blockchain is array
// now, genesisBlock array
let blockchain: Block[] = [genesisBlock];

console.log("0 index of Block Array");
console.log(blockchain);

// getBlockchain const is total Block array
const getBlockchain = (): Block[] => blockchain;

// getLatestBlock const is Block array's last value
const getLatestBlock = (): Block => blockchain[getBlockchain().length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

// new Block create Function
// parameter is data(It is string type)
// return value is Block
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const nextTimestamp: number = getNewTimeStamp();
  const nextHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    nextTimestamp
  );
  const newBlock: Block = new Block(
    newIndex,
    nextHash,
    previousBlock.hash,
    data,
    nextTimestamp
  );

  addBlock(newBlock);

  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.data,
    aBlock.timestamp
  );

// Block validation function
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index !== candidateBlock.index - 1) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.hash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  }
  return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("111");
createNewBlock("222");
createNewBlock("333");

console.log(blockchain);

export {};