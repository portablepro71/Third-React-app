import React from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState, useRef } from "react";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  const enteredUsername = useRef();
  const enteredAge = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();

    const name = enteredUsername.current.value;
    const age = enteredAge.current.value;
    //input dolu mu boş mu ?
    if (name.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please Enter valid name and age.",
      });
      return;
    }
    //+ koymak string i integer a çevirir kısa yol!!!
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please Enter valid age (>0).",
      });
      return;
    }

    props.onAddUser(name, age);

    enteredUsername.current.value = "";
    enteredAge.current.value = "";

    // setEnteredAge("");
    // setEnteredUsername("");
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onErrorExit={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={enteredUsername}
          />
          <label htmlFor="username">Age (years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={enteredAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
