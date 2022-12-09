# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
//npx hardhat node
npx hardhat run scripts/deploy-nft.js --network alfajores
npx hardhat run scripts/deploy-erc20.js --network alfajores
npx hardhat verify 0x58BE0c4b2CB3CC5AD27A3D7560b453042B271C88 --contract contracts/OdoyaRecompensa.sol:OdoyaRecompensa --network alfajores
```

## Dependencias

```shell
yarn add @openzeppelin/contracts
yarn add --dev hardhat-celo dotenv @openzeppelin/hardhat-upgrades
```
