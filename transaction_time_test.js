function waitForBlocks(){
    if(eth.getTransaction(transactions[transactions.length-1].trans).blockNumber != null){
        blocks = []

        time_sum = 0
        for(var j = 0; j<transactions.length; j++) {
            blockNumber = eth.getTransaction(transactions[j].trans).blockNumber
            block = eth.getBlock(blockNumber)
            block.blockNumber = blockNumber
            if(blocks.length == 0 || blocks[blocks.length-1].blockNumber != blockNumber) {
                blocks.push(block)
            }

            block_mined_time = block.timestamp
            start_time = transactions[j].timestamp/1000

            time_sum += block_mined_time - start_time
        }

        average_transaction_mine_time = time_sum / transactions.length
        console.log("Average transaction mine time: ", average_transaction_mine_time)
        for(var z = 0; z<blocks.length; z++) {
            // Number of transactions in block
            console.log("Block Number: ", blocks[z].blockNumber)
            console.log("Number of transactions: ", blocks[z].transactions.length)
            console.log("Gas used ", blocks[z].gasUsed)
            console.log("Block size (bytes): ", blocks[z].size)
            console.log("Total Difficulty: ", blocks[z].totalDifficulty)
            console.log("\n")
        }

        miner.stop()
    }
    else{
        setTimeout(waitForBlocks, 250);
    }
}

transactions = []

amt = 0
while(amt < 100000) {
    for(var i = 1; i<eth.accounts.length; i++) {
        amt += 50;
        trans = eth.sendTransaction({from: eth.coinbase, to: eth.accounts[i], value: web3.toWei(50.00, "ether")})
        
        transactions.push({trans: trans, timestamp: Date.now()});
    }
}

miner.start()

waitForBlocks()

