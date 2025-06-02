import { useState, useEffect, useMemo } from "react"

interface IModalSetting {
  timeout?: number
}

export function useModal({ timeout }: IModalSetting) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if (!timeout) return
    let timer: NodeJS.Timer
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false)
      }, timeout)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOpen])
  return useMemo(() => ({ isOpen, closeModal, openModal }), [isOpen])
}