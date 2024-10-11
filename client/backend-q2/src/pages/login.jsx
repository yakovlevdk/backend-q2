import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const login = async () => {
      const data = {
        email: email,
        password: password,
      };
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await response.json();
      if (result) {
        navigate("/requests");
      } else {
        const errorResponse = await response.json();
        console.error("Ошибка входа:", errorResponse);
      }
    };
    login();
  };
  return (
    <>
      <div className="login-form">
        <h1>Логин</h1>
        <form>
          <input
            type="text"
            placeholder="Электронная почта"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleLogin}>
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
