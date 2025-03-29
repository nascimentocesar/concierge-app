import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { get } from "../../lib/axios";

interface TripRecommendationsProps {
  onSuccessCallback: (trip: any) => void;
  trip: any;
}

const TripRecommendations: React.FC<TripRecommendationsProps> = ({
  onSuccessCallback,
  trip: defaultTrip,
}) => {
  const [retriesCount, setRetriesCount] = useState(0);
  const [trip, setTrip] = useState(defaultTrip);

  // useEffect(() => {
  //   const getTripUpdates = async () => {
  //     get(`/trips/${trip._id}`, {}).then((response) => {
  //       if (response.data.isComplete) {
  //         clearInterval(intervalId);
  //         setTrip(response.data);
  //       } else if (retriesCount < 10) {
  //         setRetriesCount((prev) => prev + 1);
  //       }
  //     });
  //   };

  //   const intervalId = setInterval(getTripUpdates, 3000);

  //   return () => clearInterval(intervalId);
  // }, [trip.isComplete]);

  return (
    <Tabs defaultValue="option-0">
      <TabsList className={`grid w-full grid-cols-${trip.itineraries.length}`}>
        {trip.itineraries.map((itinerary: any, index: number) => (
          <TabsTrigger key={itinerary._id} value={`option-${index}`}>
            {`Option ${index + 1}`}
          </TabsTrigger>
        ))}
      </TabsList>
      {trip.itineraries.map((itinerary: any, index: number) => (
        <TabsContent
          key={itinerary._id}
          value={`option-${index}`}
        ></TabsContent>
      ))}
    </Tabs>
  );
};

export default TripRecommendations;

// <div className="flex justify-center">
// {trip && (
//   <Carousel className="w-full">
//     <CarouselContent>
//       {(trip as any).itineraries.map((itinerary: any, index: number) => (
//         <CarouselItem key={itinerary._id}>
//           <div className="p-1">
//             <Card>
//               <CardHeader>
//                 <CardTitle>{`Option ${index + 1}`}</CardTitle>
//                 <CardDescription>{itinerary.summary}</CardDescription>
//               </CardHeader>
//               <CardContent className="flex aspect-square items-center justify-center p-6">
//                 <Accordion type="single" collapsible className="w-full">
//                   {itinerary.activities.map(
//                     (activity: any, index: number) => (
//                       <AccordionItem
//                         value={`item-${index}`}
//                         key={activity._id}
//                       >
//                         <AccordionTrigger>
//                           {activity.name}
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           {activity.description}
//                         </AccordionContent>
//                       </AccordionItem>
//                     )
//                   )}
//                 </Accordion>
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>
//       ))}
//     </CarouselContent>
//     <CarouselPrevious />
//     <CarouselNext />
//   </Carousel>
// )}
// </div>
