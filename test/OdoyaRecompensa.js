const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("OdoyaRecompensa", function () {
  async function deploy() {

    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const OdoyaRecompensa = await ethers.getContractFactory("OdoyaRecompensa");
    const odoyaToken = await OdoyaRecompensa.deploy();

    return { odoyaToken, owner };
  }

  describe("Deployment", async function () {
    it("Should start with no tokens minted", async function () {
      const { odoyaToken } = await loadFixture(deploy);
      expect(await odoyaToken.totalSupply()).to.equal(0);
      
    });
    it("Should allow to give only 1000 tokens per action", async function () {
      const { odoyaToken } = await loadFixture(deploy);
      const expectedTotal = ethers.BigNumber.from("1000000000000000000000");
      expect(await odoyaToken.maxTokensPerAction()).to.equal(expectedTotal);
      //console.log("\nmax tokens", (await odoyaToken.maxTokensPerAction()), "\n");
    });
  });


  describe("AddActions", async function () {    
    it("Should register action", async function () {
      const { odoyaToken, owner } = await loadFixture(deploy);
      await odoyaToken.addRegenAction(owner.getAddress(), "Teste de Limpeza Praia Boqueirão", "-23.5489,-46.6388", 1870595359, ethers.BigNumber.from("10000"));
      expect(await odoyaToken.regenActionCounter()).to.equal(1);
    });

    it("Should mint a reward", async function () {
      const ONE_WEEK_IN_SECS = 7 * 24 * 60 * 60;
      const networkNow = (await time.latest()) + 1;
      const nextWeek = networkNow + ONE_WEEK_IN_SECS;
      const { odoyaToken, owner } = await loadFixture(deploy);
      await odoyaToken.addRegenAction(owner.getAddress(), "Teste de Limpeza Praia Boqueirão", "-23.5489,-46.6388", nextWeek, ethers.BigNumber.from("10000"));
      await time.increaseTo(nextWeek);
      await odoyaToken.mint("0x263C3Ab7E4832eDF623fBdD66ACee71c028Ff591", ethers.BigNumber.from("1000"), 1);
      const totalSupply = await odoyaToken.totalSupply();
      const expectedTotalSupply = ethers.BigNumber.from("1000");
      console.log("Should mint a reward", totalSupply, expectedTotalSupply);
      expect(totalSupply).to.equals(expectedTotalSupply);
    });
  });
});