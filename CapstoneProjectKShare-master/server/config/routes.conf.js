"use strict";

const morgan = require('morgan');
const bodyParser = require('body-parser');
const contentLength = require('express-content-length-validator');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');


module.exports = class RouteConfig {
    static init(application) {
        let _root = process.cwd();
        let _clientFiles = (process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/';
        application.use(express.static(_root));
        application.use(express.static(_root + _clientFiles));
        application.use(bodyParser.json());
        // parse application/x-www-form-urlencoded
        application.use(bodyParser.urlencoded({ extended: false }))
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 9999}));
        application.use(helmet());
        require('../api/user/config/passport')(passport);
        application.use(expressSession({
          secret: 'kshare',
          cookie: { maxAge: 60000 },
          secure: false,
          httpOnly: false,
          resave: true,
          saveUninitialized: true
        }));

        // Add passport's middleware
      application.use(passport.initialize());
      application.use(passport.session());
    }
}
