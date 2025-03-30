import React, { useEffect, useState } from "react";
import { get } from "../../lib/axios";
import ItineraryDetails from "./itineraryDetails";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface TripRecommendationsProps {
  onSuccessCallback: (data: any) => void;
  trip: any;
}

const TripRecommendations: React.FC<TripRecommendationsProps> = ({
  onSuccessCallback,
  trip: defaultTrip,
}) => {
  const [retriesCount, setRetriesCount] = useState(0);
  const [trip, setTrip] = useState(defaultTrip);

  useEffect(() => {
    const getTripUpdates = async () => {
      get(`/trips/${trip._id}`, {}).then((response) => {
        if (response.data.isComplete) {
          clearInterval(intervalId);
          setTrip(response.data);
          onSuccessCallback(response.data);
        } else if (retriesCount < 30) {
          setRetriesCount((prev) => prev + 1);
        }
      });
    };

    const intervalId = setInterval(getTripUpdates, 3000);

    return () => clearInterval(intervalId);
  }, [trip.isComplete]);

  return (
    <>
      {trip.isComplete ? (
        <Tabs defaultValue={`tab-0`} className="w-full">
          <TabsList className="w-full">
            {trip.itineraries.map((itinerary: any, index: number) => (
              <TabsTrigger key={itinerary._id} value={`tab-${index}`}>
                {`Option ${index + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
          {trip.itineraries.map((itinerary: any, index: number) => (
            <TabsContent
              key={itinerary._id}
              value={`tab-${index}`}
              className="w-full pt-10"
            >
              <ItineraryDetails trip={trip} itinerary={itinerary} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Skeleton className="h-[100px] w-full rounded-xl" />
      )}
    </>
  );
};

export default TripRecommendations;
