import {MongoClient} from 'mongodb';

const URI = process.env.MONGO_URI;

if (!URI) {
    throw new Error("MongoDB URI is not accessible");
}

const client = new MongoClient(URI);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
        throw err;
    }
}

export async function getDatabase() {
    const client = await connectToMongoDB();
    return client.db("url_shortener");
}

// call when application terminates
export async function disconnectFromMongoDB() {
    await client.close();
}