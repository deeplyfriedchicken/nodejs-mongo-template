const router = require('express').Router()

const { authenticate } = require('./../middleware/authenticate')
const user = require('./../controllers/user')

router.post('/signup', user.signup)
router.post('/login', user.login)

router.use(authenticate)
router.get('/me', user.currentUser)

module.exports = router
