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
    const [sortBy, setSortBy] = useState('name')

    const toggleSort = () => {
        setSortBy(sortBy === 'name' ? 'date' : 'name');
    };

    // GET ALL EVENTS
    useEffect(() => {
        getAll().then(data => setData(data))
    },[isLoaded])

    // MODL FUNCTIONALTY
    const modalHandler = (event) => {
        setEvent(event)
        setShowModal(true)
        router.push(`dashboard/?eventId=${event.id}`, undefined, { shallow: true });
    }
    const modalClose = () => {
        setShowModal(false)
        router.push(`dashboard`, undefined, { shallow: true });
    }

    // HANDLERS 
    
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
                <button onClick={toggleSort}>
                    ORDER BY {sortBy.toUpperCase()}
                </button>
                {data &&
                    data
                        .slice()
                        .sort((a, b) =>
                            sortBy === 'date'
                                ? new Date(a.date) - new Date(b.date)
                                : a.name.localeCompare(b.name)
                        )
                        .filter(event => new Date(event.date) > new Date())
                        .map(event => (
                            <li key={event.id}>
                                <div>
                                    <h3>{event.name}</h3>
                                    <p>
                                        AVAILABLE SPOTS: {event.seats - event.attendees.length}
                                    </p>
                                    <p>DATE: {event.date}</p>
                                    <button onClick={() => modalHandler(event)}>
                                        View
                                    </button>
                                </div>
                            </li>
                        ))}
            </ul>
    {showModal && <Modal 
    event={event} 
    onClose={modalClose} 
    onBook={handleBookEvent} 
    onCancel={cancelBookEvent} />}
  </>

  }

export default ListEvents
