import sanityClient from "../../../utils/clients/sanity";
import { withErrorMiddleware } from "../middleware";

const query = `
*[_type=="rides"]{
    "service": title,
    "iconUrl": icon.asset->url,
    priceMultiplier,
    orderById
  }|order(orderById asc)
`;

const getRideTypes = async (req, res) => {
  const sanityResponse = await sanityClient.fetch(query);
  res.status(200).send({
    message: "success",
    data: sanityResponse,
  });
};

export default withErrorMiddleware(getRideTypes);
