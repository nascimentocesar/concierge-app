import React from "react";
import FlightDetails from "./flightDetails";
import ActivityList from "./activityList";

interface ItineraryDetailsProps {
  itinerary: any;
  trip: any;
}

const ItineraryDetails: React.FC<ItineraryDetailsProps> = ({
  itinerary,
  trip,
}) => {
  const totalEstimateCost = React.useMemo(() => {
    const activitiesCost = itinerary.activities.reduce(
      (acc: number, activity: any) => {
        return acc + activity.estimateCost;
      },
      0
    );

    return (
      trip.departureFlight.price + trip.returnFlight.price + activitiesCost
    );
  }, [itinerary]);

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {itinerary.title}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {itinerary.summary}
      </p>
      <div className="mt-8">{<FlightDetails trip={trip} />}</div>
      <div className="mt-8">{<ActivityList itinerary={itinerary} />}</div>
      <div className="mt-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Total estimate cost
        </h4>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {`The estimate cost for this option is ${new Intl.NumberFormat(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          ).format(totalEstimateCost)} considering the flights and activities.`}
        </p>
      </div>
    </>
  );
};

export default ItineraryDetails;
