const MUMBAI_URL = "twfpFtEzGqcnHRmwA6UrTzXPobOFJp6N";
/** @type import('hardhat/config').HardhatUserConfig */
const MUMBAI_PRIVATE_KEY = "29d29aaaf8cdf4604198701a628d7eb8b7101887a58c963a4a760c2c157ba16d";

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.20",
   networks: {
      hardhat: {},
      mumbai: {
         url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_URL}`,
         accounts: [MUMBAI_PRIVATE_KEY]
       }
   },
}