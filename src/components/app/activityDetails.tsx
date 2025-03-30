import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ActivityDetailsProps {
  activities: any;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activities }) => {
  return (
    <div className="grid gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Starts at</TableHead>
            <TableHead>Estimate duration</TableHead>
            <TableHead>Estimate cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{activity.name}</TableCell>
              <TableCell>
                <div className="whitespace-normal break-words">
                  {activity.description}
                </div>
              </TableCell>
              <TableCell>{activity.startsAt}</TableCell>
              <TableCell>{activity.estimateDuration}</TableCell>
              <TableCell>{activity.estimateCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total estimate cost</TableCell>
            <TableCell>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                activities.reduce((acc: number, activity: any) => {
                  return acc + activity.estimateCost;
                }, 0)
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ActivityDetails;
