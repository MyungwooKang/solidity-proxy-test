const Tx = require('ethereumjs-tx');
const initConfig = require('../initConfig');
const LogicHelloWorldJSON = require('../../build/contracts/Logic.json');
const web3 = initConfig.web3;
const user_address = initConfig.user_address;
var user_pk = initConfig.user_pk;
const logic_ledger = initConfig.logic_leger;
const proxy_ledger = initConfig.proxy_ledger;
const registed_user_address = initConfig.registed_user_address;
const gasPrice = initConfig.gas_price;

//1. ABI 는 Logic 컨트랙트 / 주소는 Proxy 컨트랙트
let ContractInstance = new web3.eth.Contract(LogicHelloWorldJSON.abi,proxy_ledger); 

let data = ContractInstance.methods.hit().encodeABI();

web3.eth.getTransactionCount(user_address).then(function (nonce) {
    console.log("set rtx");
    let rtx = {
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: '0x300000',
      to: proxy_ledger,
      value: "0x0",
      data: data
    };
    console.log(rtx);
  
    try {
      
      let tx = new Tx(rtx);
    
      tx.sign(user_pk);
      
      let serializedTx = tx.serialize();
      
      let serialized_signed_tx = '0x' + serializedTx.toString('hex');
      console.log(serialized_signed_tx);
      
       web3.eth.sendSignedTransaction(serialized_signed_tx).on('receipt',function(receipt){
            console.log("success!");
            console.log(receipt);
        });

    } catch (err) {
      console.log("signTransaction test log - error");
      console.log(err);
      // res.status(500).send(err);
      throw err;
    }
  });