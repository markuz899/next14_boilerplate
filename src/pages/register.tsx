import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Layout } from "@/containers";
import { GlobalPageProps } from "@/utils/interface";
import { useAuth } from "@/context";
import Link from "next/link";
import { Toast } from "@/utils/toast";
import { Button, Icon, Input, Modal } from "@/components";

export default function Register({ global }: GlobalPageProps) {
  const { register, logout } = useAuth();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const surname = formData.get("surname");
    const email = formData.get("email");
    const password = formData.get("password");
    const loginService = await register({ username, surname, email, password });
    if (loginService.error) {
      Toast({ type: "error", message: loginService?.messages });
    } else {
      Toast({ type: "success", message: "Login success" });
    }
    setPending(false);
  }

  return (
    <Layout global={global} title="Login page">
      <Container>
        <section>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <Modal
                  onClickOther
                  title="Test modal"
                  render={({ close }) => <div>Modal test</div>}
                >
                  <Icon name="zoom" size="45" />
                </Modal>
                <div className="flex items-center justify-between">
                  <Link href="/">
                    <Button>Home</Button>
                  </Link>
                  <Link href="/login">
                    <Button>Signin</Button>
                  </Link>
                  <Button kind="error" onClick={logout}>
                    Logout
                  </Button>
                </div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Input
                      defaultValue="Bob"
                      type="text"
                      name="username"
                      placeholder="name@company.com"
                      topPlaceholder="Bob"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      defaultValue="Rossi"
                      type="text"
                      name="surname"
                      placeholder="Rossi"
                      topPlaceholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      defaultValue="name@company.com"
                      type="text"
                      name="email"
                      placeholder="name@email.com"
                      topPlaceholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      defaultValue="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      topPlaceholder="Password"
                      required
                      showPasswordIcon
                    />
                  </div>

                  <Button
                    fluid={true}
                    kind="inverse-success"
                    disabled={pending}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(ctx: { req: any }) {
  // const delay = (s: number) => new Promise((resolve) => setTimeout(resolve, s));
  // await delay(2000);
  const { req } = ctx;
  // const customVariable = req.headers["x-custom-variable"];
  return {
    props: {},
  };
}

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100svh - 170px);
`;
