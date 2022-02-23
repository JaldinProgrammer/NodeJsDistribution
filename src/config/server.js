const express = require('express');
const cors = require('cors');
var path = require('path');
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userRoutePath = '/api/users';
        this.authPath = '/api/auth';
        this.enterprisePath = '/api/enterprise';
        this.enterpriseTypePath = '/api/enterpriseType';
        //Middlewares
        this.middlewares();
        //rutas
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        //directorio publico
        this.app.use(express.static(path.join(__dirname, '../../public')));
    }

    routes(){
        this.app.use(this.userRoutePath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.enterprisePath, require('../routes/enterprise.routes'));
        this.app.use(this.enterpriseTypePath, require('../routes/enterpriseType.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto --> ', this.port);
        });
    }
}

module.exports = Server;

