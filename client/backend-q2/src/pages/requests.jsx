import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
function Requests() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/requests", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        navigate("/login");
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, [navigate]);
  const handleLogout = () => {
    const logout = async () => {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
    };
    logout();
  };
  return (
    <>
      <div className="requests-form">
        <h1>Заявки с формы</h1>
        <button onClick={handleLogout}>Выйти из аккаунта</button>
        <table>
          <thead>
            <tr>
              <th>Дата отправки</th>
              <th>ФИО</th>
              <th>Номер телефона</th>
              <th>Проблема</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((request, index) => (
                <tr key={index}>
                  <td>{request.date}</td> <td>{request.author}</td>{" "}
                  <td>{request.phone}</td> <td>{request.text}</td>{" "}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Requests;
