import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../../../constants/api";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayMessage from "../../messages/DisplayMessage";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);
  const router = useRouter();

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("response", response.data);
      setAuth(response.data);
      console.log("Success");
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
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5">
        {loginError && (
          <DisplayMessage
            variant="danger"
            heading="Oh something is wrong!"
            message={loginError}
          />
        )}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-4" controlId="formBasicUserName">
            <Form.Label>Username/Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username/email address"
              {...register("identifier")}
            />
            {errors.identifier && (
              <span className="formError">{errors.identifier.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <span className="formError">{errors.password.message}</span>
            )}
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
