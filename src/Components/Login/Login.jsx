import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {signIn} from '../../Services/auth';
import styles from './styles.module.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡Este campo es requerido!
      </div>
    );
  }
};

const Login = ({setValidSession}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = false;
  const form = useRef();
  const checkBtn = useRef();

  const message = '';

  const onChangeEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async(e) => {
    try{
      e.preventDefault();
      const response = await signIn(email, password);
      setValidSession(true);
    }catch(error){
      throw error;
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 ">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={(e) => handleLogin(e, email, password)} ref={form}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              {loading && (
                <div className={styles['container-loading']}>
                  <div className="spinner-border spinner-border-sm"></div>
                </div>
              )}
              <button className="btn btn-primary btn-block" disabled={loading}>
                <span>Iniciar Sesión</span>
              </button>
              <div className="mt-4 float-left">
                <a href="/reset-password" class="link-primary">
                  ¿Olvidaste la contraseña?
                </a>
              </div>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
