# EVM-Compatible Inscription Automation Mint Script

## 🛠 Usage Instructions

### Step 1: Install Node.js

Begin by downloading and installing the version of Node.js corresponding to your computer's operating system from the [Node.js official website](https://nodejs.org/en).

```bash
https://nodejs.org/en
```

Next, check the installed versions to ensure a successful installation.

```bash
node -v
npm -v
```

If you prefer using Yarn, install Yarn as well.
```bash
npm i -g yarn
```

### Step 2: Download the Script Source Code
Clone the source code to your local machine using git.
```bash
git clone https://github.com/sfter/evm-inscription-mint.git

cd evm-inscription-mint
```
If you are using a Windows computer and do not have git installed, download and install git software from the following website.

```bash
https://gitforwindows.org
```

### Step 3: Rename the config.js.example File in the Current Directory to config.js
```bash
cp config.js.example config.js
```

### Step 4: Modify the config.js Configuration File in the Current Directory
```javascript
const config = {
    // Set how many cards you want to mint here; it is recommended not to exceed 50 at a time, as exceeding this limit may result in failure to be included in the blockchain.
    repeatCount: 1,

    // Increase by how many times on the current gas basis.
    increaseGas: 1.2,

    // Your wallet's private key.
    privateKey: "",

    // Inscription JSON data (replace with the JSON-formatted data of the inscription you want to mint).
    tokenJson: 'data:,{"p":"fair-20","op":"mint","tick":"fair","amt":"1000"}',

    // RPC node (compatible with EVM chains); use the node address of the chain you want to interact with.
    // eth => https://mainnet.infura.io/v3
    // arb => https://arb1.arbitrum.io/rpc
    // polygon => https://polygon-rpc.com
    // op => https://mainnet.optimism.io
    // linea => https://mainnet.infura.io/v3
    // scroll => https://rpc.scroll.io
    // zks => https://mainnet.era.zksync.io
    rpcUrl: "https://arb1.arbitrum.io/rpc"
}
```

### Step 5: Install Dependencies
```bash
npm i
```
or
```bash
yarn install
```

### Step 6: Run the Mint Script Program
```shell
node index.js
```
or
```shell
yarn start
```
or
```shell
npm run start
```
