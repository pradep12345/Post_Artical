const crypto=require("crypto").randomBytes(256).toString('hex')
module.exports={
    // uri:'mongodb://localhost:27017/Youtube',
    uri:'mongodb://ebasicstest:ebasicstest@ebasics-test-shard-00-00-dnrmf.mongodb.net:27017,ebasics-test-shard-00-01-dnrmf.mongodb.net:27017,ebasics-test-shard-00-02-dnrmf.mongodb.net:27017/medium?ssl=true&replicaSet=eBasics-test-shard-0&authSource=admin',
    secret:crypto,
    db: 'medium'
}