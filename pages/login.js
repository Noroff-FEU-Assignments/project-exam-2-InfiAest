import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import LoginForm from "../components/forms/login/LoginForm";

export default function Login() {
  return (
    <Layout>
      <Head title="Holidaze Login" />

      <div className="container">
        <h1>Login page</h1>
        <LoginForm />
      </div>
    </Layout>
  );
}
