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
    <main className="min-h-[100vh] flex flex-col justify-center items-center">
      <div className="wrapper max-w-[900px]  min-h-[20em] m-auto w-full flex items-center flex-col justify-center">
        <button
          className="border-2 border-slate-500 w-24 h-9 rounded-md shadow hover:shadow-lg text-white hover:bg-blue-400 hover:border-blue-200 mb-12"
          onClick={onClick}
        >
          Click
        </button>

        <ToastContainer />
      </div>
    </main>
  )
}

export default App
