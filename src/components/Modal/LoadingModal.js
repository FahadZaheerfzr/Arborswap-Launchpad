import React from 'react'
import Modal, { useModalState } from 'react-simple-modal-provider'

export default function LoadingModal({ children }) {
  const [isOpen, setOpen] = useModalState()

  return (
    <Modal id={'LoadingModal'} consumer={children} isOpen={isOpen} setOpen={setOpen} allowClickOutside={false}>
      <div className="flex justify-center items-center space-x-2">
        <div
          className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent"
        ></div>
      </div>
    </Modal>
  )
}
