const hre = require("hardhat");
const fs = require('fs');

// async function main() {
//   /* these two lines deploy the contract to the network */
//   const Blog = await hre.ethers.getContractFactory("Blog");
//   const blog = await Blog.deploy("My blog");

//   await blog.deployed();
//   console.log("Blog deployed to:", blog.address);
  

  
//   /* this code writes the contract addresses to a local */
//   /* file named config.js that we can use in the app */
//   fs.writeFileSync('./config.js', `
//   export const contractAddress = "${blog.address}"
//   export const ownerAddress = "${blog.signer.address}"
//   `)
// }

async function main() {
    /* these two lines deploy the contract to the network */
    const Bangdaihoc = await hre.ethers.getContractFactory("BangDaiHoc");
    const bangdaihoc = await Bangdaihoc.deploy();
  
    const test = await bangdaihoc.deployed();
    console.log("Quanlysinhvien deployed to:", bangdaihoc.address);
    
  
    
    /* this code writes the contract addresses to a local */
    /* file named config.js that we can use in the app */
    fs.writeFileSync('./config.js', `
    export const contractAddress = "${bangdaihoc.address}"
    export const ownerAddress = "${bangdaihoc.signer.address}"
    `)
  }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });