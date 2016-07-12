/**
 * Created by GiangDH on 5/18/16.
 */
"use strict";

const acl = require('acl');
const path = require('path');


var initPoliciesPath = function (module){
  return './server/api/'+module+'/config/policies';
}
var userPolicies = require(path.resolve(initPoliciesPath('user')));
module.exports = class PolicyConfig {
  static init(){
    userPolicies.invokeRolesPolicies();
  }
}
