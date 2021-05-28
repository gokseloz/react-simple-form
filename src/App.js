import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [pressed, setPressed] = useState(false);
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "",
  });
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("people")) || []
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      person.firstName &&
      person.lastName &&
      person.email &&
      person.phone &&
      person.preferredContact
    ) {
      const newPerson = { ...person, id:new Date().getTime().toString()};
      setPeople([...people, newPerson]);
      setPerson({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        preferredContact: "",
      });
      console.log(people)


      localStorage.setItem("people", JSON.stringify([...people, person]));
      setPressed(true);
      setTimeout(() => {
        setPressed(false);
      }, 100);

    } else {
      console.log("err");
    }
  };

  const deletePerson = (id) => {
    let newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
    localStorage.setItem("people", JSON.stringify(newPeople));
  };

  return (
    <>
      <article>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={person.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={person.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={person.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="phone">Phone</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={person.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="preferredContact">Contact</label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={person.preferredContact}
              onChange={handleChange}
            >
              <option disabled value="">
                Select Contact Type
              </option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <button type="submit" aria-pressed={pressed ? "true" : false}>
            add person
          </button>
        </form>
        <div className="itemContainer">
          {people.map((person, personIndex) => {
            const { id, firstName, lastName, email, phone, preferredContact } = person;
            return (
              <article className="item" key={personIndex} tabIndex="0">
                <p>
                  <span tabIndex="0">First Name:</span>
                  <span tabIndex="0">{firstName}</span>
                </p>
                <p>
                  <span tabIndex="0">Last Name:</span>
                  <span tabIndex="0"> {lastName}</span>
                </p>
                <p>
                  <span tabIndex="0">Email:</span>
                  <span tabIndex="0">{email}</span>
                </p>
                <p>
                  <span tabIndex="0">Phone:</span>
                  <span tabIndex="0">{phone}</span>
                </p>

                <p>
                  <span tabIndex="0">Preferred Contact: </span>
                  <span tabIndex="0">{preferredContact}</span>
                </p>
                <button
                  aria-label="delete person"
                  onClick={() => deletePerson(id)}
                >
                  Delete Person
                </button>
              </article>
            );
          })}
        </div>
      </article>
    </>
  );
};

export default App;
