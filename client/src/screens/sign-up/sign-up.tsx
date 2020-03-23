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

import * as classes from "./sign-up.styles";
import { Layout } from "../../components/layout";
import { Button, useStore, Link } from "../../components";

import { routes } from "../../config";

type Props = RouteComponentProps;

type ErrorProps = {
  field?: string | null;
  message?: string | null;
};

export const SignUp = ({}: Props) => {
  const { veenupToken, setVeenupToken } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

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
    setLoading(true);

    if (event) {
      event.preventDefault();
    }

    postData("http://localhost:5000/user/signup", {
      email,
      password
    })
      .then(data => {
        if (data.error || !data.token) {
          setError({
            field: data.error.field || null,
            message: data.error.message || null
          });
        }
        setLoading(false);
        setVeenupToken(data.token);
      })
      .catch(error => {
        setLoading(false);
        setError({ message: "Oops something went wrong" });
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
          <Typography variant="h6">Sign Up to VeenUp</Typography>
          <Grid>
            <form onSubmit={handleSubmit}>
              {error && !error.field && error.message && (
                <Typography color="error" variant="caption">
                  {error.message}
                </Typography>
              )}
              <FormGroup classes={{ root: classes.formGroup }}>
                <FormControl>
                  <TextField
                    error={!!error && error.field === "email"}
                    helperText={
                      !!error && error.field === "email" ? error.message : ""
                    }
                    label="Email"
                    variant="outlined"
                    size="medium"
                    required
                    fullWidth
                    value={email}
                    onBlur={() => setError(null)}
                    onChange={handleEmailChange}
                    inputProps={{ type: "email" }}
                    margin="normal"
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    label="Create a password"
                    variant="outlined"
                    size="medium"
                    placeholder="Enter 5 characters and more"
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
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
                  Sign Up
                </Button>
                <span className={classes.buttonSeparator}>or</span>
                <Link to={routes.signIn}>sign in</Link>
              </FormGroup>
            </form>
          </Grid>
        </Paper>
      </div>
    </Layout>
  );
};
