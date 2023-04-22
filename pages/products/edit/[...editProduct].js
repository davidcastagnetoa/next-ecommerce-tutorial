import Layout from "@/components/Layout";
import { CssBaseline, GeistProvider, useTheme } from "@geist-ui/core";

export default function EditProductPage() {
  const { themeType } = useTheme();
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>edit product form here</Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
