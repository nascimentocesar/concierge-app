import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { get } from "../../lib/axios";

interface TripHistoryProps {
  onSelectCallback: (trip: any) => void;
}

const TripHistory: React.FC<TripHistoryProps> = ({ onSelectCallback }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tripList, setTripList] = useState<any[]>([]);

  useEffect(() => {
    get("/trips", {}).then((response) => {
      setTripList(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Show trips history</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Trips history</SheetTitle>
          <SheetDescription>
            Here you can access your previous trip recommendations and their
            details.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full">
          {!isLoading &&
            tripList.map((trip) => (
              <div key={trip._id} className="grid p-4">
                <p className="text-sm text-muted-foreground">Provided prompt</p>
                <p>{trip.prompt}</p>
                <SheetClose asChild>
                  <Button
                    className=" mt-6 mb-8"
                    variant="outline"
                    onClick={() => onSelectCallback(trip)}
                  >
                    View trip details
                  </Button>
                </SheetClose>
                <Separator />
              </div>
            ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default TripHistory;
