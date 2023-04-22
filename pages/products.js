import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";

export default function Products() {
  const { themeType } = useTheme();
  return (
    <Layout>
      <div className={`${themeType === "light" ? "text-black" : "text-white"}`}>
        products
      </div>
    </Layout>
  );
}
