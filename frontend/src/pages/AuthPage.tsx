import React from "react";
import { useHistory } from "react-router";

import { useMessage } from "../hooks/message";
import { onRegisterUser, onLoginUser } from "../api";
import { AuthContext } from "../context/authContext";

export const AuthPage: React.FC = () => {
  const history = useHistory();
  const auth = React.useContext(AuthContext);
  const message = useMessage();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const clearError = React.useCallback(() => setError(null), []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  
  const registerHandler = async () => {
    try {
      setLoading(true);
      const { data } = await onRegisterUser(form);
      setLoading(false);
      message(data.message);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
    setForm({
      email: "",
      password: "",
    });
  };

  const loginHandler = async () => {
    try {
      setLoading(true);
      const { data } = await onLoginUser(form);
      setLoading(false);
      auth.login(data.token, data.useId);
      history.push("/create");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  React.useEffect(() => {
    window.M.updateTextFields();
  }, []);
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              onClick={loginHandler}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}>
              Войти
            </button>
            <button
              disabled={loading}
              onClick={registerHandler}
              className="btn grey lighten-1 black-text">
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
