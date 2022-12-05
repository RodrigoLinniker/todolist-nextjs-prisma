import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

interface HeaderProps {
  session: Session | null;
  page?: boolean;
}

export function Header({ session }: HeaderProps) {
  const urlImage = session?.user?.image;

  return (
    <div className="w-full bg-gray-500">
      <div className="max-w-[1644px] m-auto flex items-center justify-between py-3 px-10 max-sm:px-5">
        <Link href="/dashboard">
          <h1 className="text-white text-3xl max-sm:text-lg font-bold tracking-tight">
            ToDo List
            <span className="ml-1 text-green-500 ">.</span>
          </h1>
        </Link>

        <div className="flex gap-7 items-center justify-center">
          <div className="flex items-center gap-3 max-sm:gap-1">
            <div className="flex flex-col max-sm:hidden">
              <h1 className="text-right text-white">
                {`${session?.user?.name}`.toLocaleUpperCase()}
              </h1>
              <h1 className="text-xs text-white text-right">{`${session?.user?.email}`}</h1>
            </div>
            {urlImage && urlImage.length ? (
              <div className="flex">
                <Image
                  id="imgTestId"
                  src={urlImage}
                  className=" rounded-full ring-2 ring-gray-600 "
                  width={40}
                  height={40}
                  alt="avatar"
                />
              </div>
            ) : (
              <CgProfile id="imgTestId" className="w-10 h-10" />
            )}
          </div>
          <button
            className="text-white hover:text-green-500"
            onClick={() => signOut()}
          >
            {" "}
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
