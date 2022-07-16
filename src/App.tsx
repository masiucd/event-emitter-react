import "./App.css"
import {AnimatePresence, motion} from "framer-motion"
import {FC, useEffect, useState} from "react"
import emitter from "./pattern/event-emitter"

type Action = {type: "OPEN_TOST"; text: string}

const onClick = () => {
  emitter.emit("toast", {
    type: "OPEN_TOAST",
    text: "Hello World",
  })
}

const ToastContainer: FC = () => {
  const [isActive, setIsActive] = useState(false)
  const [text, setText] = useState("")
  const setIsOn = (action: Action) => {
    setIsActive(true)
    setText(action.text)
  }
  emitter.on("toast", setIsOn)
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false)
      }, 3000)
    }
  }, [isActive])

  useEffect(() => {
    return () => {
      emitter.off("toast", setIsOn)
    }
  }, [])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{opacity: 0, y: 1000}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 1000}}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="App">
      <button onClick={onClick}>Click</button>
      <ToastContainer />
    </div>
  )
}

export default App
