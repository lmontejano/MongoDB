var express = require('express');
var router = express.Router();

router.get('/errorCount', function(req, res) {
	res.send({errorCount:0});
})



module.exports = router;