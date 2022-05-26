import Head from "../components/layout/general/Head";
import Layout from "../components/layout/general/Layout";
import LoginForm from "../components/forms/login/LoginForm";
import Heading from "../components/layout/headings/Heading";
import PageContainer from "../components/layout/general/PageContainer";

export default function Login() {
  return (
    <Layout>
      <Head
        title="Holidaze | Login"
        description="Book a hotel, apartment or house in Bergen for your Holidaze."
      />

      <PageContainer>
        <Heading size="1" content="Login" customClass="login__header" />
        <LoginForm />
      </PageContainer>
    </Layout>
  );
}
