import { useState } from "react";
import "./index.css";

// const currentTime = new Date().toLocaleTimeString("uz-UZ", {
//   hour: "2-digit",
//   minute: "2-digit",
// });

const initialCards = [
  {
    id: "321520",
    status: "Новый",
    items: [
      "3x Big Gamburger",
      "1x Тамбмуггер",
      "Пабавы Масои Standard острыи",
    ],
    price: "15:22",
    total: "300560 сум",
  },
  {
    id: "321540",
    status: "Новый",
    items: ["3x Пленс 0.5", "1x Тамбмуггер", "Пабавы Масои Standard острыи"],
    price: "15:22",
    total: "300566 сум",
  },
  {
    id: "321560",
    status: "Новый",
    items: ["3x Пленс 0.5", "1x Тамбмуггер", "Пабавы Масои Standard острыи"],
    price: "15:22",
    total: "300566 сум",
  },
  {
    id: "321524",
    status: "Задержка",
    items: [
      "3x Big Gamburger",
      "1x Тамбмуггер",
      "Пабавы Масои Standard острыи",
    ],
    price: "15:22",
    total: "300560 сум",
  },
  {
    id: "321531",
    status: "Задержка",
    items: ["3x Пленс 0.5", "1x Тамбмуггер", "Пабавы Масои Standard острыи"],
    price: "15:22",
    total: "300566 сум",
  },
  {
    id: "321544",
    status: "Задержка",
    items: ["3x Пленс 0.5", "1x Тамбмуггер", "Пабавы Масои Standard острыи"],
    price: "15:22",
    total: "300566 сум",
  },
  {
    id: "321521",
    status: "Готов",
    items: [
      "3x Big Gamburger",
      "1x Тамбмуггер",
      "Пабавы Масои Standard острыи",
    ],
    price: "15:22",
    total: "300560 сум",
  },
  {
    id: "321543",
    status: "Готов",
    items: ["3x Пленс 0.5", "1x Тамбмуггер", "Пабавы Масои Standard острыи"],
    price: "15:22",
    total: "300566 сум",
  },
  {
    id: "321523",
    status: "Готов",
    items: ["3x Пленс 0.5", "1x Тамбмуггер", "Пабавы Масои Standard острыи"],
    price: "15:0",
    total: "300566 сум",
  },
  {
    id: "321532",
    status: "Куплен в пути",
    items: ["3x Пленс 0.5", "1x Тамбмуггер", "Пабавы Масои Standard острыи"],
    price: "15:22",
    total: "300560 сум",
  },
  {
    id: "321530",
    status: "Куплен в пути",
    items: ["1x Тамбмуггер C сыром без лука"],
    price: "15:22",
    total: "300560 сум",
  },
];

function App() {
  const [cards, setCards] = useState(initialCards);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData("cardId", cardId);
  };

  const handleDrop = (e, newStatus) => {
    const cardId = e.dataTransfer.getData("cardId");
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, status: newStatus } : card
    );
    setCards(updatedCards);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDelete = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
  };

  const filteredCards = cards.filter((card) => card.id.includes(searchTerm));

  const columns = ["Новый", "Задержка", "Готов", "Куплен в пути"];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Сегодня заказы</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Поиск по ID"
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded w-1/4"
        />
        <span className="ml-4">Всего: {filteredCards.length}</span>
        {/* <div className="flex items-center px-3 py-1 border rounded-md">
          <Clock className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium">{currentTime}</span>
        </div> */}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {columns.map((column) => (
          <div
            key={column}
            onDrop={(e) => handleDrop(e, column)}
            onDragOver={handleDragOver}
            className="bg-gray-100 p-4 rounded-lg min-h-[400px]"
          >
            <h2 className="text-lg font-semibold bg-green-500 text-white p-2 rounded">
              {column}
            </h2>
            {filteredCards
              .filter((card) => card.status === column)
              .map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card.id)}
                  className="bg-white p-4 mt-4 rounded shadow"
                >
                  <div className="flex justify-between">
                    <span>ID: {card.id}</span>
                    <span>{card.total}</span>
                  </div>
                  {card.items.map((item, index) => (
                    <p key={index} className="text-sm">
                      {item}
                    </p>
                  ))}
                  <p className="text-sm text-gray-500">{card.price}</p>
                  {column === "Новый" || column === "Задержка" ? (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="flex-1 px-3 py-2 text-red-500 bg-white border border-red-500 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center gap-1"
                      >
                        <span className="text-red-500">✕</span> Отменить
                      </button>

                      <button className="flex-1 px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                        <span className="text-white">✓</span> Принять
                      </button>
                    </div>
                  ) : column === "Готов" ? (
                    <button className="w-full mt-3 px-3 py-2 text-purple-700 bg-white border border-purple-500 rounded-md hover:bg-purple-50 transition-colors flex items-center justify-center gap-1">
                      Завершить
                    </button>
                  ) : null}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
