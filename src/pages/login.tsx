import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Layout } from "@/containers";
import { GlobalPageProps } from "@/utils/interface";
import { useAuth } from "@/context";
import Link from "next/link";
import { Toast } from "@/utils/toast";
import { Button, Icon, Input, Modal } from "@/components";

export default function Login({ global }: GlobalPageProps) {
  const { login, logout } = useAuth();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const loginService = await login({ username: email, password });
    if (loginService.error) {
      Toast({ type: "error", message: loginService.detail.name });
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
                      defaultValue="emilys"
                      type="text"
                      name="email"
                      placeholder="name@company.com"
                      topPlaceholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      defaultValue="emilyspass"
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

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 170px);
`;
