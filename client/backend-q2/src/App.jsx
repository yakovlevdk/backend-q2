import { useState } from "react";
import "./App.css";
function App() {
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const handleAddRequest = (e) => {
    e.preventDefault();
    const addNewRequest = async () => {
      const date = new Date();
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      try {
        const data = {
          author: fio,
          text: problem,
          phone: phone,
          date: formattedDate,
        };
        if (data) {
          await fetch("http://localhost:3000/requests", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }
      } catch (error) {
        console.error("Ошибка добавления запроса:", error);
      }
    };
    addNewRequest();
  };
  return (
    <>
      <div className="form">
        <h1>Запись к врачу</h1>
        <form onSubmit={handleAddRequest}>
          <input
            type="text"
            placeholder="ФИО"
            value={fio}
            onChange={(e) => setFio(e.target.value)}
          />
          <input
            type="text"
            placeholder="Номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Опишите вашу проблему"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
          <button type="submit">Отправить</button>
        </form>
      </div>
    </>
  );
}

export default App;
