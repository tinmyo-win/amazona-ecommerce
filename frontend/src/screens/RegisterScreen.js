import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect')
  const redirectPath = redirect ? `/signin?redirect=${redirect}` : `/signin`


  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo && redirect) {
      return navigate(`/${redirect}`)
    }
    if(userInfo) {
      navigate('/')
    }
  }, [userInfo,navigate, redirect ])

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert ('Password and confirm password are not match')
    } else {
    dispatch(register(name, email, password));
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create account</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant='error'>{error}</MessageBox>}
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confrim Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to={redirectPath}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
