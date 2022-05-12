require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/498c96e021b34ad6918af9157368419e",
      accounts: [`54fc9cd052ef6dffc55cd5b87299d92e9b7e21a90cf0db98667a85c7eb610cba`]
    },
    // polygon: {
    //   url: "https://polygon-rpc.com/",
    //   accounts: [process.env.pk]
    // }
  }
};