const jwt = require('jsonwebtoken');
// we passs an id that gonna be saved on the payload, so then then payload'll use the key on the .env and become into a token 
const generarJWT = (id) =>{
    return new Promise( (resolve,reject) => {
        const payload = {id};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '5h'
        }, (err,token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar token');
            } else {
                resolve( token);
            }
        } )
    }
    );
}

module.exports = {
    generarJWT
}