import { Dialog, Transition, TransitionEvents } from "@headlessui/react"
import { Fragment, PropsWithChildren } from "react"

interface IModalProps extends PropsWithChildren, TransitionEvents {
  isOpen: boolean
  closeModal?: () => void
  openModal?: () => void
}
export default function VideoModal({ isOpen, closeModal, children, ...props }: IModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment} {...props}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            appear
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto font-dosis">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full relative transform-gpu  text-white bg-black text-left align-middle shadow-xl transition-all">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
