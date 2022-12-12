const config = require("../hardhat.config.js");
const abi = require("../abi.json")
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
  console.log("conectando ao contrato")
  const odoyaSC = new ethers.Contract("0x19C5EA918Bc7A6DA8E58d1359819F89B5ecae7b1", abi, walletSigner);
  console.log("conectado ao contrato")
  console.log("enviando addRegenAction")
  let dataFutura = new Date()
  dataFutura = dataFutura.setSeconds(dataFutura.getSeconds() + 300);
  console.log("data futura", dataFutura)
  const txReceipt = await odoyaSC.addRegenAction(walletAddress, "Teste de Limpeza Praia Boqueirão", "-23.5489,-46.6388", dataFutura, ethers.BigNumber.from("10"));
  console.log("addRegenAction enviado")
  const txReceiptWait = await txReceipt.wait()
  console.log("addRegenAction processado")
  console.log("recibo", txReceiptWait)
  if (txReceiptWait.status === 1) {
    console.info(`Tx OK: ${txReceiptWait.transactionHash}`)	
  } else {
    console.error("Deu ruim")
    return
  }
  const novoActionID = await odoyaSC.regenActionCounter();
  let action = await odoyaSC.regenActionPlanned(novoActionID);
  console.log("action:", action);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});