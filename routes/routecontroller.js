

const pageFetcher = require('./../controllers/nav_cntrl');


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
        return res.status(200).render('search', {
            title: data.title,
            css_file_ref: data.css
        })
    })
}

routeController.sendjobsearch = function(req, res){
    pageFetcher.jobsearch(req, res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).render('jobsearch', {
            title: data.title,
            css_file_ref: data.css
        })
    })
}
// for now checking profile edit option
routeController.sendprofileEdit = function(req, res){
    pageFetcher.profileEdit(req, res, function(error, data){
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).render('profileEdit', {
            title: data.title,
            css_file_ref: data.css,
            firstname: data.firstname,
            lastname: data.lastname
        })
    })
}

routeController.sendForgotPassword = function(req, res) {
    pageFetcher.forgotPassword(req, res, function(error, data) {
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).render('forgot', {
            title: data.title,
            css_file_ref: data.css
        })
    })
}

module.exports = routeController;