import bcrypt from 'bcrypt';
import { createHash } from "crypto";
import { access } from 'fs';


export const hashAccessKey = (data) => {
    const accesskey = 'ABCD'
    const hashKey = createHash("sha512").update(accesskey).digest("hex");
    if(hashKey){
        return hashKey;
    }
    return false;
} 
export const compareData = (data, hash) => bcrypt.compareSync(data, hash);