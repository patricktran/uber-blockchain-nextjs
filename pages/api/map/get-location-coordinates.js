import { withErrorMiddleware } from "../middleware";

const getLocationCoordinates = async (req, res) => {
  const mapBoxUrl = `${process.env.MAPBOX_PLACES_API_URL}/${req.body.location}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
  const response = await fetch(mapBoxUrl);
  const data = await response.json();

  //this happens from mapbox
  if (data.message === "Forbidden") throw new Error("Forbidden");

  res.status(200).send({
    message: "success",
    data: data.features[0].center,
  });
};

export default withErrorMiddleware(getLocationCoordinates);
