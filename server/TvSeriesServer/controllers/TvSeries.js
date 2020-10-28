const TvSeriesModel = require('../models/TvSeries')

class TvSeriesController {
    static async findAll (req, res) {
        try {
            const tvSeries = await TvSeriesModel.findAll()
            res.status(200).json(tvSeries)
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }

    static create = async (req,res) => {
        try {
            const tvSeries = await TvSeriesModel.create(req.body)
            res.status(201).json(tvSeries.ops[0])
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }

    static async findOne (req, res) {
        try {
            const tvSeries = await TvSeriesModel.findOne(req.params.id)
            res.status(200).json(tvSeries)
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }

    static async update (req, res) {
        try {
            const tvSeries = await TvSeriesModel.update(req.params.id, req.body)
            res.status(200).json(tvSeries)
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }

    static async delete (req, res) {
        try {
            const tvSeries = await TvSeriesModel.delete(req.params.id)
            res.status(200).json(tvSeries)
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }
}

module.exports = TvSeriesController