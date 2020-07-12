const express = require('express');
const app = express();
const path = require('path');



//configuraciones
app.set('port',4000);
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('views engine', 'ejs');

//rutas 
app.use(require('./routes/index'));

//middlewares


//archivos estaticos
app.use(express.static(path.join(__dirname,'public')))

//servidor escuchando
app.listen(app.get('port'), () => {
    console.log("servidor escuchando en le puerto:", app.get('port'))
});