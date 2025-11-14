const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://Online-Learning-Platform-db:LtJ549iPMjmI8s3n@project-1.3gjxivd.mongodb.net/?appName=Project-1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("Online-Learning-Platform-db");
    const coursesCollection = db.collection("Courses");
    //find
    //findOne
    app.get("/courses", async (req, res) => {
      const result = await coursesCollection.find().toArray();
      res.send(result);
    });

    app.get("/courses/:id", async (req, res) => {
      const { id } = req.params;
      const result = await coursesCollection.findOne({ _id: new ObjectId(id) });
      res.send({
        success: true,
        result,
      });
    });

    //post method
    //insertOne
    //insertMany

    app.post("/courses", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await coursesCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
    });

    //PUT
    //UpdateOne
    //UpdateMany

    app.put("/courses/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const update = {
        $set: data,
      };
      const result = await coursesCollection.updateOne(filter, update);

      res.send({
        success: true,
        result,
      });
    });

    app.delete("/courses/:id", async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const result = await coursesCollection.deleteOne(filter);

      res.send({
        success: true,
        result,
      });
    });

    //features 6 course
    //get
    //find
    app.get("/features-course", async (req, res) => {
      const result = await coursesCollection.find().sort().limit(6).toArray();
      res.send(result);
      console.log(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
