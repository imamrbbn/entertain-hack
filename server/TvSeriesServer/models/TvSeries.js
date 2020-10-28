const db = require('../config/mongo')
const TvSeries = db.collection("TvSeries")
const { ObjectId } = require("mongodb")

class TvSeriesModel {
    static findAll = () => {
        // console.log('masuk ke tv series');
        return TvSeries.find().toArray()
    }

    static create = (newTvSeries) => {
        // console.log(newTvSeries,'masuk ke tv series');
        return TvSeries.insertOne(newTvSeries)
    }

    static findOne(id) {
        // console.log(id,'masuk ke tv series');
        return TvSeries.findOne({_id: ObjectId(id)})
    }

    static update (id, data) {
        // console.log(id,data,'masuk ke tv series');
        return TvSeries.updateOne({_id: ObjectId(id)}, {$set: data})
    }

    static delete (id) {
        // console.log(id,'masuk ke tv series');
        return TvSeries.deleteOne({_id: ObjectId(id)})
    }
}

module.exports = TvSeriesModel