import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Layout } from "@/containers";
import { GlobalPageProps } from "@/utils/interface";
import { useAuth } from "@/context";
import Link from "next/link";
import { Toast } from "@/utils/toast";
import { Icon, Modal } from "@/components";

export default function Login({ global }: GlobalPageProps) {
  const { login, logout } = useAuth();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    await login({ username: email, password });
    Toast({ type: "success", message: "Login success" });
    setPending(false);
  }

  return (
    <Layout global={global}>
      <Container>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                    <button className="bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Home
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Logout
                  </button>
                </div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      defaultValue="emilys"
                      type="text"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      defaultValue="emilyspass"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  <button
                    disabled={pending}
                    type="submit"
                    className="w-full disabled:bg-slate-50 text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
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
`;
