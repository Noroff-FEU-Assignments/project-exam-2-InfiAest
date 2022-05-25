import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../../../constants/api";
import { useRouter } from "next/router";
import { LOGIN_FORM_SCHEMA } from "../../../utils/formSchema/loginFormSchema";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";
import FormError from "../../messages/FormError";

const url = BASE_URL + TOKEN_PATH;

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LOGIN_FORM_SCHEMA),
  });

  const [, setAuth] = useContext(AuthContext);
  const router = useRouter();

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      setAuth(response.data);
      return router.push("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError(
        "There seems to be a problem logging in - check your details and try again"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5 loginForm">
        {loginError && (
          <DisplayMessage
            variant="danger"
            heading="Oh something is wrong!"
            message={loginError}
          />
        )}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-4">
            <Form.Label>Username/Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username/email address"
              {...register("identifier")}
            />
            {errors.identifier && (
              <FormError message={errors.identifier.message} />
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <FormError message={errors.password.message} />}
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              {submitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </fieldset>
      </Form>
    </>
  );
}
