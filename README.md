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
npx hardhat verify 0xB38d1142c8ee3f3C37140C8A4A1D3eE1bFA2E277 --contract contracts/OdoyaRecompensa.sol:OdoyaRecompensa --network alfajores
npx hardhat verify 0x788105c0b441c1c212d76f9ed3fcaf311cd7e9e1 --contract contracts/OdoyaNFT.sol:OdoyaNFT --network alfajores "Viva a Ponta do Seixas" "ODOYA"
```

## Dependencias

```shell
yarn add @openzeppelin/contracts
yarn add --dev hardhat-celo dotenv @openzeppelin/hardhat-upgrades
```
