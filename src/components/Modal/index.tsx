import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/httpService";
import { Todo } from "../../types/Todo";

interface ModalProps {
  visible: boolean;
  typeModal: boolean;
  items: Todo | null;
  onClose: () => void;
}

export function Modal({ visible, typeModal, onClose, items }: ModalProps) {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    setDescription(`${items?.description}`);
  }, [items]);

  if (!visible || !items) {
    return null;
  }

  async function handleUpdateTask() {
    try {
      await api.put(`/api/todo/${items?.id}`, {
        description: description,
      });
      refreshData();
      toast.success("Task Atualizada", { autoClose: 2000 });
      onClose();
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      refreshData();
    }
  }

  async function handleDeleteItemTodo() {
    try {
      await api.delete(`/api/todo/${items?.id}`);
      refreshData();
      toast.success("Task excluída", { autoClose: 2000 });
      onClose();
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      refreshData();
    }
  }

  return (
    <div>
      <div
        onClick={onClose}
        className="fixed flex top-0 bottom-0 left-0 right-0 bg-gray-800/40 backdrop-blur-sm items-center justify-center"
      >
        <div
          className="w-full flex flex-col gap-10 max-w-lg items-center justify-center bg-white p-6 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {typeModal === true && (
            <strong className="text-xl">Deseja Excluir ?</strong>
          )}
          {typeModal === false && (
            <strong className="text-xl">Editar Task</strong>
          )}

          {typeModal ? (
            ""
          ) : (
            <input
              type="text"
              className="px-4 w-84 outline-none border-2 focus:border-green-500 py-2 rounded-lg"
              placeholder="Digite a Nova Descrição"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          )}

          <div className="flex flex-row gap-5">
            <button
              className="w-24 bg-red-500 hover:bg-red-600 rounded-2xl p-2 text-white"
              onClick={onClose}
            >
              Cancelar
            </button>
            {typeModal ? (
              <button
                onClick={handleDeleteItemTodo}
                className="w-24 bg-green-500 hover:bg-green-600 rounded-2xl p-2 text-white"
              >
                Excluir
              </button>
            ) : (
              <button
                disabled={description.trim() === ""}
                onClick={handleUpdateTask}
                className="w-24 bg-green-500 hover:bg-green-600 rounded-2xl p-2 text-white disabled:bg-gray-300"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
