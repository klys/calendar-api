import { MongoClient } from 'mongodb';
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...
  client.close()
  return 'done.';
}

export async function getCalendarData(month, year) {
    await client.connect();
    const db = client.db("calendar");

    const data = await db.collection(`calendar`).findOne({
        month: month,
        year: year
    })

    client.close()
    console.log("getCalendarData",data)

    if (data != null) {
        return data;
    } else return {}
    
}

export async function setCalendarData(month, year, data) {
    await client.connect();
    const db = client.db("calendar");

    let collection = await db.collection(`calendar`).findOne({
        month: month,
        year: year
    })

    console.log("setCalendarData",collection)
    if (collection == null) {
        collection = await db.collection(`calendar`).insertOne({
            month: month,
            year: year,
            data:data
        })
    } else {
        collection = await db.collection(`calendar`).updateOne({
            month: month,
            year: year
        },{
            $set: {'data' : data}
        })
    }
    

    client.close()
    return collection;
}

export async function test1 () {
    // numReturned: 0
    await client.connect();
    const db = client.db("calendar");

    const collection = await db.collection(`calendar`).findOne({
        month: "77",
        year: "2010"
    })

    console.log("test1",collection)

    client.close()
}

export async function test2() {
    /*
        test2 {
            acknowledged: true,
            insertedId: new ObjectId('66ae8d3acb2278ece7e2ab55')
            }
    */
    await client.connect();
    const db = client.db("calendar");

    const result = await db.collection(`calendar`).insertOne({
        month: "77",
        year: "2010",
        data:{
            testing:true,
            thing:"something",
            num:1010
        }
    })

    console.log("test2",result)

    client.close()
}