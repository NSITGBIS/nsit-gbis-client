var express = require('express');
var router = express.Router();
const path = require('path');
let multer = require('multer');
const fs = require('fs');
require('shelljs/global');

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.resolve(__dirname, '../public/uploads'));
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname.replace(/\s/g, ''));
	}
});
var upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Alconomy' });
});

router.post('/upload', upload.any(), function(req, res, next) {
	console.log(req.files);
	let filePath = req.files[0].path;
	let params = req.body;
	let script = '';
	let fileName = req.files[0].originalname.replace(/\s/g, '');

	if (fileName.endsWith('.dna')) {
		script = `dnaconverter2 -d ${filePath}`;
		fileName = `${fileName.replace('.dna', '')}.decoded`;
	} else {
		script = `dnaconverter2 -e ${filePath}`;
		fileName = `${fileName}.dna`;		
	}
	// console.log(filePath);
	// let payload = {
	// 	type: "formData",
	// 	formData: {
	// 		image: fs.createReadStream(filePath),
	// 		kycDocumentType: params.kycDocumentType,
	// 		kycImageSide: params.kycImageSide
	// 	}
	// };
	// console.log(filePath);
	exec(script, function(code, stdout, stderr) {
		console.log('Exit code:', code);
		console.log('Program output:', stdout);
		console.log('Program stderr:', stderr);
		res.status(200).json({ fileName: fileName });
	});
	// let authToken = res.locals.user.authToken;
	// KycService.uploadKycDocumentImage(payload, {}, authToken)
	// 	.then(data => {
	// 		fs.unlink(filePath, (err) => {
	// 			if (err) throw err;
	// 			res.status(data.status).send(data);
	// 		});
	// 	})
	// 	.catch(error => {
	// 		return next(error);
	// 	});
});

router.get('/dashboard', function(req, res, next) {
	res.render('dashboard', { title: 'Dashboard' });
});

router.get('/trade', function(req, res, next) {
	res.render('dashboard', { title: 'Trade' });
});

router.get('/add-money', function(req, res, next) {
	res.render('dashboard', { title: 'Add Money' });
});

router.get('/send', function(req, res, next) {
	res.render('dashboard', { title: 'Send' });
});

router.get('/receive', function(req, res, next) {
	res.render('dashboard', { title: 'Receive' });
});

router.get('/withdraw', function(req, res, next) {
	res.render('dashboard', { title: 'Withdraw' });
});

router.get('/passbook', function(req, res, next) {
	res.render('dashboard', { title: 'Passbook' });
});

router.get('/settings', function(req, res, next) {
	res.render('dashboard', { title: 'Settings' });
});

router.get('/standby', function(req, res, next) {
	res.render('dashboard', { title: 'Stand By' });
});

module.exports = router;
