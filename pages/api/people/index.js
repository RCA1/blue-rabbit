import { people } from "../../../data/people";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
   if (req.method === 'GET') {
      // res.status(200).json(people);

      const client = await MongoClient.connect('mongodb+srv://rayvin:qPg7CUeHNzSc2Q4r@cluster0.esgza.mongodb.net/people?retryWrites=true&w=majority');
      const db = client.db();

      const peopleCollection = db.collection('people');
      const people2 = await peopleCollection.find().toArray();
      client.close();
      res.status(200).json(people2);
   }
   else if (req.method === 'POST') {
      const person = req.body.userInput;

      const newPerson = {
         id: Math.floor(Date.now() + Math.random()),
         fName: person.fName,
         lName: person.lName,
         imageURL: person.imageURL
      }
      // people.push(newPerson);
      // res.status(201).json(newPerson);


      // -----------MongoDB--------
      const client = await MongoClient.connect('mongodb+srv://rayvin:qPg7CUeHNzSc2Q4r@cluster0.esgza.mongodb.net/people?retryWrites=true&w=majority');
      const db = client.db();

      const peopleCollection = db.collection('people');

      const result = await peopleCollection.insertOne(newPerson);
      console.log(result);
      client.close();

      res.status(201).json({ message: 'New Person Inserted' })

   }
}