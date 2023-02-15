import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import {useDispatch, useSelector} from "react-redux";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {signIn} from "../../../Actions/UserActions/AuthAction";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const checkBtn = useRef();
  const dispatch = useDispatch();

  const {message} = useSelector(state => state.message);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const handleLogin = (e) => {

    e.preventDefault();
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(signIn(username, password))
        .then(() => {
          navigate("/Homepage");
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-image">
        <div className="login d-flex align-items-center py-5">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-5 box text-center">
                <h1 className="text-white mb-5 animatedLine">Data lake</h1>

                <Form className="text-dark" onSubmit={handleLogin} ref={form}>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="form-control form-control-lg"
                      name="username"
                      id="userEmail"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group mb-5">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name="password"
                      value={password}
                      placeholder="Password"
                      id="floatingPassword"
                      onChange={onChangePassword}
                      validations={[required]}
                    />
                  </div>

                  {message && (
                    <div className="form-group-sm">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <CheckButton style={{display: "none"}} ref={checkBtn}/>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <button className="button fw-bold mb-2"
                                disabled={loading}>
                          {loading && (
                            <span className="spinner-border spinner-border-sm ">  </span>
                          )}
                          <span>Sign in</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
