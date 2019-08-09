const initConfig = require('../initConfig') ;
const LogicHelloWorldJSON = require('../../build/contracts/ConsentStateContract.json');
const web3 = initConfig.web3;
const user_address = initConfig.user_address;
const user_pk = initConfig.user_pk;
const logic_ledger = initConfig.logic_leger;
const proxy_ledger = initConfig.proxy_ledger;
const registed_user_address = initConfig.registed_user_address;
const gasPrice = initConfig.gas_price;

//1. ABI 는 Logic 컨트랙트 / 주소는 Proxy 컨트랙트
let ContractInstance = new web3.eth.Contract(LogicHelloWorldJSON.abi,proxy_ledger); 


let testTxId = '2';
let testHash = 'b'; 
// console.log(ContractInstance);
ContractInstance.methods.setConsentState(testTxId, testHash ).send({
    from: registed_user_address,
    gas: '452000000',
    gasPrice: gasPrice
})
.on('receipt', (receipt) => {
  console.log(receipt);
}).on('error', (error => {
    console.log(error);
}));