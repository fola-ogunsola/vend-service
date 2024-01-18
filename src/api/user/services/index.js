// services
import query from '../queries/index'
import {db} from '../../../config/db'
// import config from '../../config'


/**
 * Process db.any calls to the database
 * @param {String} query - The request from the endpoint.
 * @param {Array} payload - The response returned by the method.
 * @returns { Promise<JSON> } - A Promise response with the queried data or no data
 * @memberof UserPostgresDbService
 */
export const processAnyData = (query, payload) =>  db.any(query, payload);

/**
 * Process db.oneOrNone calls to the database
 * @param {String} query - The request from the endpoint.
 * @param {Array} payload - The response returned by the method.
 * @returns { Promise<JSON> } - A Promise response with the queried data or no data
 * @memberof UserPostgresDbService
 */
export const processOneOrNoneData = (query, payload) => db.oneOrNone(query, payload);

/**
 * Process db.none calls to the database
 * @param {String} query - The request from the endpoint.
 * @param {Array} payload - The response returned by the method.
 * @returns { Promise<JSON> } - no queried value
 * @memberof UserPostgresDbService
 */
export const processNoneData = (query, payload) => db.none(query, payload);





export const saveTx = async(data) => {
    const {
        merchantId,
        status,
        phone_number,
        amount,
        reference,
        awake_reference,
        telco_reference,
        network
      } = data;
      return processNoneData(query.saveTx, [
        merchantId,
        status,
        phone_number,
        amount,
        reference,
        awake_reference,
        telco_reference,
        network,
      ]);
}


export const saveTempTx = async(data) => {
try {
    const {
        phone_number,
        amount,
        reference,
        awake_reference,
        network,
        is_swap
      } = data;
      return processNoneData(query.createTempTx, [
        phone_number,
        amount,
        reference,
        awake_reference,
        network,
        is_swap
      ])
} catch(error){

}
}


export const addSwapRecord = async(data) => {
    return processOneOrNoneData(query.recordSwapTrail, [...data])
}