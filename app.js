var http= require('http');
var path= require('path');
var express= require('express');
var logger= require('morgan');
var bodyParser= require('body-parser');

var app = express();
app.set('views',path.relative(__dirname,'views'));
app.set('view engine','ejs');
var entries=[];
app.locals.entries=entries;
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.get('/',(Request,Response)=> Response.render('index'));
app.get('/new-entry',(Request,Response)=> Response.render('new-entry'));

app.post('/new-entry',(Request,require)=>{
    if(!Request.body.title||!Request.body.body){
        Response.status(400).send('la entrada debe tener titulo ');
        return;
    }
    entries.push({
        title: Request.body.title,
        body: Request.body.body,
        created: new Date()
    });
    Response.redirect('/');
});

app.use((Request,require)=> Response.status(400).render('400'));
http.createServer(app).listen(3000,()=>
    console.log('la aplicacion esta escuchando por el puerto 3000')
);