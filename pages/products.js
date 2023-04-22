import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";
import { CssBaseline, GeistProvider, Link, Table } from "@geist-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  const { themeType } = useTheme();
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <div
            className={`${themeType === "light" ? "text-black" : "text-white"}`}
          >
            <Link href={"/products/new"}>Add new product.</Link>
          </div>
          <Table data={products}>
            <Table.Column prop="title" label="title" />
            <Table.Column prop="description" label="description" />
            <Table.Column prop="price" label="price" />
          </Table>
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
