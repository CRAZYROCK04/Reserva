"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [reservations, setReservations] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect (() => {
    const savedReservations = JSON.parse (localStorage.getItem ("reservations")) || [];
    setReservations (savedReservations);
  },[]);

  const addReservation = () => {
    const newReservation = {
      id: reservations.length + 1,
      name,
      date,
    };
    const updatedReservations = [...reservations,newReservation]
    setReservations(updatedReservations);
    localStorage.setItem ("reservations", JSON.stringify (updatedReservations));
    setName("");
    setDate("");
  };

  return (
    <div>
      <h1>Sistema de reservas</h1>
      <h2>Crear una nueva reserva</h2>
      <input type="text" placeholder="nombre" value={name} onChange={(e) => setName(e.target.value)}></input>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
      <button onClick={addReservation}>Añadir reserva</button>

      <h2>Reservas activas</h2>
      <ul>
        {reservations.map((res) => (
          <li key={res.id}>
            <Link href={`/reservation/?id=${res.id}`}>
              {res.name} - {res.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
