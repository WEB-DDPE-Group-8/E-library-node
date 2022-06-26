const mysql = require("mysql2")

const db = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1", //This is your localhost IP
    user: "root", // "database user name
    password: '',
    database: "nodelogin", // Database name

    port: "3306" // port name, "3306" by default
})
db.getConnection(
    (err, connection) => {
        if (err) {
            console.log(' The connection fails ')
            throw (err)
        }

        console.log("DB connected successful: " + connection.threadId)

        db.query('sql sentence ', (err, res) => {
            if (err)
                return console.log(err.message)

            console.log(res)

            //  When no longer in use , Return to connection pool 
            connection.release()

            //  When it is no longer used, it should be removed from the connection pool 
            connection.destory()
        })

        //  When the connection pool is not needed , Close connection pool 
        db.end()
    })