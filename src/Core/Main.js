import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Signin from "./Signin";
import Signup from "./Signup";

const Main = () => {
  const [signIn, setSignIn] = useState(true);
  return (
    <Container>
      <header className="m-5 text-center">
        <p
          className="poppins-font fs-2"
          style={{
            fontSize: 19,
          }}
        >
          St. Joseph's Institute Of Technology
        </p>
        <h5 className="poppins-font fs=3"> OMR , CHENNAI - 600 119</h5>
      </header>
      <Container>
        {signIn && (
          <>
            <p className="text-center my-2 fs-2 poppins-font text-capitalize ">
              Welcome Back
            </p>
            <p className="lead text-muted text-center fs-6 ">
              Don't have an account?{" "}
              <button
                type="button"
                className="btn btn-link mb-1 p-0 border-0"
                onClick={() => setSignIn(false)}
              >
                Sign up
              </button>
            </p>
            <Signin />
          </>
        )}
        {!signIn && (
          <>
            <p className="text-center my-2 fs-2 poppins-font text-capitalize">
              Create your account
            </p>
            <p className="lead text-muted text-center fs-6 ">
              Already have an account?{" "}
              <button
                type="button"
                className="btn btn-link mb-1 p-0 border-0"
                onClick={() => setSignIn(true)}
              >
                Sign in
              </button>
            </p>
            <Signup />
          </>
        )}
      </Container>
    </Container>
  );
};

export default Main;
