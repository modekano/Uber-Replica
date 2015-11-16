/**
 * Created by Rushil on 11/14/2015.
 */
var mq_client = require('../rpc/client');
var requestGen = require('./commons/responseGenerator');

exports.registerAdmin = function(req, res){

    var email = req.param('email');
    var password = req.param('password');
    var firstName = req.param('firstName');
    var lastName = req.param('lastName');
    var address = req.param('address');
    var city = req.param('city');
    var state = req.param('state');
    var zipCode = req.param('zipCode');
    var phoneNumber = req.param('phoneNumber');
    var securityCode = req.param('securityCode');

    var msg_payload = {
        "email" : email,
        "password" : password,
        "firstName" : firstName,
        "lastName" : lastName,
        "address" : address,
        "city" : city,
        "state" : state,
        "zipCode" : zipCode,
        "phoneNumber" : phoneNumber,
        "securityCode" : securityCode,
        "func" : "registerAdmin"
    };

    mq_client.make_request('admin_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.send(requestGen.responseGenerator(999,null));
        } else {
            ////console.log("about results" + results);
            res.send(results);
        }
    });
};

exports.loginAdmin = function(req, res){

    var email = req.param('email');
    var password = req.param('password');

    var msg_payload = {
        "email" : email,
        "password" : password,
        "func" : "loginAdmin"
    };

    mq_client.make_request('admin_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.send(requestGen.responseGenerator(999,null));
        } else {
            ////console.log("about results" + results);
            res.send(results);
        }
    });
};