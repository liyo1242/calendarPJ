module.exports = {
	google:{  // 這是google client端 https://console.cloud.google.com/apis/credentials
		clientID: "902514097773-djg2umvh2tsrpfbebv52iscbsbdv9gmp.apps.googleusercontent.com",
    	clientSecret: "nqcuTMTnfHJPiETvnCvr1a4E"
	},
	mongodb:{ // 這是mongodb的路徑  我是用mLab https://mlab.com/home
		dbURL:"mongodb://liyo:liyo@ds255309.mlab.com:55309/nn-oauth-test"
	},
	session:{ // 隨便設的cookie
		cookieKey:'jojoisverygood'
	}
};