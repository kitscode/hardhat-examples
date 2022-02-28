import {getDefaultProvider} from "ethers";
import {getChainId, network} from "hardhat";

describe('Forking', () => {

    return;
    
    const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const main = "0x00345EF3d49c570eF89d67666ef3380cC5DF843d";

    it("check chain 1", async () => {

        const chainId = await getChainId();
        console.log("chainId:", chainId);

        const provider = getDefaultProvider();
        let network = await provider.getNetwork();
        console.log("chainId 1:", network.chainId);

        const balance = await provider.getBalance(main);
        console.log("balance mainnet:", balance.toString());

        const balance_owner = await provider.getBalance(owner);
        console.log("balance owner:", balance_owner.toString());
    });

    it("check chain 31337", async () => {

        const balance_owner = await network.provider.send("eth_getBalance", [owner]);
        console.log("balance local:", balance_owner.toString());

        const balance_main = await network.provider.send("eth_getBalance", [main]);
        console.log("balance main:", balance_main.toString());
    });

});

