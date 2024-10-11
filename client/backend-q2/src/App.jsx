import { useState } from "react";
import "./App.css";
function App() {
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [access, setAccess] = useState(false);
  const handleAddRequest = (e) => {
    e.preventDefault();
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    if (!fio || !phone) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    try {
      const data = {
        author: fio,
        text: problem,
        phone: phone,
        date: formattedDate,
      };
      if (data) {
        fetch("http://localhost:3000/requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(() => {
          setFio("");
          setPhone("");
          setProblem("");
          setAccess(() => true);
          setTimeout(() => {
            setAccess(() => false);
          }, 3000);
        });
      }
    } catch (error) {
      console.error("Ошибка добавления запроса:", error);
      setAccess(() => false);
    }
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
      {access && <h5>Успешная отправка</h5>}
    </>
  );
}

export default App;
