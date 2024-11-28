import { useState } from "react";
import axios from "axios";
import { Button, TextInput, PasswordInput, Card } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const emailChange = (e) => setEmail(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);
  const nameChange = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return setErrorMessage("Please Provide a valid email adress");
    }
    const requestBody = { email, password, name };
    try {
      const response = await axios.post(DB_URL + "/auth/signup", requestBody);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <Card withBorder m={20}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            value={email}
            onChange={emailChange}
            placeholder="email"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={passwordChange}
            placeholder="password"
          />

          <TextInput
            label="Name"
            value={name}
            onChange={nameChange}
            placeholder="name"
          />
          <Button mt="20" type="submit" variant="filed" color="blue">
            Signup
          </Button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have account? </p>
        <Link to={"/login"}> Login</Link>
      </Card>
    </>
  );
}
