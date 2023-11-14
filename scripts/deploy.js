async function main() {
  const Voting = await ethers.getContractFactory("Voting");
  const Tournament=await ethers.getContractFactory("Tournament");

  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy(["Rohit Sharma", "Virat Kohli", "KL Rahul", "Bumrah"], Date.now(), 3);
  console.log("Voting Contract address:", Voting_.address);

  const Tournament_ = await Tournament.deploy(["Shami", "Rohit Sharma", "Jadeja", "Gill"], Date.now(), 3);
  console.log("Tournament Contract address:", Tournament_.address);

  saveFrontendFiles(Voting_,"Voting");
  saveFrontendFiles(Tournament_,"Tournament");

  




}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });