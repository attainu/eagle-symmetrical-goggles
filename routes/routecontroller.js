

const pageFetcher = require('./../controllers/nav_cntrl');
const dbController = require('./../controllers/db_cntrl');
const routeController = {};

routeController.homepage = function(req, res){
    pageFetcher.home(res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).render('homepage', {
            title: data.title,
            css_file_ref: data.css
        })
    })    
}           

routeController.dosignup = function(req, res){
    dbController.adduser(req, res, function(error, data){
        if(error){
            return res,status(500).send(error);
        }
        return res.status(200).send(data);
    })
}

routeController.sendprofile = function(req, res){
    pageFetcher.profile(res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).render('profile', {
            title: data.title,
            css_file_ref: data.css
        })
    })
}

routeController.sendaboutus = function(req, res){
    pageFetcher.aboutus(res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).render('about', {
            title: data.title,
            css_file_ref: data.css
        })
    })
}

routeController.sendsearch = function(req, res){
    pageFetcher.search(req, res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).render('jobsearch', {
            title: data.title,
            css_file_ref: data.css
        })
    })
}

module.exports = routeController;