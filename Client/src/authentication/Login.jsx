import { useContext, useState } from "react";
import axios from "axios";
import { Button, TextInput, PasswordInput } from "@mantine/core";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const emailChange = (e) => setEmail(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
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
    const user = { email, password };
    try {
      const response = await axios.post(DB_URL + "/auth/login", user);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
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

        <Button type="submit" variant="default" color="red">
          Login
        </Button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </>
  );
}
