# Voting Application 

This is a Application to implement voting system for commentators to  . 


## Installation

After you cloned the repository, you want to install the packages using

```shell
npm install
```

You first need to compile the contract and upload it to the blockchain network. Run the following commands to compile and upload the contract.

```shell
npx hardhat compile
npx hardhat --network mumbai  run .\scripts\deploy.js
```

Once the contract is uploaded to the blockchain, simply run command 

```shell
npm start
```
