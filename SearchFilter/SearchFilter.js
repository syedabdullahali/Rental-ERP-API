const toFindUniqCollectionVa = require("./findUniqFun");

const { MongoClient,ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()

const url = 'mongodb+srv://syedabdullahali380:9fJkmUzjpOmpWFre@cluster0.lrmiaui.mongodb.net/';

router.get('/:value/:partnerAdminId', async (req, res) => {

  try {
    const client = new MongoClient(url, { useNewUrlParser: true });
    const {partnerAdminId} = req.params

    const value = req.params.value.replace(/\$dv2e62e/g, ' ')

    const db = client.db('test');

    // Use listCollections to get a cursor to the collections
    const cursor = db.listCollections();
    const collections = await cursor.toArray();

    const allCollection = [value]

    const handleSearchValInclude = (el)=>{

      return ([...Object.values(el)].map((el2)=>el2+""?.trim()||el).includes(value)
      ||[...Object.values(el)].map((el2)=>el2+""?.trim()||el).includes(+value))
    }

    
    const collectionObj = {
      collectionArr:allCollection,
      inputVal:value,
      handleSearchValInclude
    }

    for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        const collection = db.collection(collectionName);
  
        // Query documents in the current collection
        const documents = await collection.find({partnerAdminMongoId: new ObjectId(partnerAdminId)}).toArray();

            documents.map((el)=>{
                if(handleSearchValInclude(el) && !allCollection.includes(collectionName) ){
                    allCollection.push(collectionName)              
                }

                if (handleSearchValInclude(el) && el?.enquirestatus!=='notshow'){
                   toFindUniqCollectionVa(el,collectionName,collectionObj)
                }
            })
      }



    // Extract collection names from the result
    // const collectionNames = collections.map((collection) => collection);

    // console.log('Collections:', collectionNames);
    
    // const database = client.db('test');

    // const collections = await database.listCollections().toArray();

    // console.log()

    // const DocsList = [];

    // // Create an array of promises for concurrent execution
    // const promises = collections.map(async (collection) => {
    //   if (collection.name.includes('products')) {
    //     const documents = database.collection(collection.name);
    //     const findDocs = await documents
    //       .find({})
    //       .project({ /* specify only the fields you need */ })
    //       .toArray();

    //     if (findDocs.length > 0) {
    //       DocsList.push(...findDocs);
    //     }
    //   }
    // });

    // // Wait for all promises to resolve
    // await Promise.all(promises);

    res.status(200).json({ success: true, allCollection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'An error occurred' });
  } 
  // finally {
  //   // Close the MongoDB connection
  //   if (client) {
  //     client.close();
  //   }
  // }
});


module.exports = router
