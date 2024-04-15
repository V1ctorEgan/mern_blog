// const express = require('express');
import express from 'express';
import pg from 'pg';

const app = express();
const PORT = process.env.PORT || 8000;
// const  {MongoClient} = require('mongodb')


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "pernStack",
    password: "asumiboko",
    port: 5432,
  });
db.connect();

const articleInfo = {
    'learn-about-valves':{
        comments:[],
    },
    'stuff':{
        comments:[],
    },
    'history-of-Computers':{
        comments:[],
    }
}

//initialize middleware
//we formerly used body-parser, but it is now built in
// fuction of express, it parses incoming JSON payload
app.use(express.json({extended: false}));
async function Info() {
    const result = await db.query("SELECT * FROM pern");
    users = result.rows;
    // return users.find((user) => user.id == currentUserId);
    return users
  }

app.get("/", (req, res)=> res.send('<h1> Thank you Jesus </h1>'))
app.get("/test", async (req, res)=>{
    db.query("SELECT * FROM pern", (err, res) =>{
        if(err){
            console.error('this is the error', err.stack)
        }else{

            console.log(res.rows.map((tile)=> {return ( tile.comments)}));
            const data = res.rows.map(tile => tile);
        }
    })
})
app.get("/api/articles/:name", async (req, res)=>{
    try {
        const articleName = req.params.name;
        console.log(`this : ${articleName}`);
        // const client = await MongoClient.connect('mongodb://localhost:27017')
        // const db = client.db("dr")
        // const result = db.query("SELECT * FROM pern WHERE")
        db.query(`SELECT * FROM pern WHERE name = ${articleName}`, (err, res) =>{
            // console.log(res.rows.map((tile)=> {return ( tile.comments)}));
            // const data = res.rows.map(tile => tile);
            // console.log(data);
            console.log(res);
            if(err){
                console.error('this is the error', err.stack)
            }else{
    
                console.log(res.rows.map((tile)=> {return ( tile.comments)}));
                const data = res.rows.map(tile => tile);
                console.log(data);
                res.status(200).json(data)
            }
        });
    
        // const articleInfo =  await db.collection('articles').findOne({name: articleName});

    } catch (error) {
        res.status(500).json({message: 'Error connecting to database', error})
    }
   

})

app.post("/api/articles/:name/add-comments", (req, res)=>{
    const {username, text} = req.body
    const articleName = req.params.name;
    articleInfo[articleName].comments.push({username, text})
    res.status(200).send(articleInfo[articleName])
});

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})