module.exports = {
    client: "sqlite3",
    useNullAsDefault: true,//used for sqlite3
    connection: {
        filename: "./database/Auth.db3",

    },
    migration: {
        directory: "./database/migrations",
    },
    seeds:{
        directory:"./database/seeds",
    },
    pool:{//Setting forcely to on foreign key in sqlite3
        afterCreate:(conn,done)=>{
            conn.run("PRAGMA foreign_keys=ON",done)
        },
    }

}