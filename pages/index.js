import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Head title="Holidaze home" />

      <div className="container">
        <h1>Home page</h1>
      </div>
    </Layout>
  );
}
