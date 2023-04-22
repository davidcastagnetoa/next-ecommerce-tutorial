import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";
import { Button, Input, Modal, Spacer, Text, Textarea } from "@geist-ui/core";
import { useEffect, useState } from "react";
import { Box, DollarSign } from "@geist-ui/icons";
import axios from "axios";

export default function NewProduct() {
  const { themeType } = useTheme();
  const textColor = themeType === "light" ? "#111" : "#fff";
  const typeColor = themeType === "light" ? "default" : "secondary";
  const [error, setError] = useState("");
  const [state, setState] = useState(false);
  const closeHandler = (event) => {
    setState(false);
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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
    }
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <Text
          style={{ color: `${themeType === "light" ? "black" : "white"}` }}
          h4
        >
          New Product.
        </Text>
        <Spacer h={0.5} />
        <Text
          style={{ color: `${themeType === "light" ? "black" : "white"}` }}
          small
        >
          Name
        </Text>
        <Input
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
    </Layout>
  );
}
