import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { get } from "../lib/axios";

interface TripDetailsProps {
  onSuccessCallback: () => void;
  tripId: string;
}

const TripDetails: React.FC<TripDetailsProps> = ({
  onSuccessCallback,
  tripId,
}) => {
  const [retryCount, setRetryCount] = useState(0);
  const [trip, setTrip] = useState();

  useEffect(() => {
    const fetchTrip = async () => {
      get(`/trips/${tripId}`, {}).then((response) => {
        if (response.data.itineraries?.length > 0) {
          clearInterval(intervalId);
          setTrip(response.data);
          onSuccessCallback();
        } else if (retryCount < 10) {
          setRetryCount((prev) => prev + 1);
        }
      });
    };

    const intervalId = setInterval(fetchTrip, 3000);

    return () => clearInterval(intervalId);
  }, [tripId]);

  return (
    <div className="flex justify-center">
      {trip && (
        <Carousel className="w-full">
          <CarouselContent>
            {(trip as any).itineraries.map((itinerary: any, index: number) => (
              <CarouselItem key={itinerary._id}>
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>{`Option ${index + 1}`}</CardTitle>
                      <CardDescription>{itinerary.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6"></CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default TripDetails;
