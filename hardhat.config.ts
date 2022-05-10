import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.9", settings: {} }],
  },
};
export default config;
