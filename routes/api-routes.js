const Users=require('../modules/user');

const APIRoutes = function (app, router) {
    this.app = app;
    this.router = router;
    this.conf = app.conf;

    this.init();
    this.users=new Users(app)
}
module.exports = APIRoutes;

APIRoutes.prototype.init = function () {
    const self = this;

    self.router.post('/createUsers', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        self.users.createUsers(req, res);
    })

    self.app.use(self.app.conf.web.basepath, self.router)
}