import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { useAppTheme } from "@/contexts/ThemeContext";
import { CssBaseline, GeistProvider, Text } from "@geist-ui/core";

export default function NewProduct() {
  const { themeType } = useAppTheme();
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <Text
            style={{ color: `${themeType === "light" ? "black" : "white"}` }}
            h4
          >
            New Product.
          </Text>
          <ProductForm />
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
