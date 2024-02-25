import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Authen() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // useEffect to navigate after authentication state is updated
  useEffect(() => {
    if (authenticated) {
      navigate("/homepage");
    }
  }, [authenticated, navigate]);

  async function SignUp() {
    try {
      if (userPassword.length < 6) {
        console.error("Password should be at least 6 characters.");
        return; // Don't proceed with sign-up
      }

      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      setAuthenticated(true);
    } catch (error) {
      // Handle other errors
      console.error("Error signing up:", error.message);
    }
  }

  async function SignInGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      // Handle other errors
      console.error("Error signing up:", error.message);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h2 className="card-title text-center mb-5  fs-5">Sign Up</h2>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <label>Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <label>Password</label>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  onClick={SignUp}
                >
                  Sign Up
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  onClick={SignInGoogle}
                >
                  Continue With Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
