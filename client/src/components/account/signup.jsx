import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./signup.css";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import Base_URL from "../../config/Config";
import * as Cookies from "es-cookie";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "react-spinner-material";

const Signup = ({ endpoint }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useAuth();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const idfy = endpoint === "buyersignup" ? 1 : 0;
  const token = Cookies.get("token");

  const SellerSignup = async (req, res) => {
    setError("Do admin login to create new admin");
    if (!token) {
      toast.error("Do admin login to create new admin", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
        autoClose: 2000,
      });
      navigate("/login");
    }
    if (username === "" || password === "" || email === "") {
      setError("Fill requires cridentials!");
    } else {
      setLoading(true);
      if (isValidEmail(email)) {
        await axios
          .post(
            `${Base_URL}/signup`,
            {
              username,
              idfy,
              email,
              password,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            if (!res.data.success) {
              setError(res.data.message);
            }
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              className: "toast-message",
              autoClose: 2000,
            });
            if (res.status !== 208) {
              navigate("/verifyOTP", {
                state: { email: email, logintype: "dashboard" },
              });
            }
          })
          .catch((e) => {
            setError("Something went wrong");
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.warning("Invalid email");
      }
    }
  };

  const Signup = async (e) => {
    e.preventDefault();

    if (
      firstname === "" ||
      lastname === "" ||
      password === "" ||
      email === "" ||
      phone === ""
    ) {
      setError("Fill requires cridentials!");
    } else {
      setLoading(true);
      if (isValidEmail(email)) {
        await axios
          .post(`${Base_URL}/signup`, {
            firstname,
            lastname,
            phone,
            idfy,
            email,
            password,
          })
          .then((res) => {
            setError(res.data.message);
            toast(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              className: "toast-message",
              autoClose: 2000,
            });
            if (res.status !== 208) {
              navigate("/verifyOTP", {
                state: { email: email, logintype: "buyerlogin" },
              });
            }
          })
          .catch((e) => {
            setError("Something went wrong");
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
        toast.warning("Invalid email");
      }
    }
  };

  function isValidEmail(email) {
    // Regular expression pattern for basic email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  return (
    <div className="container-f">
      <div className="form">
        <div className="account-type">Please login</div>
        <div className="input-field">
          <label className="name" htmlFor="name">
            First name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            name="firstname"
            id="firstname"
          />
        </div>
        <div className="input-field">
          <label className="name" htmlFor="name">
            Last name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            name="lastname"
            id="lastname"
          />
        </div>
        <div className="input-field">
          <label className="name" htmlFor="name">
            Phone no
          </label>
          <input
            type="number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            name="phone"
            id="phone"
          />
        </div>
        <div className="input-field">
          <label className="email" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            id="email"
          />
        </div>
        <label className="password" htmlFor="password">
          Password
        </label>
        <div style={{ position: "relative" }}>
          {!showPassword ? (
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              id="password"
            />
          ) : (
            <input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              id="visiblepassword"
            />
          )}
          <div
            className="show"
            style={{ position: "absolute", right: "8px", top: "4px" }}
          >
            <a
              style={{ cursor: "pointer" }}
              role="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
            </a>
          </div>
        </div>

        {loading ? (
          <div className="spin-div">
            <Spinner className="spin" radius={25} color={"#000"} />
            Please wait...
          </div>
        ) : (
          <div
            className={
              error !== undefined ? "visible-error" : "invisible-error"
            }
          >
            {error}
          </div>
        )}
        {idfy ? (
          <button onClick={Signup} className="create-button">
            SIGNUP
          </button>
        ) : (
          <button onClick={Signup} className="create-button">
            SIGNUP
          </button>
        )}
        {auth.enum === 0 ? (
          <div className="mb-5"></div>
        ) : (
          <div className="switch-account">
            <div className="signup-login">
              {idfy ? (
                <div
                  style={{ cursor: "pointer" }}
                  className="exist"
                  onClick={() => {
                    navigate("/sellersignup");
                  }}
                >
                  Seller signup
                </div>
              ) : (
                <div
                  style={{ cursor: "pointer" }}
                  className="exist"
                  onClick={() => {
                    navigate("/buyersignup");
                  }}
                >
                  Buyer signup
                </div>
              )}
            </div>

            <Link className="admin-login" to="/userlogin">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Signup;
