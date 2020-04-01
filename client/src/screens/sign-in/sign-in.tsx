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

import * as classes from "./sign-in.styles";
import { Layout } from "../../components/layout";
import { Button, useStore, Link, Logo } from "../../components";

import { routes } from "../../config";
import { postData } from "../../utils";

type Props = RouteComponentProps;

export const SignIn = ({}: Props) => {
  const { veenupToken, setVeenupToken } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");

  if (veenupToken) {
    return <Redirect to={routes.dashboard} noThrow />;
  }

  const handleSubmit = (event?: FormEvent) => {
    if (!email && !password) {
      return;
    }

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
    <Layout color="contained">
      <div className={classes.singupPaper}>
        <Logo variant="medium" />
        <Paper background="white">
          <Typography variant="h6">Sign In</Typography>
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
              <FormGroup row classes={{ root: classes.signupButtons }}>
                <Button
                  disabled={loading}
                  onClick={handleSubmit}
                  type="submit"
                  color="primary"
                  smallerPadding
                >
                  Sing in to enter Veenup
                </Button>
                <span className={classes.buttonSeparator}>or</span>
                <Link to={routes.signUp}>sign up</Link>
              </FormGroup>
            </form>
          </Grid>
        </Paper>
      </div>
    </Layout>
  );
};
