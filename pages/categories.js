import Layout from "@/components/Layout";
import { useAppTheme } from "@/contexts/ThemeContext";
import {
  Button,
  CssBaseline,
  GeistProvider,
  Input,
  Spacer,
  Table,
  Text,
} from "@geist-ui/core";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
  const { themeType } = useAppTheme();
  const textColor = themeType === "light" ? "#111" : "#fff";
  const typeColor = themeType === "light" ? "default" : "secondary";
  const [name, setName] = useState("");
  async function saveCategory(event) {
    event.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
  }
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <Text h1>Categories</Text>
          {/* Name Product */}
          <Text
            style={{ color: `${themeType === "light" ? "black" : "white"}` }}
            small
          >
            Category name
          </Text>
          <Spacer />
          <form onSubmit={saveCategory} className="flex items-center">
            <Input
              placeholder="Category name"
              style={{
                color: textColor,
              }}
              type={typeColor}
              width="100%"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <Spacer w={1} />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Save
            </button>
          </form>
          <Spacer h={1} />
          <Table>
            <Table.Column prop="Category Name" label="Category Name" />
          </Table>
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}

// Link={href={'/products/'+products.id}}
