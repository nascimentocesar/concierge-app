import React from "react";
import FlightDetails from "./flightDetails";

interface ItineraryDetailsProps {
  itinerary: any;
  trip: any;
}

const ItineraryDetails: React.FC<ItineraryDetailsProps> = ({
  itinerary,
  trip,
}) => {
  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {itinerary.title}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {itinerary.summary}
      </p>

      <div className="mt-8">{<FlightDetails trip={trip} />}</div>
    </>
  );
};

export default ItineraryDetails;
