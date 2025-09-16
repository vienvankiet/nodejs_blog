
class SiteController{

    // [GET] /
    index(req, res){
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    // [GET] /news
    news(req, res) {
        res.render('news');
    }
    }

module.exports = new SiteController;