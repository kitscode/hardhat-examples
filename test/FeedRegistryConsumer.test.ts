import {setup} from './utils';
import {BTC, ETH} from "../helpers/constants";


describe('FeedRegistryConsumer', () => {

    it("check eth price & feed", async () => {
        const {owner} = await setup();

        const price = await owner.FeedRegistryConsumer.getEthUsdPrice();
        console.log("eth price:", price.toString());

        const feed = await owner.FeedRegistryConsumer.getEthFeed();
        console.log("eth feed:", feed);
    });

    it("check BTC/ETH", async () => {
        const {owner} = await setup();

        const price = await owner.FeedRegistryConsumer.getPrice(BTC, ETH);
        console.log("BTC/ETH:", price.toString());

        // not found
        // const price2 = await owner.FeedRegistryConsumer.getPrice(ETH, BTC);
        // console.log("ETH/BTC:", price2.toString());
    });
});

