import type { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Image from "next/legacy/image";
import ToDoList from "../assets/checklist.svg";
import { FcGoogle } from "react-icons/fc";
import { BsGithub, BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button } from "../components/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputLogin } from "../components/InputLogin";

export type LoginFormValues = {
  email: string;
  password: string;
};

export default function Home() {
  const [passwordShow, setPasswordShow] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("E-mail obrigatório")
      .email("Digite um e-mail válido"),
    password: Yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(schema) });
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signIn("app-login", {
        redirect: false,
        email: data.email,
        password: data.password,
      }).then((res) => {
        if (res?.ok) {
          router.push("/dashboard");
          toast.success("Login Success", { autoClose: 2000 });
        } else if (res?.error) {
          toast.error(res.error, { autoClose: 2000 });
        }
      });
    } catch (error) {
      console.log(error);
      //   setError(error)
    }
  };

  const togglePassword = (e: any) => {
    e.preventDefault();

    setPasswordShow(!passwordShow);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex gap-20 px-4 max-lg:flex-col-reverse justify-center items-center">
        <div className="w-full max-w-[320px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <h1 className="text-green-500 font-bold text-3xl text-center mb-6">
              Entrar
            </h1>

            <div className="flex flex-col gap-1">
              <InputLogin
                name="email"
                id="email"
                type="text"
                handleButton={false}
                placeholder="Email"
                register={register}
              />
              <span className="text-pink-600 px-1">
                {errors.email?.message}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex">
                <InputLogin
                  name="password"
                  id="password"
                  type={passwordShow ? "text" : "password"}
                  placeholder="Senha"
                  handleButton={true}
                  register={register}
                />
                <button
                  onClick={togglePassword}
                  className="pl-4 w-12 outline-none bg-white border-2 border-l-0 hover:border-green-500 py-2 rounded-2xl rounded-tl-none rounded-bl-none mt-3"
                >
                  {passwordShow ? <IoEyeSharp /> : <BsFillEyeSlashFill />}
                </button>
              </div>
              <span className="text-pink-600 px-1">
                {errors.password?.message}
              </span>
            </div>

            <Button type="submit" text="Login" />

            <Link href="/signup">
              <Button text="Registre-se" />
            </Link>
          </form>

          <div className="flex items-center justify-center gap-4 mt-5">
            <h1 className="w-full max-w-[100px] border border-solid border-gray-300"></h1>
            <h1 className="text-sm text-gray-400">Ou entre com</h1>
            <h1 className="w-full max-w-[100px] border border-solid border-gray-300"></h1>
          </div>

          <div className="flex gap-6 items-center justify-center mt-5 max-md:mt-3">
            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: `/dashboard`,
                })
              }
              className="flex items-center justify-center w-28 h-14 rounded-2xl hover:bg-gray-300 bg-white border border-gray-200"
            >
              <FcGoogle size={28} />
            </button>
            <button
              onClick={() =>
                signIn("github", {
                  callbackUrl: `/dashboard`,
                })
              }
              className="flex items-center justify-center w-28 h-14 rounded-2xl hover:bg-gray-300 bg-white border border-gray-200"
            >
              <BsGithub size={28} />
            </button>
          </div>
        </div>

        <div className="max-md:hidden">
          <Image
            id="todoIcon"
            src={ToDoList}
            className="w-[450px] h-[450px] max-lg:h-56 "
            alt="todolist"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session },
  };
};
