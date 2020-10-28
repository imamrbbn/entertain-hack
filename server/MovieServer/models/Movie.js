const db = require('../config/mongo')
const Movies = db.collection("Movies")
const { ObjectId } = require("mongodb")

class MovieModel {
    static findAll = () => {
        // console.log('masuk ke movie');
        return Movies.find().toArray()
    }

    static create = (newMovie) => {
        // console.log(newMovie,'masuk ke movie');
        return Movies.insertOne(newMovie)
    }

    static findOne(id) {
        // console.log(id,'masuk ke movie');
        return Movies.findOne({_id: ObjectId(id)})
    }

    static update (id, data) {
        // console.log(id,data,'masuk ke movie');
        return Movies.updateOne({_id: ObjectId(id)}, {$set: data})
    }

    static delete (id) {
        // console.log(id,'masuk ke movie');
        return Movies.deleteOne({_id: ObjectId(id)})
    }

}

module.exports = MovieModel