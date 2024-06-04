import { useAuth } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

function Modal({ event, onClose, onBook }) {

    const { user, userId} = useAuth();
    const [ isBooked, setIsBooked ] = useState(false)
    const [ isFullyBooked, setIsFullyBooked ] = useState(false)

    const handleBook = () => {
        onBook(event.id);
    };
    const cancelBooking = () => {
        onBook(event.id);
    }

    useEffect(() => {
        if(event.attendees.includes(userId)){
            setIsBooked(true)
        }
        else{
            setIsBooked(false)
        }
    },[event])

    useEffect(() => {
        if(event.seats === 0){
            setIsFullyBooked(true)
        }else{
            setIsFullyBooked(false)
        }
        },[event])

    return (
        <div className="modal">
            <div className="modal-grid">
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                {isBooked ? <button onClick={cancelBooking}>CANCEL BOOKING</button> : <button onClick={handleBook}>BOOK</button>}
                <button onClick={onClose}>Close</button>
                {isBooked ? <p>YOU HAVE BOOKED THIS EVENT</p> : null}
                {isFullyBooked ? <p>THIS EVENT IS FULLY BOOKED</p> : null}
            </div>
        </div>
    );
}

export default Modal;