const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const  {MongoClient} = require('mongodb')

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

app.get("/", (req, res)=> res.send('<h1> Thank you Jesus </h1>'))
app.get("/api/articles/:name", async (req, res)=>{
    try {
        const articleName = req.params.name;
        const client = await MongoClient.connect('mongodb://localhost:27017')
        const db = client.db("dr")
        const articleInfo =  await db.collection('articles').findOne({name: articleName});
        res.status(200).json(articleInfo)
        client.close();
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