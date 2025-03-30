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

interface FlightDetailsProps {
  trip: any;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ trip }) => {
  return (
    <div className="grid gap-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Flights details
      </h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Flight</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Arrival</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trip.departureFlight.segments.map((segment: any, index: number) =>
            renderRow(index, "Outbound", segment)
          )}
          {trip.returnFlight.segments.map((segment: any, index: number) =>
            renderRow(index, "Return", segment)
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total price</TableCell>
            <TableCell>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(trip.departureFlight.price + trip.returnFlight.price)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default FlightDetails;

const renderRow = (index: number, type: string, segment: any) => {
  return (
    <TableRow key={index}>
      <TableCell>{`${segment.airline} ${segment.flightNumber}`}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{`${segment.duration} min`}</TableCell>
      <TableCell>{`${segment.departureAirportCode} - ${segment.departureDate}`}</TableCell>
      <TableCell>{`${segment.arrivalAirportCode} - ${segment.arrivalDate}`}</TableCell>
    </TableRow>
  );
};
