import styles from "./index.module.css"
import { classHelper } from "@/lib/cls"
import { createContext, useContext, useState } from "react"

const NotificationBar = ({ message, show }) => {
  return (
    <div
      className={classHelper({
        [styles.container]: true,
        [styles.show]: show
      })}
    >
      <p className={styles.message}>{message}</p>
    </div>
  )
}

const defaultDuration = 3000

const NotificationBarContext = createContext({
  message: "",
  duration: defaultDuration,
  show: false,
  push: async _m => {}
})

export function NotificaitonBarContainer({ children, config }) {
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const { duration = 3000 } = config || {}

  const push = message => {
    return new Promise((resolve, reject) => {
      try {
        setMessage(message)
        setShow(true)

        setTimeout(() => {
          setMessage("")
          setShow(false)
          resolve()
        }, duration)
      } catch (e) {
        reject(e)
      }
    })
  }

  return (
    <NotificationBarContext.Provider
      value={{
        message,
        duration,
        show,
        push
      }}
    >
      <NotificationBar message={message} show={show} />
      {children}
    </NotificationBarContext.Provider>
  )
}

export default function useNotificationBar() {
  const { push } = useContext(NotificationBarContext)

  return {
    push
  }
}
