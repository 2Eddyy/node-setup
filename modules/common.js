
const Common = function (app) {
    this.app = app;
    this.conf = app.conf;
}

module.exports = Common;

Common.prototype.LoginApi = function (objs, cbk) {
    const self = this;

    let password = "Eddy@123";
    let username = "edwin@gmail.com";

    if (password == objs.password && username == objs.username) {
        cbk(true, "User login successfully")
    } else {
        cbk(false, "Username or password incorrect")
    }

}
