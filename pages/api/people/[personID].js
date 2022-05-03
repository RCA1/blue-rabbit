import { people } from "../../../data/people";
import { MongoClient } from "mongodb";


export default async function handler(req, res) {
   const { personID } = req.query;

   if (req.method === "GET") {
      const person = people.find(person => person._id === personID)
      res.status(200).json(person);
      // console.log("INSIDE DYNAMIC")

      const client = await MongoClient.connect('mongodb+srv://rayvin:qPg7CUeHNzSc2Q4r@cluster0.esgza.mongodb.net/people?retryWrites=true&w=majority');
      const db = client.db();

      const peopleCollection = db.collection('people');

      const singlePerson = await peopleCollection.find({ id: parseInt(personID) });
      console.log(singlePerson);
      // res.status(200).json(singlePerson);

   }
   else if (req.method === "DELETE") {

      // const deletedPerson = people.find(person => person.id === parseInt(personID));

      // const index = people.findIndex(person => person.id === parseInt(personID))
      // people.splice(index, 1);

      // res.status(200).json(deletedPerson);

      //-----MONGODB-----
      const client = await MongoClient.connect('mongodb+srv://rayvin:qPg7CUeHNzSc2Q4r@cluster0.esgza.mongodb.net/people?retryWrites=true&w=majority');
      const db = client.db();

      const peopleCollection = db.collection('people');
      const deletedPerson = await peopleCollection.deleteOne({ id: parseInt(personID) });

      if (!deletedPerson) {
         return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });

      // console.log(personID)
      // console.log(people2)
      // console.log('hiii')
      client.close();
      // res.status(200).json(people2);
   }

}