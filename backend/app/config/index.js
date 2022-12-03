const config = {
    app: {
        port: process.env.PORT || 8088,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://HanHan:hanne123@cluster0.wxl48hl.mongodb.net/HMusic?retryWrites=true&w=majority"
    },
    jwt: {
		secret: process.env.JWT_SECRET || "wbchat-secret-key",
        // secretReresh: process.env.JWT_SECRETRERESH || "wbchat-secret-reresh-key",
        tokenLife: process.env.JWT_LIFE || 86400, // 24h 
        // tokenLifeReresh: process.env.JWT_LIFE_RERESH || 20, // 24h 
	},
}
module.exports = config;