const Common = require('../modules/common');
const Users = function (app) {
    this.app = app;
    this.conf = app.conf;
    this.common = new Common(app);
}

module.exports = Users;

Users.prototype.createUsers = function (req, res) {

    const self = this;
    let reqObj = req.body;

    if (reqObj.username && reqObj.password) {
        self.common.LoginApi(reqObj, function (status, result) {
            if (status) {
                res.json({ status: true, message: result })
            }
            else {
                res.json({ status: false, message: result })
            }
        })
    }
    else {
        res.json({ status: false, message: "Please fill required fields" });
    }
}