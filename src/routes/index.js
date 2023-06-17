const express = require('express');
const router = express.Router();
const EC2Controller = require('../controllers/EC2');

const ec2Controller = new EC2Controller();

router.get('/ec2', ec2Controller.getInstancesByRegion);


module.exports = router;