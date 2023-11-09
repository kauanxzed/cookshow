import axios from 'axios';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface ModalDeleteProps {
    show: boolean | undefined
    setOpenModalDelete: (value: boolean | undefined) => void
    id: string
  }
  

const DeletModal:React.FC<ModalDeleteProps> = ({show, setOpenModalDelete, id}) => {
  const [showModal, setShowModal] = useState(show)

  const deleteRecipe = () => {
    const token =
      localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

    const axiosInstace = axios.create({
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })



    axiosInstace.delete("api/recipe/", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        id_receita: id
      }
    });
    setShowModal(undefined)
    setOpenModalDelete(undefined)
  }

  const handleCloseModal = () => {
    setShowModal(undefined)
    setOpenModalDelete(undefined)
  }

  return (
    <Modal show={showModal} size="md" onClose={() => handleCloseModal()} popup>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Tem certeza que deseja cancelar essa receita?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => deleteRecipe()}>
                Sim, tenho certeza
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(undefined)}>
                Não, quero cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
    </Modal>
  );
}

export default DeletModal