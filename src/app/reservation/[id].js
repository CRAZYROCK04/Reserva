"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "../styles.css";

export default function reservationDetail() {
    const router = useRouter();
    const searchParams = useSearchParams ();
    const id = searchParams.get ("id")
    const [reservation, setReservation] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        console.log ("router id", id);
        if (!id) return;
        const savedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
        const foundReservation = savedReservations.find(res => res.id === parseInt(id));
        if (foundReservation) {
            setReservation(foundReservation);
            setName(foundReservation.name);
            setDate(foundReservation.date);
        }
    }, [id]);

    const cancelReservation = () => {
        const savedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
        const updatedReservations = savedReservations.filter(res => res.id !== parseInt(id));
        localStorage.setItem("reservations", JSON.stringify(updatedReservations));
        router.push("/");
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const saveEdit = () => {
        const savedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
        const updatedReservations = savedReservations.map(res => res.id === reservation.id ? { ...res, name, date } : res);
        localStorage.setItem("reservations", JSON.stringify(updatedReservations));
        setReservation({ ...reservation, name, date });
        setIsEditing(false);
    };

    if (!reservation) return <p>Cargando</p>;

    return (
        <div>
            <h1>Detalles Reserva</h1>
            {isEditing ? (
                <div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                    <button onClick={saveEdit}>Guardar</button>
                    <button onClick={toggleEditMode}>Cancelar</button>
                </div>

            ) : (
                <div>
                    <p>Nombre: {reservation.name}</p>
                    <p>Fecha: {reservation.date}</p>
                    <button onClick={toggleEditMode}>Editar Reserva</button>
                    <button onClick={cancelReservation}>Cancelar Reserva</button>
                </div>
            )}

        </div>
    );
}