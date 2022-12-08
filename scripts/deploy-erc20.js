const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", (await deployer.getBalance()).toString());

  if (balance < 100000000000) {
    console.log("pop up the account");
    return;
  }
  const Token = await ethers.getContractFactory("contracts/OdoyaRecompensa.sol:OdoyaRecompensa");
  const token = await Token.deploy();
  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});