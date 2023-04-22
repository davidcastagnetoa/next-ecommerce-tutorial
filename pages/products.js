import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "@geist-ui/core";

export default function Products() {
  const { themeType } = useTheme();
  return (
    <Layout>
      <div className={`${themeType === "light" ? "text-black" : "text-white"}`}>
        <Link href={"/products/new"} themeType={themeType}>Add new product.</Link>
      </div>
    </Layout>
  );
}
