import { findEventById, getAllLocations } from "@/server/actions/events";
// import EditEventForm from "./EditEventForm";
import EditEventForm from "../_components/EditEventForm";
const Page = async ({ params }) => {
  const { event_id: eventId } = params;

  // Fetch the event data and locations
  const eventResponse = await findEventById({ id: eventId });
  const locationResponse = await getAllLocations();

  if (!eventResponse.success) {
    return <div>Error fetching event: {eventResponse.err}</div>;
  }

  if (!locationResponse.success) {
    return <div>Error fetching locations: {locationResponse.err}</div>;
  }

  const singleEvent = eventResponse.data[0];
  const locations = locationResponse.data;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-8 px-4 overflow-auto w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Event</h1>
      <EditEventForm singleEvent={singleEvent} locations={locations} />
    </div>
  );
};

export default Page;
