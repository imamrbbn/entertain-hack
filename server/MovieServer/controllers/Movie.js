const MovieModel = require('../models/Movie')

class MovieController {
    static async findAll (req, res) {
        try {
            const movies = await MovieModel.findAll()
            res.status(200).json(movies)
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }

    static create = async (req,res) => {
        try {
            const movie = await MovieModel.create(req.body)
            res.status(201).json(movie.ops[0])
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }

    static async findOne (req, res) {
        try {
            const movie = await MovieModel.findOne(req.params.id)
            res.status(200).json(movie)
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }

    static async update (req, res) {
        try {
            const movie = await MovieModel.update(req.params.id, req.body)
            res.status(200).json(movie)
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }

    static async delete (req, res) {
        try {
            const movie = await MovieModel.delete(req.params.id)
            res.status(200).json(movie)
        }
        catch(err) {
            // console.log(err, 'ini errornya');
            res.status(500).json(err)
        }
    }
}

module.exports = MovieController