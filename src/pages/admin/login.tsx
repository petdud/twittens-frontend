import Link from "next/link";
import Image from 'next/image';
import { MainSlot } from "../../layouts/main-slot";
import { HeadPage } from "../../layouts/head-page";
import { FormEventHandler, useCallback, useState } from "react";
import { Input } from "../../components/controllers/input/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  return (

    <>
      <HeadPage 
        title="Twitten - Login panel" 
        description="Twittens helps you to find your twitter frens in your favorite NFT collections."
      />

      <MainSlot>
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 my-12 px-4">
        <LoginWidget />
        </div>
      </MainSlot>
    </>
  )
}

const LoginWidget = () => {
  const router = useRouter();
  const error = router.query.error as string;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: '/admin/collections' });
  }, [email, password]);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href={"/"}>
            <Image
              className="h-8 w-auto m-auto"
              width="163"
              height="50"
              src="/twittens_logo.png"
              alt="Twittens"
            />
          </Link>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-zinc-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <div className="mt-1">
                  <Input
                    id="email"
                    label="Email address"
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="mt-1">
                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <div className="text-red-500">
                {`Something wrong: ${error}`}
              </div>}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
