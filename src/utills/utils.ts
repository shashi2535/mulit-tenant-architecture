import { TransformableInfo } from 'logform';

export function getLogMessage(info: TransformableInfo) {
    return `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : ' ');
}

export function generateRandomString(length:number){
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
var result = ""
var charactersLength = characters.length;

for ( var i = 0; i < length ; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result
}

export const connectionString = (dbUser:string,dbPassword:string, dbHost:string , DB_PORT:number, dbName:string)=>{
    return`mysql://${dbUser}:${dbPassword}@${dbHost}:${DB_PORT}/${dbName}`;
}
// ?ssl-mode=REQUIRED