#!/bin/bash

for(( i=0; i<100; i++ )); 
do
	node src/proxyTest/testSendTx.js &  > ./log/$i.txt 2>&1
done
