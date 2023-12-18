const { ethers } = require("ethers");
const config = require("./config")

// Connect to the node
const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);

// Create a wallet
const wallet = new ethers.Wallet(config.privateKey.trim(), provider);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Convert to hexadecimal
const convertToHexa = (str = '') =>{
   const res = [];
   const { length: len } = str;
   for (let n = 0, l = len; n < l; n ++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      res.push(hex);
   };
   return `0x${res.join('')}`;
}

// Get the current account's nonce
async function getCurrentNonce(wallet) {
  try {
    const nonce = await wallet.getTransactionCount("pending");
    console.log("Nonce:", nonce);
    return nonce;
  } catch (error) {
    console.error("Error fetching nonce:", error.message);
    throw error;
  }
}

// Get the current mainnet gas price
async function getGasPrice() {
  const gasPrice = await provider.getGasPrice();
  return gasPrice;
}

// Get real-time gasLimit on the chain
async function getGasLimit(hexData, address) {
  const gasLimit = await provider.estimateGas({
    to: address,
    value: ethers.utils.parseEther("0"),
    data: hexData,
  });

  return gasLimit.toNumber();
}

// Transfer transaction
async function sendTransaction(nonce) {
  const hexData = convertToHexa(config.tokenJson.trim());
  // Get real-time gasPrice
  const currentGasPrice = await getGasPrice();
  // Increase by a certain multiple on the current gasPrice
  const gasMultiple = parseInt(String(config.increaseGas * 100))
  const increasedGasPrice = currentGasPrice.div(100).mul(gasMultiple);
  // Get the wallet address
  let address = await wallet.getAddress();
  if (config.receiveAddress !== "") {
    address = config.receiveAddress;
  }
  // Get the current gasLimit limit
  const gasLimit = await getGasLimit(hexData, address);
  // Payment amount
  const payPrice = config.payPrice

  const transaction = {
    to: address,
    // Replace with the amount you want to transfer
    value: ethers.utils.parseEther(payPrice),
    // Hexadecimal data
    data: hexData,
    // Set nonce
    nonce: nonce,
    // Set gas price
    gasPrice: increasedGasPrice,
    // Limit gasLimit, according to the current network transfer settings, if you don't know how much to set, check the block explorer to see how much others have successfully transferred
    gasLimit: gasLimit,
  };

  try {
    const tx = await wallet.sendTransaction(transaction);
    console.log(`Transaction with nonce ${nonce} hash:`, tx.hash);
  } catch (error) {
    console.error(`Error in transaction with nonce ${nonce}:`, error.message);
  }
}

// Send multiple transactions
async function sendTransactions() {
  const currentNonce = await getCurrentNonce(wallet);
  const sleepTime = config.sleepTime

  for (let i = 0; i < config.repeatCount; i++) {
    const gasPrice = await getGasPrice();
    await sendTransaction(currentNonce + i, gasPrice);
    await sleep(sleepTime)
  }
}

sendTransactions();
