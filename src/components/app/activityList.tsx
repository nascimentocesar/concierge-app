import React from "react";
import FlightDetails from "./flightDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ActivityDetails from "./activityDetails";

interface ActivityListProps {
  itinerary: any;
}

const ActivityList: React.FC<ActivityListProps> = ({ itinerary }) => {
  const groupedActivities = React.useMemo(() => {
    return itinerary.activities
      .sort(
        (a: any, b: any) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
      )
      .reduce((acc: Record<string, any[]>, activity: any) => {
        const dateKey = new Date(activity.startsAt).toISOString().split("T")[0];
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(activity);
        return acc;
      }, {});
  }, [itinerary.activities]);

  return (
    <div className="grid gap-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Activities list
      </h4>
      <Tabs defaultValue={`tab-0`} className="w-full">
        <TabsList className="w-full">
          {Object.keys(groupedActivities).map((key: string, index: number) => (
            <TabsTrigger key={key} value={`tab-${index}`}>
              {key}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.keys(groupedActivities).map((key: string, index: number) => (
          <TabsContent
            key={key}
            value={`tab-${index}`}
            className="w-full pt-10"
          >
            <ActivityDetails activities={groupedActivities[key]} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ActivityList;
