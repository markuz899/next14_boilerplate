import { FormEvent } from "react";
import router from "next/router";
import styled from "styled-components";
import { Layout } from "@/containers";
import { GlobalPageProps } from "@/utils/interface";
import { useAuth } from "@/context";

export default function Login({ global }: GlobalPageProps) {
  const { login } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("cred", { email, password });

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.log("errore in request");
    }
  }

  return (
    <Layout global={global}>
      <Container>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </Container>
    </Layout>
  );
}

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;
