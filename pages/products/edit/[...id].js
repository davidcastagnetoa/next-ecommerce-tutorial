import Layout from "@/components/Layout";
import { Text, GeistProvider, CssBaseline } from "@geist-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppTheme } from "@/contexts/ThemeContext";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const { themeType } = useAppTheme();
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  console.log(router);
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id='+id).then(response => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <Text
            style={{ color: `${themeType === "light" ? "black" : "white"}` }}
            h4
          >
            Edit Product.
          </Text>
          {productInfo && <ProductForm {...productInfo} />}
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
