import fs from "fs/promises";
import path from "path";

function ProductDetailsPage(props) {
  const { selectedProduct } = props;

  if (!selectedProduct) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>{selectedProduct.title}</h2>
      <p>{selectedProduct.description}</p>
    </>
  );
}

async function getdata() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonDate = await fs.readFile(filePath);
  const data = JSON.parse(jsonDate);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid; // get the product id from the url (file Name is the product id)
  const data = await getdata();
  const product = data.products.find((product) => product.id === productId);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      selectedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getdata(); // get the data from the dummy-backend.json
  const ids = data.products.map((product) => product.id); // get all product ids
  const pathWithParams = ids.map((id) => ({ params: { pid: id } })); // create a path for each product
  return {
    paths: pathWithParams,
    fallback: true,
  };
}

export default ProductDetailsPage;
