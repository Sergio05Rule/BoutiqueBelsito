import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotpassword } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ForgotPasswordScreen(props) {
  const [email, setEmail] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { userInfo, loading, error } = userForgotPassword;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotpassword(email));
    //props.history.push(redirect)
  };
  useEffect(() => {
    if (userInfo) {
      //props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Recupera Password</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {userInfo && (
              <MessageBox variant="success">
                Profilo aggiornato con successo, controlla la tua mail per scoprire la nuova Password
              </MessageBox>
            )}
        <div>
          <label htmlFor="email">Inserisci l'indirizzo email dell'account di cui vuoi recuperare la password. <br></br>La password ti verrà inviata direttamente nella tua mail di posta elettronica.</label>
          <input
            type="email"
            id="email"
            placeholder="Inserisci email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        
        <div>
          <label />
          <button className="primary" type="submit">
            Recupera Password
          </button>
        </div>
        <div>
          <label />
          <div>
          Nuovo cliente?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Crea un nuovo account in un semplice step!
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}