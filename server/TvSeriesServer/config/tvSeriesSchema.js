const db = require('./mongo')

db.createCollection("TvSeries", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "title", "overview", "poster_path", "popularity", "tags" ],
          properties: {
            title: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             overview: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             poster_path: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             popularity: {
                bsonType: ["double", "int"],
                description: "must be a number and is required"
             },
             tags: {
                bsonType: "array",
                description: "must be a array and is required"
             }
          }
       }
    }
 })

 process.exit()