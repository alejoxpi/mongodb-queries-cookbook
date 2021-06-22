// Find the first 100 documents with a filter fieldName=value showing all the fields order by _id descending and 
//SELECT top(100) * FROM collection WHERE fieldName = value ORDER BY _id DESC
db.collection.find({"fieldName":value})
   .projection({})
   .sort({_id:-1})
   .limit(100)

//Count by field value
db.collection.find({"fieldName":value}).count()

//Count by grouped field
db.collection.aggregate([
    {"$group" : {_id:"$fieldName", count:{$sum:1}}}
])

//Multiple Fields Group By & Count
db.collection.aggregate([
    {"$group" : {_id:{source:"$source",status:"$status"}, count:{$sum:1}}}
])

//Multiple Fields Group By & Count with Sort using Field
db.Request.aggregate([
    {"$group" : {_id:{source:"$source",status:"$status"}, count:{$sum:1}}},
    {$sort:{"_id.source":1}}
])

//Multiple Fields Group By & Count with Sort using Count
db.Request.aggregate([
    {"$group" : {_id:{source:"$source",status:"$status"}, count:{$sum:1}}},
    {$sort:{"count":-1}}
])

//Find between dates
db.collection.find({
    "dateField": {
        $gte:ISODate("2020-11-01T00:00:00.000-05:00"),
        $lt: ISODate("2020-11-31T23:59:59.999-05:00")
    }
})

// Update the fieldName in all documents applying a function (toLower)
// UPDATE collection SET fieldName = toLower(fieldName)
db.collection.update(
    {},
    [{ $set: { fieldName: { $toLower: "$fieldName" } } }],
    { multi: true }
  )

//Obtener en minutos la resta de dos fechas por medio de un aggragate
db.collection.aggregate([
    {
        "$match":
        {
            "_fielName.subFieldName" : {$exists : false}
        }
    },
    {
     "$project":
     {
         "total" : { $divide: [ { $subtract: [ "dateCloseExample", "$fechaApertura" ] },60]},
         "dateOpenExample" : 1,
         "dateCloseExample": 1,
         "ticksExample": 1
     }   
    }
])



