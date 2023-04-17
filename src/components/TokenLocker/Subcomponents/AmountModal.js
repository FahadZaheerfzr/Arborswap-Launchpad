import React, { useEffect, useState } from 'react'
import Modal, { useModalState, useModalProps } from 'react-simple-modal-provider'

const options = [
  {
    id: 1,
    name: '25%',
    value: 0.25,
  },
  {
    id: 2,
    name: '50%',
    value: 0.5,
  },
  {
    id: 3,
    name: '75%',
    value: 0.75,
  },
  {
    id: 4,
    name: 'Max',
    value: 1,
  },
]

const AmountModalBody = ({ setOpen }) => {
  const [selectedAmount, setSelectedAmount] = useState('0')
  const { amount, balance, setAmount } = useModalProps('AmountModal')

  useEffect(() => {
    setSelectedAmount(amount)
  }, [amount])

  const handleSubmit = () => {
    setAmount(selectedAmount)
    setOpen(false)
  }

  return (
    <div className='w-full px-5 md:px-0 md:w-[420px]  '>
      <div className="rounded-[10px] px-5  py-7 bg-white dark:bg-dark-1">
        <div className="flex justify-between items-center  ">
          <span className="text-dark-text dark:text-light-text font-gilroy font-semibold text-lg">Add to Locker</span>

          <div className="flex items-center cursor-pointer" onClick={() => setOpen(false)}>
            <span className="text-sm font-gilroy font-semibold text-dark-text dark:text-light-text mr-2">Close</span>
            <div className="flex justify-center items-center bg-[#E56060] text-[#E56060] bg-opacity-10 rounded-full w-[15px] h-[15px]">
              &#10005;
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <span className="text-gray dark:text-gray-dark text-sm font-medium dark:font-semibold">Amount</span>

          <span className="text-dim-text dark:text-dim-text-dark text-sm font-medium">
            Your Balance :{' '}
            <span className="text-dark-text font-semibold dark:text-light-text">{balance?.toLocaleString()}</span>
          </span>
        </div>

        <div className="bg-[#F5F1EB] dark:bg-dark-3 mt-2 px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="text-dark-text dark:text-light-text font-gilroy font-bold text-xl">
              {selectedAmount.toLocaleString()}
            </span>

            <span className="text-gray dark:text-gray-dark  font-medium text-sm">~ $---</span>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-[10px]">
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center justify-center text-sm font-semibold bg-opacity-10 py-2 rounded-sm cursor-pointer
                            ${
                              option.name === 'Max'
                                ? 'text-primary-green bg-primary-green'
                                : 'text-[#C89211] bg-[#C89211]'
                            }`}
                onClick={() => setSelectedAmount(balance * option.value)}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-5 md:px-0 md:w-[420px] mt-10">
        <button
          className="w-full bg-primary-green hover:opacity-40 text-white py-5 rounded-md font-gilroy font-bold text-xl"
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default function AmountModal({ children }) {
  const [isOpen, setOpen] = useModalState()

  return (
    <Modal id={'AmountModal'} consumer={children} isOpen={isOpen} setOpen={setOpen} allowClickOutside={false}>
      <AmountModalBody setOpen={setOpen} />
    </Modal>
  )
}
