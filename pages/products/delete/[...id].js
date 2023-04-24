import Layout from "@/components/Layout";
import {
  Button,
  CssBaseline,
  GeistProvider,
  Spacer,
  Text,
} from "@geist-ui/core";
import { useRouter } from "next/router";
import { useAppTheme } from "@/contexts/ThemeContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const { themeType } = useAppTheme();
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  function goBack() {
    router.push("/products");
  }

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <Text
            style={{ color: `${themeType === "light" ? "black" : "white"}` }}
            h3
          >
            Do you really want to delete {productInfo?.title}?
          </Text>
          <Spacer h={2} />
          <div className="flex flex-row">
            <Button type="secondary" ghost scale={0.75} onClick={deleteProduct}>
              Yes
            </Button>
            <Spacer w={10} />
            <Button type="warning" ghost scale={0.75} onClick={goBack}>
              No
            </Button>
          </div>
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
