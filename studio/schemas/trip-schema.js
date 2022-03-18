export const tripSchema = {
  name: "trips",
  type: "document",
  title: "Trips",
  fields: [
    {
      name: "dropoff",
      title: "Drop off",
      type: "string",
    },
    {
      name: "pickup",
      title: "Pick up",
      type: "string",
    },
    {
      name: "rideCategory",
      title: "Trip type",
      type: "string",
    },
    {
      name: "price",
      title: "Trip price",
      type: "number",
    },
    {
      name: "rideTimestamp",
      title: "Ride timestamp",
      type: "datetime",
    },
    {
      name: "passenger",
      title: "Passenger",
      type: "reference",
      to: [{ type: "users" }],
    },
  ],
};

//https://www.sanity.io/help/schema-reference-to-invalid
