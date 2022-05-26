import Head from "../components/layout/general/Head";
import Layout from "../components/layout/general/Layout";
import ImageHead from "../components/imageHead/ImageHead";
import SearchForm from "../components/forms/search/SearchForm";
import Heading from "../components/layout/headings/Heading";
import InspoTiles from "../components/inspirationCards/InspoTiles";
import InspoCard from "../components/inspirationCards/InspoCard";
import Subscribe from "../components/subscribe/Subscribe";
import PageContainer from "../components/layout/general/PageContainer";

export default function Home() {
  return (
    <Layout>
      <Head
        title="Holidaze | Home"
        description="Book a hotel, apartment or house in Bergen for your Holidaze."
      />
      <ImageHead />
      <SearchForm />
      <PageContainer>
        <Heading size="1" content="Need some inspiration?" />
        <InspoTiles />
        <InspoCard />
      </PageContainer>
      <Subscribe />
    </Layout>
  );
}
