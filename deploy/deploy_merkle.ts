import {DeployFunction} from 'hardhat-deploy/types';
import {WHITELIST} from "../helpers/constants";

const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {

    const {deploy, execute} = deployments;
    const {owner} = await getNamedAccounts();


    let leafNodes = WHITELIST.map(address => keccak256(address));
    let tree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
    const root = tree.getRoot();

    console.log('Tree: \n', tree.toString());
    console.log('Root hash is: ', root.toString('hex'));

    await deploy('Merkle', {
        from: owner,
        args: [],
        log: true,
    });

    await execute("Merkle", {from: owner}, "setSaleMerkleRoot", root);
};
export default func;
func.tags = ['Merkle'];
