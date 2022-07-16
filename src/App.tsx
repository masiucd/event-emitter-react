import "./App.css"

import emitter from "./pattern/event-emitter"
import {ToastContainer} from "./components/Toast"

const onClick = () => {
  emitter.emit("toast", {
    type: "OPEN_TOAST",
    text: "Hello World",
  })
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
