/**
 * Created by GiangDH on 5/18/16.
 */

'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');


// Using the memory backend
acl = new acl(new acl.memoryBackend());


exports.invokeRolesPolicies = function() {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: ['/api/user'],
      permissions: '*'
    },
      {
      resources: '/api/user/:id',
      permissions: '*'
    }]
  },{
    roles: ['normal'],
    allows: [{
      resources: ['/api/user'],
      permissions: ['get']
    },
      {
      resources: '/api/user/:id',
      permissions: ['get']
    }]
  }]);
}
/**
 * Check If Admin Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  if(req.session.user){
    var role = (req.session.user.role) ? req.session.user.role : ['guest'];
    if(role){
      acl.areAnyRolesAllowed(role, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
          // An authorization error occurred.
          return res.status(500).send('Unexpected authorization error');
        } else {
          if (isAllowed) {
            // Access granted! Invoke next middleware
            return next();
          } else {
            return res.status(403).json({
              message: 'User is not authorized'
            });
          }
        }
      });
    }
  }
};

