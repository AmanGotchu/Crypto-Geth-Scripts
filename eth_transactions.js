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
    }
    else{
        setTimeout(waitForBlocks, 250);
    }
}

transactions = []

for(var i = 0; i<30; i++) {
    trans = eth.sendTransaction({from: '0xc55f5138d0726060199821863ce248def470e001', to: "0x299427c8fdb7546a84df7f492919d80e8ad5234e", value: web3.toWei(.001, "ether")})
    transactions.push({trans: trans, timestamp: Date.now()});
}

waitForBlocks()
