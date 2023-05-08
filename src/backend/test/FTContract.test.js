const { expect } = require("chai"); 

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("FTContract", function () {

  let FT;
  let ft;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let initialSupply = 10000;

  beforeEach(async function () {
    // Get the ContractFactories and Signers here.
    FT = await ethers.getContractFactory("FT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contracts
    ft = await FT.deploy(initialSupply);
  });
  describe("MyToken test", async () => {
    it("Shoud check that owner possesses all tokens", async () => {
        let totalSupply = await ft.totalSupply();
        const balance = await ft.balanceOf(owner.address);
        return expect(balance).to.equal(totalSupply);
    })
    
    it("Should transfer tokens from owner to another account", async () => {
        const totalSupply = await ft.totalSupply();
 
        const TS = fromWei(totalSupply)
        await ft.connect(addr1).buyToken({value: 1});

        let balance = await ft.balanceOf(owner.address);

        expect(fromWei(balance) * 1).to.equal(TS - 10);

        balance = await ft.balanceOf(addr1.address);

        return expect(fromWei(balance) * 1).to.equal(10);
    })
    it("Should transfer tokens from one account to another", async () => {
        const totalSupply = await ft.totalSupply();
 
        const TS = fromWei(totalSupply)
        await ft.connect(addr1).buyToken({value: 1});

        let balance = await ft.balanceOf(owner.address);

        expect(fromWei(balance) * 1).to.equal(TS - 10);

        balance = await ft.balanceOf(addr1.address);

        expect(fromWei(balance) * 1).to.equal(10);

        await ft.connect(addr1).transferToken(5, addr2.address);

        balance = await ft.balanceOf(addr1.address);

        expect(fromWei(balance) * 1).to.equal(5);

        balance = await ft.balanceOf(addr2.address);

        expect(fromWei(balance) * 1).to.equal(5);
    })
    it("Should reject overspending", async () => {
        const totalSupply = await ft.balanceOf(owner.address);

        expect(ft.transfer(addr1.address, totalSupply + 1)).to.be.reverted;
        // expect(totalSupply).to.be.a.bignumber;
        return expect(await ft.balanceOf(owner.address)).to.equal(totalSupply);
    })
}) 
})
