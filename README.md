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
npx hardhat verify 0x19C5EA918Bc7A6DA8E58d1359819F89B5ecae7b1 --contract contracts/OdoyaRecompensa.sol:OdoyaRecompensa --network alfajores
npx hardhat verify 0x8d053ec0ace47a899a33df651a7c343ab4861536 --contract contracts/OdoyaNFT.sol:OdoyaNFT --network alfajores "Viva a Ponta do Seixas" "ODOYA"
```

## Dependencias

```shell
yarn add @openzeppelin/contracts
yarn add --dev hardhat-celo dotenv @openzeppelin/hardhat-upgrades
```
