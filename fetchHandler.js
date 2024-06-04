export const getAll = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/events')
        const data = await res.json()
        return data
    }catch(err){
        console.error({message: err})
    }
}

export const updateOne = async (eventId, uid) => {
    try {
        const res = await fetch(`http://localhost:3000/api/events/${eventId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid })
        });
        const updated = await res.json();
        if (!res.ok) {
            throw new Error(updated.message || 'Something went wrong');
        }
        return updated;
    } catch (err) {
        console.error({ message: err.message });
        throw err;
    }
};
