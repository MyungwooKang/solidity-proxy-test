const Tx = require('ethereumjs-tx');
const initConfig = require('../initConfig');
const LogicHelloWorldJSON = require('../../build/contracts/Logic.json');
const web3 = initConfig.web3;
const user_address = initConfig.user_address;
const user_pk = initConfig.user_pk;
const logic_ledger = initConfig.logic_leger;
const proxy_ledger = initConfig.proxy_ledger;
const registed_user_address = initConfig.registed_user_address;
const gasPrice = initConfig.gas_price;


const LogicHelloWorldJSON = require('../../build/contracts/Logic.json');
var bytecode = LogicHelloWorldJSON.bytecode;
web3.eth.getTransactionCount(user_address).then(function (nonce) {
    console.log("set rtx");
    let rtx = {
      nonce: nonce,
      gasPrice: 20000000000,
      gasLimit: 6721975,
      value: 0x0,
      data: bytecode
    };
    // console.log(rtx);

    try {

      let tx = new Tx(rtx);

      tx.sign(user_pk);

      let serializedTx = tx.serialize();

      let serialized_signed_tx = '0x' + serializedTx.toString('hex');
      console.log(serialized_signed_tx);

       web3.eth.sendSignedTransaction(serialized_signed_tx)
       .on('receipt',function(receipt){
            console.log("success!");
            console.log(receipt);
        })
        .on('error', function(err,receipt){
          console.log(err);
          console.log(receipt);
        });

    } catch (err) {
      console.log("signTransaction test log - error");
      console.log(err);
      // console.log(err);
      // // res.status(500).send(err);
      // throw err;
    }
  });
