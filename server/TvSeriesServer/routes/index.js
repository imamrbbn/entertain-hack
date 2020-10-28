const router = require('express').Router()
const TvSeriesController = require('../controllers/TvSeries')

router.get('/', TvSeriesController.findAll)
router.post('/', TvSeriesController.create)

router.put('/:id', TvSeriesController.update)
router.delete('/:id', TvSeriesController.delete)
router.get('/:id', TvSeriesController.findOne)

module.exports = router