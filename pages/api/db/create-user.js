import sanityClient from "../../../utils/clients/sanity";
import { withErrorMiddleware } from "../middleware";

const createUserInSanity = async (req, res) => {
  const userDoc = {
    _type: "users",
    _id: req.body.userWalletAddress,
    name: req.body.name,
    walletAddress: req.body.userWalletAddress,
  };

  await sanityClient.createIfNotExists(userDoc);

  res.status(200).send({
    message: "success",
  });
};

export default withErrorMiddleware(createUserInSanity);
