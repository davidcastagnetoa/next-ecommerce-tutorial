import { Category } from "@/models/Category";

export default async function handle(request, response) {
  const { method } = request;

  if (method === "POST") {
    const { name } = request.body;
    const categoryDoc = await Category.create({ name });
    response.json(categoryDoc);
  }
}
