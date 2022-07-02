import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function Home(props) {
  const { products } = props;

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonDate = await fs.readFile(filePath);
  const data = JSON.parse(jsonDate);

  if (!data) {
    // if no data, return a nodata page
    return {
      redirect: {
        destination: "/nodata",
      },
    };
  }
  if (data.products.length === 0) {
    // if no products, return a 404 page
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default Home;
