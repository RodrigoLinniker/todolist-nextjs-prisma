import { useState } from "react";
import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import { Modal } from "../components/Modal";
import { Todo } from "../types/Todo";
import { toast } from "react-toastify";
import api from "../services/httpService";

interface TodoProps {
  todos: Todo[];
}

export default function Dashboard({ todos }: TodoProps) {
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState(false);

  const [selectedItemsTodo, setSelectedItemsTodo] = useState<null | Todo>(null);
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const createTodoList = async () => {
    try {
      if (userId) {
        await api.post("/api/createtodo", {
          description: description,
          userId: userId,
        });
        refreshData();
        toast.success("Task criada com sucesso", { autoClose: 2000 });
        setDescription("");
      } else {
        toast.error("Error user unexist", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleOpenModalUpdate(item: Todo) {
    setIsModalVisible(true);
    setSelectedItemsTodo(item);
    setTypeModal(false);
  }

  function handleOpenModalDelete(item: Todo) {
    setIsModalVisible(true);
    setSelectedItemsTodo(item);
    setTypeModal(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedItemsTodo(null);
  }

  return (
    <div>
      <Header session={session} />

      <div>
        <div className="flex justify-center mt-10">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h1 className="text-center mb-4">Escreva sua lista para fazer</h1>
            <div className="flex space-x-2 p-2 bg-white rounded-md">
              <input
                type="text"
                id="description"
                placeholder="Descrição"
                className="w-full outline-none"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />

              <button
                disabled={description.trim() === ""}
                onClick={() => createTodoList()}
                className="flex gap-2 bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md text-white font-semibold items-center justify-center disabled:bg-gray-300"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex max-w-[1644px] m-auto items-center max-md:justify-center">
        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-4 p-4 mx-auto items-center">
          {todos?.map((item, index) => (
            <div key={item.id} className="flex justify-center">
              <div className=" relative justify-center mt-6">
                <div className="absolute flex -top-1 -right-1 p-3 space-x-1">
                  <button onClick={() => handleOpenModalUpdate(item)}>
                    <BiEdit size={24} />
                  </button>
                  <button onClick={() => handleOpenModalDelete(item)}>
                    <BiTrash size={24} />
                  </button>
                </div>
                <span className="absolute -top-3 left-0 bg-green-500 flex justify-center items-center rounded-full w-8 h-8 text-gray-50 font-bold">
                  {index + 1}
                </span>

                <p
                  title={item.description}
                  className="bg-white px-8 py-10 rounded-lg w-[280px] truncate "
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        items={selectedItemsTodo}
        typeModal={typeModal}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = `${session?.user?.id}`;

  const res = await api.get(`/api/todo/${userId}`);
  const json = await res.data;

  return {
    props: {
      todos: json,
    },
  };
};
