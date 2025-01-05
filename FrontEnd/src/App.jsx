import "./App.css";
import ChatSupport from "./components/ChatSupport/ChatSupport";
import Header from "./components/header/Header";
import Graphs from "./components/Graphs/Graphs";
function App() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-8">
        <Header className=" z-50" />
        <div className="fixed bottom-10 right-10">
          <ChatSupport />
        </div>
        <Graphs />
      </div>
    </>
  );
}

export default App;
