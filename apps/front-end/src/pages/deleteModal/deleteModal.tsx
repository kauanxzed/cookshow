import { axiosInstance } from '@cook-show/shared/axios'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

interface ModalDeleteProps {
  show: boolean | undefined
  setOpenModalDelete: (value: boolean | undefined) => void
  id: string
  editedDelete: (value: boolean) => void
}

const DeletModal: React.FC<ModalDeleteProps> = ({
  show,
  setOpenModalDelete,
  id,
  editedDelete,
}) => {
  const [showModal, setShowModal] = useState(show)

  const deleteRecipe = async () => {
    const token =
      localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')

    const response = await axiosInstance.delete('api/recipe/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id_receita: id,
      },
    })
    if (response) {
      editedDelete(true)
      setShowModal(undefined)
      setOpenModalDelete(undefined)
    }
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
            Tem certeza que deseja deletar essa receita?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => deleteRecipe()}>
              Sim
            </Button>
            <Button color="gray" onClick={() => handleCloseModal()}>
              Não
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeletModal
