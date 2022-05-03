import { useState } from "react";
import styles from '../styles/home.module.scss';
// import { useEffect } from "react";
// import { MongoClient } from "mongodb";

function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [userInput, setUserInput] = useState({
    fName: '',
    lName: '',
    imageURL: ''
  });

  async function fetchPeople() {
    const response = await fetch('/api/people');
    const data = await response.json();

    setPeople(data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInput(prev => {
      if (name === 'fName') {
        return {
          fName: value,
          lName: prev.lName

        }
      } else if (name === 'lName') {
        return {
          fName: prev.fName,
          lName: value
        }
      } else if (name === 'imageURL') {
        return {
          fName: prev.fName,
          lName: prev.lName,
          imageURL: value
        }
      }
    })
  }

  async function handleSubmit() {
    // if (userInput.fName === '' || userInput.lName === '' || userInput.imageURL === '') {
    //   alert("Incomplete Fields");
    //   return;
    // }

    const response = await fetch('/api/people', {
      method: 'POST',
      body: JSON.stringify({ userInput }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    console.log(data);

    setUserInput(
      {
        fName: '',
        lName: '',
        imageURL: ''
      }
    )
    fetchPeople();
  }

  async function deletePerson(personID) {
    console.log("Deleting" + personID)
    const response = await fetch(`/api/people/${personID}`, {
      method: 'DELETE'

    });
    console.log("inside");
    const data = await response.json();
    console.log(data);
    fetchPeople();

  }


  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <div className={styles.inputAndLabelContainer}>
          <label className={styles.labelContainer}>First Name </label>
          <input className={styles.inputBox} onChange={handleChange} type="text" name='fName' value={userInput.fName} />
        </div>



        <div className={styles.inputAndLabelContainer}>
          <label className={styles.labelContainer}>Last Name </label>
          <input className={styles.inputBox} onChange={handleChange} type="text" name='lName' value={userInput.lName} />
        </div>

        <div className={styles.inputAndLabelContainer}>
          <label className={styles.labelContainer}>Image URL</label>
          <input className={styles.inputBox} onChange={handleChange} type="text" name='imageURL' value={userInput.imageURL} />
        </div>

        <button onClick={handleSubmit} className={styles.addButton}>Add New Person</button>
      </div>


      <br /><br /> <br /><br />

      <div className={styles.dataContainer}>
        <button className={styles.loadButton} onClick={fetchPeople}>Load People List</button>
        {
          people.map(person => {
            return (
              <div key={person.id} className={styles.individualPersonContainer}>
                <img className={styles.image} src={person.imageURL} />
                {person.fName} {person.lName}
                <button className={styles.xButton} onClick={() => deletePerson(person.id)}>x</button>
              </div>)
          })
        }
      </div>

    </div>)
}


export default PeoplePage;