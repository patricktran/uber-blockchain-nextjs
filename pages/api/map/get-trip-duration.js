import { withErrorMiddleware } from "../middleware";

/**
 * Get trip duration (accounting for traffic) for helping to calculate basePrice
 */
const getTripDuration = async (req, res) => {
  const mapBoxUrl = `${process.env.MAPBOX_DIRECTIONS_API_URL}/${req.body.pickupCoordinates};${req.body.dropoffCoordinates}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

  const response = await fetch(mapBoxUrl);
  const data = await response.json();

  res.status(200).send({
    message: "success",
    data: data.routes[0].duration,
  });
};

export default withErrorMiddleware(getTripDuration);
