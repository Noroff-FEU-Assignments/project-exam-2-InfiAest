import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import ImageHead from "../components/imageHead/ImageHead";
import SearchForm from "../components/forms/search/SearchForm";
import Heading from "../components/layout/Heading";
import InspoTiles from "../components/inspirationCards/InspoTiles";
import InspoCard from "../components/inspirationCards/InspoCard";
import Subscribe from "../components/subscribe/Subscribe";

export default function Home() {
  return (
    <Layout>
      <Head title="Holidaze home" />
      <ImageHead />
      <SearchForm />
      <div className="container">
        <Heading size="1" content="Need some inspiration?" />
        <InspoTiles />
        <InspoCard />
      </div>
      <Subscribe />
    </Layout>
  );
}
