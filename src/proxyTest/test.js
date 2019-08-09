
/**
 * .env 설정파일을 참고해 web3를 초기화 한 후, export 한다.
 */

require('dotenv').config();

const Web3 = require('web3');

let rpcEndpointURL = '';
let user_address = '';
let user_pk = '';
let proxy_ledger = '';
let logic_ledger = '';
let registed_user_address = '';
let gas_price;
console.log(process.env.KALEIDO);
if(process.env.QUORUM.toString() == 'true'){
    gas_price = 0;
}else {
    gas_price = 0x11;
}


if(process.env.KALEIDO.toString() == 'true'){
    rpcEndpointURL = `https://${process.env.KALEIDO_RPC_ENDPOINT}`;
    registed_user_address = `${process.env.KALEIDO_NODE1_ACCOUNT}`;
    user_address = `${process.env.EXTERNAL_ACCOUNT}`;
    user_pk = Buffer.from(`${process.env.EXTERNAL_ACCOUNT_PK}`, 'hex');
    proxy_ledger = `${process.env.KALEIDO_PROXY_LEDGER}`;
    logic_ledger = `${process.env.KALEIDO_LOGIC_LEDGER}`;
} else if(process.env.GANACHE.toString() == 'true'){
    rpcEndpointURL = `http://${process.env.GANACHE_RPC_ENDPINT}`;
    user_address = `${process.env.GANACHE_ACCOUNT}`;
    user_pk = Buffer.from(`${process.env.GANACHE_ACCOUNT_PK}`, 'hex');
    registed_user_address = user_address;
    proxy_ledger = `${process.env.GANACHE_PROXY_LEDGER}`;
    logic_ledger = `${process.env.GANACHE_LOGIC_LEDGER}`;
} else {
    rpcEndpointURL = `null`;
    user_address = `null`;
    user_pk = `null`;
    proxy_ledger = `null`;
    logic_ledger = `null`;
}

console.log(`Check rpcEndpointURL : ${rpcEndpointURL} `);

let provider = new Web3.providers.HttpProvider(rpcEndpointURL);
let web3 = new Web3(provider);


var initConfig = {
    web3 : web3,
    user_address : user_address,
    user_pk : user_pk,
    proxy_ledger : proxy_ledger,
    logic_leger : logic_ledger,
    registed_user_address : registed_user_address,
    gas_price : gas_price
};


const LogicHelloWorldJSON = require('../../build/contracts/Logic.json');
const web3 = initConfig.web3;
const user_address = initConfig.user_address;
const user_pk = initConfig.user_pk;
const logic_ledger = initConfig.logic_leger;
const proxy_ledger = initConfig.proxy_ledger;
const registed_user_address = initConfig.registed_user_address;
const gasPrice = initConfig.gas_price;

//1. ABI 는 Logic 컨트랙트 / 주소는 Proxy 컨트랙트
let ContractInstance = new web3.eth.Contract(LogicHelloWorldJSON.abi,proxy_ledger); 


ContractInstance.methods.getMessage().call(
    {
        from: registed_user_address,
        gas: '4520000',
        gasPrice: gasPrice
    }
)
.then((result) => {
    console.log(result);
});
