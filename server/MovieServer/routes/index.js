const router = require('express').Router()
const MovieController = require('../controllers/Movie')

router.get('/', MovieController.findAll)
router.post('/', MovieController.create)

router.put('/:id', MovieController.update)
router.delete('/:id', MovieController.delete)
router.get('/:id', MovieController.findOne)

module.exports = router