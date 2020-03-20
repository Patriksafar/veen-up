import React, {
  FormEventHandler,
  FormEvent,
  useState,
  ChangeEvent,
  useEffect
} from "react";
import { RouteComponentProps, Redirect, navigate } from "@reach/router";
import { Paper } from "../../components/paper";
import {
  TextField,
  Typography,
  FormControl,
  FormGroup,
  Grid
} from "@material-ui/core";

import * as classes from "./singup.styles";
import { Layout } from "../../components/layout";
import { Button, useStore } from "../../components";

import { routes } from "../../config";

type Props = RouteComponentProps;

export const SignUp = ({}: Props) => {
  const { veenupToken, setVeenupToken } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");

  console.log(veenupToken);

  if (veenupToken) {
    return <Redirect to={routes.addFacebook} noThrow />;
  }

  const postData = async (url = "", data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  };

  const handleSubmit = (event?: FormEvent) => {
    setSubmitted(true);
    setLoading(true);

    if (event) {
      event.preventDefault();
    }

    postData("http://localhost:5000/user/login", {
      email,
      password
    })
      .then(data => {
        if (data.error || !data.token) {
          setError("Invalid email or password");
        }
        setLoading(false);
        setVeenupToken(data.token);
      })
      .catch(error => {
        setLoading(false);
        setError("Invalid email or password");
      });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Layout>
      <div className={classes.singupPaper}>
        <Paper background="white">
          <Grid>
            <form onSubmit={handleSubmit}>
              {error && (
                <Typography color="error" variant="caption">
                  {error}
                </Typography>
              )}
              <FormGroup classes={{ root: classes.formGroup }}>
                <FormControl>
                  <TextField
                    error={submitted && !email}
                    helperText={submitted && !email && "This field is required"}
                    label="Email"
                    variant="outlined"
                    size="medium"
                    required
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    inputProps={{ type: "email" }}
                    margin="normal"
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    error={submitted && !password}
                    helperText={
                      submitted && !password && "This field is required"
                    }
                    label="Password"
                    variant="outlined"
                    size="medium"
                    required
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={handlePasswordChange}
                    inputProps={{ type: "password" }}
                  />
                </FormControl>
              </FormGroup>
              <Button disabled={loading} onClick={handleSubmit} type="submit">
                Sing in
              </Button>
            </form>
          </Grid>
        </Paper>
      </div>
    </Layout>
  );
};
