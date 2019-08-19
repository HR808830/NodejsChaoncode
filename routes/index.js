const express = require('express');
const router = express.Router();
const {blockChainService} = require('../blockchain');

// routes
router.post('/createchaincode', async (req, res, next) => {
    
    let createChain = await blockChainService.createChaincode(req.body);
    createChain.sucess ? res.json({
                            "code": 201,
                            "message": 'chaincode create Successfully'
                        }) :
                        res.json({
                            "code": 200,
                            "message": 'not create chaincode'
                        })
});
module.exports = router;
