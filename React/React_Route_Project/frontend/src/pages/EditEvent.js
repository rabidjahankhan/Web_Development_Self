import { useLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEventPage() {
    const data = useLoaderData();
    const event = data.event;
    return <EventForm event= {event}/>;
}

export default EditEventPage;