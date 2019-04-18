//Required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const createErrors = require('http-errors');
const routes = require('./routes');
const configs = require('./config');
const OurService = require('./services/OurService');
const FeedbackService = require('./services/FeedbackService');
//2. Require the PersonaliseService module
const PersonaliseService = require('./services/PersonaliseService');
const app = express();
const config = configs[app.get('env')];

const ourService = new OurService(config.data.ourservices);
const feedbackService = new FeedbackService(config.data.feedback);
const personaliseService = new PersonaliseService(config.data.users);
//Set View Engine
app.set('view engine', 'pug');


//Makes HTML pretty (Keeps white space)
if(app.get('env') === 'development'){
    app.locals.pretty = true;
}

app.set('views', path.join(__dirname, './views'));

//Create routes for the static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico', (req, res, next) => {
    return res.sendStatus(204); 
});

app.use(async (req, res, next) => {
    try {
        const names = await ourService.getNames();
        res.locals.serviceNames = names;
        return next();
    }catch(err){
        return next(err);
    }
});

//Use routes module
app.use('/', routes({
    ourService: ourService,
    feedbackService: feedbackService,
    personaliseService: personaliseService
}));

//If route not found load 404
app.use((req, res, next) => {
    return next(createErrors(404, 'File not found'))
});
//Displays Error message in pug
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === "development" ? err : {};
    res.status(status);
    return res.render('error');
});

//Start server
app.listen(3000);
//Exports
module.export = app;

