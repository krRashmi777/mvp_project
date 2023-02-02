const con = require('../database/connection')

const queryExecute = (query) => {
    // console.log("🚀 ~ file: sqlquery.js:4 ~ queryExecute ~ query", query)
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            // console.log("🚀 ~ file: sqlquery.js:7 ~ con.query ~ err", err)
            // console.log("🚀 ~ file: sqlquery.js:7 ~ con.query ~ result", result)
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })

}

module.exports = {queryExecute}