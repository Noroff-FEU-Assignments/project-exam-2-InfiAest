import Head from "../components/layout/general/Head";
import Layout from "../components/layout/general/Layout";
import LoginForm from "../components/forms/login/LoginForm";

export default function Login() {
  return (
    <Layout>
      <Head
        title="Holidaze | Login"
        description="Book a hotel, apartment or house in Bergen for your Holidaze."
      />

      <div className="container">
        <h1>Login page</h1>
        <LoginForm />
      </div>
    </Layout>
  );
}
