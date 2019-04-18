const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const {ourService} = param;

    router.get('/', async(req, res, next) => {


        
        const ourserviceslist = await ourService.getList();
        //Calls our function in speaker services and returns all the artwork in one array
        const allOurwork = await ourService.getAllOurwork();
        //Pass the data to the pug file
        return res.render('ourservices', {page: ' Our Services', ourserviceslist, ourwork: allOurwork});

    });

 
    router.get('/:name', async(req, res, next) => {

        try {
            const promises = [];
            promises.push(ourService.getService(req.params.name));
            promises.push(ourService.getOurworkForService(req.params.name));
            const result = await Promise.all(promises)

            if(!result[0]){
                return next();
            }
            return res.render('ourservices/detail', {
                page: req.params.name, 
                service: result[0],
                ourwork: result[1],
            });
        }catch (err){
            return next(err);
        }
        
    });

    return router; 
};

