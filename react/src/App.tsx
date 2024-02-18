import AddNote from "./components/AddNote";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ToDoList from "./components/ToDoList";

const App = () => {
  return (
    <div className="min-h-screen theme relative">
      <Navbar />
      <div className="container mx-auto p-3 flex flex-col gap-6">
        <AddNote />
        <ToDoList />
      </div>
      <Footer />
    </div>
  );
};

export default App;
