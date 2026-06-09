const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/env');

exports.generateToken = (id) => jwt.sign({ id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

exports.verifyToken = (token) => jwt.verify(token, jwtConfig.secret);
