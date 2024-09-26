require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "sepolia", 
   networks: {    
    hardhat: {},   
    sepolia: {     
      url: "https://arbitrum-sepolia.infura.io/v3/2IRMhcZ2y1alB4jrvNJ71i0CibJ",      
      accounts: [`0x${'70997970C51812dc3A010C7d01b50e0d17dc79C8'}`],   
    }
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
