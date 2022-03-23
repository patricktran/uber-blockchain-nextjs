// https://github.com/htunnicliff/next-api-middleware/blob/canary/EXAMPLES.md
// api middlewares in NextJS do not work the same as in ExpressJS
// thus, we are adding "next-api-middleware" to help make things easie
// otherwise, we would need to create a wrapper: https://jasonwatmore.com/post/2021/08/20/next-js-api-add-middleware-to-api-routes-example-tutorial
import { use } from "next-api-middleware";

const captureErrors = async (req, res, next) => {
  try {
    // Catch any errors that are thrown in remaining
    // middleware and the API route handler
    await next();
  } catch (error) {
    res.status(500).send({
      message: "error",
      error: error.message,
    });
  }
};

export const withErrorMiddleware = use(captureErrors);
