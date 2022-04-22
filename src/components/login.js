import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies, setCookie } from "react-cookie";

import "./login.css";

function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");

  const [cookies, setCookie] = useCookies(["cname"]);

  const navigate = useNavigate();

  let signIn = (e) => {
    e.preventDefault();
    var data = {
      email,
      password,
    };
    debugger;
    fetch(`https://vishal-node.herokuapp.com/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        debugger;
        if (result === true) {
          //Cookie
          setCookie("cname", email, 1);
          console.log("Successful login");
          navigate("home");
        } else {
          alert("Invalid Credentials!!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let register = (e) => {
    e.preventDefault();

    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;

    if (password1 !== password2) {
      alert("Password do not match!!");
      return;
    }
    debugger;
    var data = {
      name: regName,
      email: regEmail,
      password: regPassword,
    };
    console.log(data);

    fetch(`https://vishal-node.herokuapp.com/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        alert("Registration Successfull");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

    document.getElementById("register_name").value = "";
    document.getElementById("register_email").value = "";
    document.getElementById("password1").value = "";
    document.getElementById("password2").value = "";
  };

  return (
    <div className="Login bg-dark">
      <div className="form-class-body bg-dark">
        <form className="form-class bg-dark text-light">
          <p className="h2 text-light">LOGIN FORM</p>
          <br />
          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div class="col-12">
            <br />
            <button
              type="submit"
              className="btn btn-primary btn-lg submit-btn"
              onClick={signIn}
            >
              Sign in
            </button>
          </div>
          <br />
        </form>
        <p className="h5 text-light sign-up-link">
          <button
            className="sign-up-btn bg-dark text-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Don't have an account?? Sign-up
          </button>
        </p>
      </div>

      <div className="modal fade register-modal" id="staticBackdrop" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header text-light">
              <h5 className="modal-title h4" id="exampleModalLabel">
                Registration Form
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <br />
            <form className="text-light signup-form">
              <div className="col-md-6">
                <label for="inputName2" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="register_name"
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="register_email"
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password1"
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  onChange={(e) => setRegPassword2(e.target.value)}
                  required
                />
              </div>
              <span id="message"></span>
              <div className="col-12">
                <br />
                <button
                  type="submit"
                  className="btn btn-primary signup-btn"
                  onClick={register}
                >
                  Sign Up
                </button>
              </div>
              <br />
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
