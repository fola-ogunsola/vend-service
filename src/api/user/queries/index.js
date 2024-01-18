// queries
export default {
    getMerchantId: `SELECT id FROM merchant WHERE access_key = $1`,
    getRefNum: `SELECT * from transaction WHERE reference = $1 AND merchant_id = $2;`,
    saveTx: `INSERT INTO transaction (
        merchant_id, 
        status,
        phone_number,
        amount,
        reference,
        awake_reference,
        telco_reference,
        network
    ) VALUES ($1, $2, $3,$4, $5, $6, $7, $8)`,
    createTempTx: `INSERT INTO temp_transactions (
        phone_number,
        amount,
        reference,
        awake_reference,
        network,
        is_swap
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
    recordSwapTrail:`INSERT INTO swap_records (
        merchant_id,
        phone_number,
        intial_network_provider,
        current_network_provider
    ) VALUES ($1, $2, $3, $4)`,
    fetchMerchantAccessKey:`SELECT id, name, access_key
    FROM merchant
    WHERE id = $1`
}
