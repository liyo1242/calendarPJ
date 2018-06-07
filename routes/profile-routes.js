const router = require('express').Router();

const authCheck = (req,res,next) => {
	if(req.user){
		res.redirect('/auth/login');
	}else{
		next();
	}
};

router.get('/',(req,res) => {
	res.send('you are logged in ' + req.user.username + '   and all thing in req.user  ===>  ' + req.user);
});

module.exports = router;