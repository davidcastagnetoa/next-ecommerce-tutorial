import { useAppTheme, useTheme } from "@/contexts/ThemeContext";
import {
  Button,
  CssBaseline,
  GeistProvider,
  Input,
  Modal,
  Spacer,
  Spinner,
  Text,
  Textarea,
} from "@geist-ui/core";
import { useState } from "react";
import { Box, DollarSign } from "@geist-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { FaFileUpload } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImage] = useState(existingImages || []);
  const [goToProducts, setToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { themeType } = useAppTheme();
  const textColor = themeType === "light" ? "#111" : "#fff";
  const typeColor = themeType === "light" ? "default" : "secondary";
  const [error, setError] = useState("");
  const [state, setState] = useState(false);
  const closeHandler = (event) => {
    setState(false);
  };

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

  async function saveProduct(event) {
    event.preventDefault();
    const data = { title, description, price, images };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create
      await axios.post("/api/products", data);
    }
    setToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(event) {
    console.log(event);
    const files = event.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const response = await axios.post("/api/upload", data);
      setImage((oldImages) => {
        return [...oldImages, ...response.data.links];
      });
      setIsUploading(false);
    }
  }

  function uploadImagesOrder(images) {
    setImage(images)
  }

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <form onSubmit={saveProduct}>
          <Spacer h={0.5} />

          {/* Name Product */}
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

          {/* Pictures Product */}
          <Text
            style={{ color: `${themeType === "light" ? "black" : "white"}` }}
            small
          >
            Photos
          </Text>
          <div className="flex flex-wrap gap-1">
            <ReactSortable list={images} setList={uploadImagesOrder} className='flex flex-wrap gap-1'>
              {!!images?.length &&
                images.map((link) => (
                  <div key={link} className="">
                    <img
                      src={link}
                      className="w-32 h-32 object-cover rounded-lg"
                      alt=""
                    />
                  </div>
                ))}
            </ReactSortable>
            {isUploading && (
              <div className="flex w-32 h-32 justify-center items-center">
                <Spinner />
              </div>
            )}
            <label
              className={`${
                themeType === "light"
                  ? "text-black bg-white hover:border-black"
                  : "text-[#888888] bg-black border-[#888888] hover:border-white hover:text-white"
              } w-32 h-32 text-center cursor-pointer flex items-center border rounded-md justify-center gap-1`}
            >
              <FaFileUpload size={22} /> Upload
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadImages}
              />
            </label>
            {!images?.length && (
              <Text
                style={{
                  color: `${themeType === "light" ? "black" : "white"}`,
                }}
              >
                No photos in this product
              </Text>
            )}
          </div>

          {/* Description Product */}
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

          {/* Price Product */}
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
