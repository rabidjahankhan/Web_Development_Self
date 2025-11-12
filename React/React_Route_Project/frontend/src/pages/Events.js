import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "React Beginners Workshop",
  },
  {
    id: "e2",
    title: "JavaScript Coding Challenge",
  },
  {
    id: "e3",
    title: "Fullstack Developer Meetup",
  },
  {
    id: "e4",
    title: "Frontend UI/UX Design Conference",
  },
  {
    id: "e5",
    title: "Node.js Backend Bootcamp",
  },
];

function EventsPage() {
  return (
    <>
      <h1>EventsPage</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
