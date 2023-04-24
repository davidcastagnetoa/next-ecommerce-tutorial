/**
 * This is a server-side function that handles GET and POST requests for a product API using Mongoose
 * and returns product data.
 * @param req - The request object, which contains information about the incoming HTTP request, such as
 * the request method, headers, and body.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `json()` to send a JSON response, `send()` to send a plain
 * text response, and `status()` to set the HTTP status code of the response.
 */
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query?.id }));
    } else {
      res.json(await Product.find());
    }
    res.json(await Product.find());
  }

  if (method === "POST") {
    const { title, description, price } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
    });
    res.json(productDoc);
  }
}
