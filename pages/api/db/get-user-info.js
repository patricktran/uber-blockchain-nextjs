import sanityClient from "../../../utils/clients/sanity";
import { withErrorMiddleware } from "../middleware";

const getUserInfo = async (req, res) => {
  const query = `
  *[_type == "users" && walletAddress=="${req.query.walletAddress}"]{
      name,
      walletAddress,
      "imageUrl": profileImage.asset->url
  }
`;

  const sanityResponse = await sanityClient.fetch(query);

  res.status(200).send({
    message: "success",
    data: sanityResponse[0],
  });
};

export default withErrorMiddleware(getUserInfo);
