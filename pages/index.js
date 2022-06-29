import fs from "fs/promises";
import path from "path";

function Home(props) {
  const { products } = props;
  console.log(products);
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonDate = await fs.readFile(filePath);
  const data = JSON.parse(jsonDate);
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default Home;
