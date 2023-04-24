import { useAppTheme, useTheme } from "@/contexts/ThemeContext";
import {
  CssBaseline,
  GeistProvider,
  Input,
  Modal,
  Spacer,
  Text,
  Textarea,
} from "@geist-ui/core";
import { useState } from "react";
import { Box, DollarSign } from "@geist-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  console.log(`The _id is : ${_id}`);
  console.log({_id});
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const router = useRouter();
  const { themeType } = useAppTheme();
  const textColor = themeType === "light" ? "#111" : "#fff";
  const typeColor = themeType === "light" ? "default" : "secondary";
  const [error, setError] = useState("");
  const [state, setState] = useState(false);
  const closeHandler = (event) => {
    setState(false);
  };
  const [goToProducts, setToProducts] = useState(false);

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (value == "" || /^[0-9]+$/.test(value)) {
      setPrice(value);
      setState(false);
      setError("");
    } else {
      setState(true);
      setError("Please enter a numeric value!");
    }
  };

  async function createProduct(event) {
    event.preventDefault();
    if (typeof window !== "undefined") {
      const data = { title, description, price };
      await axios.post("/api/products", data);
      setToProducts(true);
    }
  }

  if (goToProducts) {
    router.push("/products");
  }

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <form onSubmit={createProduct}>
          <Spacer h={0.5} />
          <Text
            style={{ color: `${themeType === "light" ? "black" : "white"}` }}
            small
          >
            Name
          </Text>
          <Input
            required
            clearable
            icon={<Box color={themeType === "light" ? "black" : "white"} />}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            placeholder="New Product"
            style={{
              color: textColor,
            }}
            type={typeColor}
            value={title}
            width="100%"
          />
          <Spacer h={0.5} />
          <Text
            style={{ color: `${themeType === "light" ? "black" : "white"}` }}
            small
          >
            Description
          </Text>
          <Textarea
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            placeholder="Please enter a description."
            style={{
              color: textColor,
            }}
            type={typeColor}
            value={description}
            width="100%"
          />
          <Spacer h={0.5} />
          <Text
            style={{ color: `${themeType === "light" ? "black" : "white"}` }}
            small
          >
            Price
          </Text>
          <Input
            clearable
            required
            icon={
              <DollarSign color={themeType === "light" ? "black" : "white"} />
            }
            value={price}
            onChange={handlePriceChange}
            placeholder="Price"
            style={{
              color: textColor,
            }}
            type={typeColor}
            width="100%"
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Save
          </button>
        </form>
        <Modal visible={state} onClose={closeHandler}>
          <Modal.Title>Warning!</Modal.Title>
          <Modal.Subtitle>{error}</Modal.Subtitle>
          <Modal.Action passive onClick={() => setState(false)}>
            Cancel
          </Modal.Action>
        </Modal>
      </CssBaseline>
    </GeistProvider>
  );
}
