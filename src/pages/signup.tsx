import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";
import SignUpAnimated from "../assets/signup.svg";
import Link from "next/link";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../components/Button";
import api from "../services/httpService";
import { InputSignUp } from "../components/InputSignUp";

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string()
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  password: Yup.string().required("Senha obrigatória"),
});

export default function Signup() {
  const [passwordShow, setPasswordShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await api.post("/api/user", { data });
      toast.success("Usuário criado com sucesso", { autoClose: 2000 });
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
  };

  const togglePassword = (e: any) => {
    e.preventDefault();

    setPasswordShow(!passwordShow);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="flex w-full max-w-[1100px] px-4">
          <Link href="/" className="w-7 h-7">
            <AiOutlineArrowLeft
              size={28}
              className="text-white hover:text-green-500"
            />
          </Link>
        </div>
        <div className="w-full max-w-[1440px] flex gap-20 px-4 max-lg:flex-col-reverse justify-center items-center ">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-[320px] flex flex-col gap-4"
            >
              <h1 className="text-green-500 font-bold text-3xl text-center mb-6">
                Cadastre-se
              </h1>

              <div className="flex flex-col gap-1">
                <InputSignUp
                  name="name"
                  id="name"
                  type="text"
                  handleButton={false}
                  placeholder="Nome"
                  register={register}
                />
                <span className="text-pink-600 px-1">
                  {errors.name?.message}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <InputSignUp
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
                  <InputSignUp
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

              <Button type="submit" text="Cadastrar" />
            </form>
          </div>

          <Image
            src={SignUpAnimated}
            className="max-lg:h-56 w-[450px] h-[450px] max-md:hidden"
            alt="signupAnimeted"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
