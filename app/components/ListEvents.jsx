'use client'

import { getAll, updateOne } from "@/fetchHandler"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import Modal from "./Modal"

function ListEvents() {

    const [showModal, setShowModal] = useState(false)
    const [event, setEvent] = useState([])
    const router = useRouter();
    const { isLoaded, userId, user } = useAuth()

    const [ data, setData ] = useState([])
    const [ error, setError ] = useState(null)
    
    useEffect(() => {
        getAll().then(data => setData(data))
    },[isLoaded])

    const modalHandler = (event) => {
        setEvent(event)
        setShowModal(true)
        router.push(`dashboard/?eventId=${event.id}`, undefined, { shallow: true });
    }
    const modalClose = () => {
        setShowModal(false)
        router.push(`dashboard`, undefined, { shallow: true });
    }
    
    const handleBookEvent = async (eventId) => {
        try {
            const updatedEvent = await updateOne(eventId, userId);
            setEvent(updatedEvent);
            setData(prevData => prevData.map(event => event.id === updatedEvent.id ? updatedEvent : event));
        } catch (err) {
            console.error({message: err})
        }
    }

    const cancelBookEvent = async (eventId) => {
        try {
            const updatedEvent = await updateOne(eventId, userId);
            setEvent(updatedEvent);
            setData(prevData => prevData.map(event => event.id === updatedEvent.id ? updatedEvent : event));
        } catch (err) {
            console.error({message: err})
        }
    }

  return <>
    <h2>EVENTS</h2>
    <ul>
        {data && data.map(event => {
            return <li key={event.id}>
                <div>
                    <h3>
                    {event.name}
                    </h3>
                    <p>AVAILABLE SPOTS: {event.seats}</p>
                    <button onClick={() => modalHandler(event)}>View</button>
                    
                </div>
            </li>
        }
        )}
    </ul>
    {showModal && <Modal 
    event={event} 
    onClose={modalClose} 
    onBook={handleBookEvent} 
    onCancel={cancelBookEvent} />}
  </>

  }

export default ListEvents
