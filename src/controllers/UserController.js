const { response, request } = require('express');

const getUser =  (req = request,res = response) => {
    //querys params
    // 
    const query = req.query;
    // con la desestructuracion podemos elegir los query params que queramos
    //y ademas settearles valores default
    //const {nombre= 'no name', edad = 21} = req.query;
    res.json({
        msq: 'get API',
        query
    });
}

const postUser =  (req = request,res = response) => {
    const body = req.body;
    res.json({
        msq: 'post API',
        body,
        "hola": "que flojera"
    });
}

const putUser =  (req,res) => {
    const id = req.params.id; // this is to pass the id of something through the url
   // const {id} = req.params.id; also u can make it like that
   // the url comes with an STRING data should parse it if I need int
    res.json({
        msq: 'put API',
        id
    });
}

const deleteUser =  (req,res) => {
    res.json({
        msq: 'delete API'
    });
}


module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser,
}