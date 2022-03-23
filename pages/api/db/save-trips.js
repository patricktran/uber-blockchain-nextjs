import sanityClient from "../../../utils/clients/sanity";
import { withErrorMiddleware } from "../middleware";

const saveTrips = async (req, res) => {
  const tripDoc = {
    _type: "trips",
    _id: `${req.body.userWalletAddress}-${Date.now()}`,
    pickup: req.body.pickupLocation,
    dropoff: req.body.dropoffLocation,
    rideTimestamp: new Date(Date.now()).toISOString(),
    price: parseFloat(req.body.price),
    rideCategory: req.body.selectedRide.service,
    passenger: {
      _key: `passenger-${req.body.userWalletAddress} - ${new Date(
        Date.now()
      ).toISOString()}`,
      _ref: req.body.userWalletAddress,
      _type: "reference",
    },
  };

  await sanityClient.createIfNotExists(tripDoc);
  res.status(200).send({
    message: "success",
  });
};

export default withErrorMiddleware(saveTrips);
