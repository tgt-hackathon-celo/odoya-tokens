const config = require("../hardhat.config.js");
const hre = require("hardhat");

async function main() {
  const accounts = config.networks.alfajores.accounts;
  const provider = ethers.getDefaultProvider(config.networks.alfajores.url)
  const index = 0; // first wallet, increment for next wallets
  const wallet = ethers.Wallet.fromMnemonic(accounts.mnemonic, accounts.path + `/${index}`);
  const privateKey = wallet.privateKey;
  const walletAddress = wallet.address;
  const walletSigner = wallet.connect(provider);
  const balance = (await walletSigner.getBalance()).toString();
  console.log("Account pvt key:", privateKey);
  console.log("Account address:", walletAddress);
  console.log("Account balance:", balance);

  if (balance < 100000000000) {
    console.log("pop up the account");
    return;
  }
  // const Token = await ethers.getContractFactory("contracts/OdoyaRecompensa.sol:OdoyaRecompensa");
  // const token = await Token.deploy();
  // console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});