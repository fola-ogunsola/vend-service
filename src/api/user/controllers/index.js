// controllers

import enums from '../../../lib/enums'
import Response from '../../../lib/http/lib.http.responses'
import {generateXML} from './xml.buider'
/**
 * Save user details and send verification code
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response with the users verification details
 * @memberof Controller
 */


const url = 'https://197.210.2.223:443/axis2/services/HostIFService'; 

const sampleHeaders = {
    Authorization: 'Basic dXNlcjMwNTA6clFHSjV0TmtTJERjOUM2cWo=',
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: 'urn:Vend'
  };
   
  const origMsisdn = '2347035233050';
  const minimumAmount = 50;
  let sequenceNo = 6120;

export const processVendingRequest = async(req, res, next) => {
    // try {
    //     let body = req.body;
    //     let tariffTypeId = body.tariff_type_id;
    //     let phoneNumber = body.phone_number;
    //     let amount = body.amount;
    //     let refNumber = body.ref_number;
    //     let type = body.type;
    //     let newSequence = sequenceNo + `${Math.random().toString(10).substr(2, 10)}`;
    //     let isSwap = type == 'swap' ? true : false;


    //     let tempData = {
    //         phone_number : phoneNumber,
    //         amount : amount,
    //         reference : refNumber,
    //         awake_reference : newSequence,
    //         network: 'mtn',
    //         is_swap : isSwap
    //       };
        
    //       saveTempTx(tempData);
    //       if(!body || !body.tariff_type_id || !body.phone_number || !body.amount) {
    //         logger.info(`${enums.CURRENT_TIME_STAMP}:::Info: Invalid Request Paramter processVendingRequest.controllers.index.js`)
    //         return Response.error(res, enums.INVALID_CREDENTIAL, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_UNIQUE_CREDENTIALS)
    //       }
    //       if(!tariffTypeId) {
    //         logger.info(`${enums.CURRENT_TIME_STAMP}:::Info: Invalid Tariff Type ID processVendingRequest.controllers.index.js`)
    //         return Response.error(res, enums.INVALID_TARIFF_ID, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_UNIQUE_CREDENTIALS)
    //       }
    //       if(amount < minimumAmount) {
    //         logger.info(`${enums.CURRENT_TIME_STAMP}:::Info: Invalid Tariff Type ID processVendingRequest.controllers.index.js`)
    //         return Response.error(res, enums.INVALID_AMOUNT, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_UNIQUE_CREDENTIALS)
    //       }

    // } 
    // catch (error) {
    //     error.label = enums.VALIDATE_UNIQUE_REFERENCE_ID;
    //     logger.error(`Duplicate transaction:::${enums.VALIDATE_UNIQUE_REFERENCE_ID}`, error.message);
    //     return next(error);
    //   }

 
        
}