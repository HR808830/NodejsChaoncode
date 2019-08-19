const config = require('../config')
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();
let bizNetDefination = bizNetConnection.connect(config.networkAdminCard);

async function createChaincode(data) {
  try{
    let chaincode= {
      idSens:data._id.toString(),
      type:data.type.toString(),
      idEVent:data.idEVent,
      buffer:data.buffer,
      criticality:data.criticality,
      payload:data.payload,
      date:new Date()
    };

    let assetType='IOTAsset';
    let factory = bizNetConnection.getBusinessNetwork().getFactory();
    let assetRegistry = await bizNetConnection.getAssetRegistry(`${config.ns}.${assetType}`);
    let newTrack = factory.newResource(config.ns, assetType, chaincode.idSens);
    newTrack = Object.assign(newTrack, chaincode);
    let res = await assetRegistry.add(newTrack);
    return {sucess:true,data:res};
  } catch(err){
    console.log("err.message-------------------",err.message );
    errMessage = typeof err == 'string' ? err : err.message;
    return {sucess:false,message: errMessage};
  }
}


module.exports = {
  createChaincode
}