import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { CssBaseline, GeistProvider, useTheme } from "@geist-ui/core";

export default function NewProduct() {
  const { themeType } = useTheme();
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <ProductForm />
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
