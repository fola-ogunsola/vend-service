// middlewares
import { Router } from 'express';
// import dayjs from 'dayjs';
import enums from '../../../lib/enums';
import Response from '../../../lib/http/lib.http.responses'
import * as Hash from '../../../lib/utils/lib.utils.hash';
import { processOneOrNoneData, processAnyData } from '../services/index'
import query from '../queries/index';
import { createHash } from "crypto";


/**
 * Validate auth token
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response with the validated user's details
 * @memberof UserAuthMiddleware
 */

export const checkSecurityCode = async(req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(token)
        if(!token){
            logger.info(`${enums.CURRENT_TIME_STAMP}, Info: successfully decoded that no authentication token was sent with the headers checkSecurityCode.middleware.auth.js`)
            return Response.error(res, enums.NO_TOKEN, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE)
        }
        if (!token.startsWith('Bearer ')) {
            return Response.error(res, enums.INVALID_TOKEN, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE);
          }
         if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
          }
          logger.info(`${enums.CURRENT_TIME_STAMP}, Info: successfully extracts token checkSecurityCode.middleware.auth.js`);
        //   const decoded = Hash.decodeToken(token)
        //   logger.info(`${enums.CURRENT_TIME_STAMP}, ${decoded.merchant_id}:::Info: successfully decoded authentication token sent using the authentication secret
        //   checkSecurityCode.middleware.auth.js`);
        // if(decoded.message){
        //     if(decoded.message === 'jwt expired') {
        //         return Response.error(res, enums.SESSION_EXPIRED, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE);
        //     }
        //     logger.info(`${enums.CURRENT_TIME_STAMP}, ${decoded.merchant_id}:::Info: successfully decoded authentication token has a message which is an 
        //     error message checkSecurityCode.middleware.auth.js`);
        //     return Response.error(res, decoded.message, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE);

        // }

        const tokenhash = createHash("sha512").update(token).digest("hex");


        const [ merchant ] = await processAnyData(query.getMerchantId, [tokenhash])
        logger.info(`${enums.CURRENT_TIME_STAMP}, ::Info: successfully fetched the merchant details using the decoded id 
        checkSecurityCode.middleware.auth.js`);
        if (!merchant) {
          logger.info(`${enums.CURRENT_TIME_STAMP}, Info: successfully decoded that the user with the decoded id does not exist in the DB 
          validateAuthToken.middlewares.auth.js`);
          return Response.error(res, enums.INVALID_TOKEN, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE);
        }
        req.userId = merchant.id;
        return next();
    }
    catch (error) {
        error.label = enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE;
        logger.error(`validating authentication token failed:::${enums.VALIDATE_AUTH_TOKEN_MIDDLEWARE}`, error.message);
        return next(error);
      }
}



export const checkUniqueRefNum = async(req, res, next) => {
  try {
    const {ref_number} = req.body;
    const data = await processOneOrNoneData(query.getRefNum, [ref_number, req.userId]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: successfully checked the merchant details 
    checkUniqueRefNum.middleware.auth.js`);
    if (data) {
        logger.info(`${enums.CURRENT_TIME_STAMP}, Info: There is duplicate transaction  in the DB 
        checkUniqueRefNum.middlewares.auth.js`);
        return Response.error(res, enums.DUPLICATE, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_UNIQUE_REFERENCE_ID);

      }
      return next();
  }
  catch (error) {
    error.label = enums.VALIDATE_UNIQUE_REFERENCE_ID;
    logger.error(`Duplicate transaction:::${enums.VALIDATE_UNIQUE_REFERENCE_ID}`, error.message);
    return next(error);
  }
}



export const compareAccessKey = async(req, res, next) => {
  try{
    const { authorization } = req.headers
    console.log(req.headers)
    const [ merchantAccessKeyDetail ] = await processAnyData(query.fetchMerchantAccessKey, [authorization]);
    const accessKeyValid = await Hash.compareData(authorization, merchantAccessKeyDetail.access_key)
    logger.info(`${enums.CURRENT_TIME_STAMP},:::Info: successfully returned compared merchant_accecc_key response compareAccessKey.middlewares.auth.js`);
    if(accessKeyValid){
      logger.info(`${enums.CURRENT_TIME_STAMP},:::Info: merchant access key matches compareAccessKey.middlewares.auth.js`);
      return next();
    }
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${user.user_id}:::Info: merchant access key does not match compareAccessKey.middlewares.auth.js`);
    return Response.error(res, enums.INVALID_ACCESS_KEY_CREDENTIALS, enums.HTTP_BAD_REQUEST, enums.COMPARE_ACCECC_KEY_MIDDLEWARE);
  }
  catch (error) {
    error.label = enums.COMPARE_ACCECC_KEY_MIDDLEWARE;
    logger.error(`comparing incoming and already set access key in the DB failed:::${enums.COMPARE_ACCECC_KEY_MIDDLEWARE}`, error.message);
    return next(error);
  }
}


export const validateVendRequest = async(req, res, next) => {
  try {
    let body = req.body;
        let tariffTypeId = body.tariff_type_id;
        let phoneNumber = body.phone_number;
        let amount = body.amount;
        let refNumber = body.ref_number;
        let type = body.type;
        let newSequence = sequenceNo + `${Math.random().toString(10).substr(2, 10)}`;
        let isSwap = type == 'swap' ? true : false;
        const minimumAmount = 50;


        let tempData = {
            phone_number : phoneNumber,
            amount : amount,
            reference : refNumber,
            awake_reference : newSequence,
            network: 'mtn',
            is_swap : isSwap
          };
        
          saveTempTx(tempData);
          if(!body || !body.tariff_type_id || !body.phone_number || !body.amount) {
            logger.info(`${enums.CURRENT_TIME_STAMP}:::Info: Invalid Request Paramter processVendingRequest.controllers.index.js`)
            return Response.error(res, enums.INVALID_CREDENTIAL, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_UNIQUE_CREDENTIALS)
          }
          if(!tariffTypeId) {
            logger.info(`${enums.CURRENT_TIME_STAMP}:::Info: Invalid Tariff Type ID processVendingRequest.controllers.index.js`)
            return Response.error(res, enums.INVALID_TARIFF_ID, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_UNIQUE_CREDENTIALS)
          }
          if(amount < minimumAmount) {
            logger.info(`${enums.CURRENT_TIME_STAMP}:::Info: Invalid Amount processVendingRequest.controllers.index.js`)
            return Response.error(res, enums.INVALID_AMOUNT, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_UNIQUE_CREDENTIALS)
          }

    } 
    catch (error) {
        error.label = enums.VALIDATE_UNIQUE_REFERENCE_ID;
        logger.error(`Failed transaction:::${enums.VALIDATE_UNIQUE_REFERENCE_ID}`, error.message);
        return next(error);
      }
}
