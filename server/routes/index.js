//Required modules
const express = require('express');
const ourservicesRoutes = require('./ourservices');
const feedbackRoutes = require('./feedback');

//Load express router
const router = express.Router();

module.exports = (param) => {
    const { ourService } = param;
    const { personaliseService } = param;
    //homepage route
    router.get('/', async(req, res, next) => {
        const ourserviceslist = await ourService.getListShort();
        const allOurwork = await ourService.getAllOurwork();
        const usersFavouriteService = await personaliseService.getUsersFavouriteService("Chandra_Nazareno");
        const favouriteService = await ourService.getOurworkForService(usersFavouriteService);
        return res.render('index',{page: 'Home', ourserviceslist, ourwork: favouriteService})
    });

    //Load service and feedback routes
    router.use('/ourservices', ourservicesRoutes(param));
    router.use('/feedback', feedbackRoutes(param));

    return router;
};


