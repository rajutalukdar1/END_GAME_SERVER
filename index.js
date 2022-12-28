const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.78yphzz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(client);

// main function 
async function run() {
    try {
        const srjrPostCollection = client.db('srjr').collection('srjrPost');



        app.post('/srjrPost', async (req, res) => {
            const post = req.body;
            // console.log(post);
            const result = await srjrPostCollection.insertOne(post);
            console.log(result);
            res.send(result);
        })

        app.get('/allPosts', async (req, res) => {
            const query = {}
            const cursor = srjrPostCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // app.get('/allPost', async (req, res) => {
        //     let query = {}
        //     if (req.query.email) {
        //         query = {
        //             email: req.query.email
        //         }
        //     };
        //     const cursor = srjrPostCollection.find(query)
        //     const result = await cursor.toArray();
        //     res.send(result)
        // })
    }
    finally {

    }
}
run().catch(error => console.log(error))



app.get('/', async (req, res) => {
    res.send('SRJR server is running');
})

app.listen(port, () => console.log(`SRJR server is running ${port}`));