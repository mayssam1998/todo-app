import { Grid3X3, List, ListTodoIcon, Moon, Search, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setViewType } from "../slices/todoSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const viewType = useAppSelector((st) => st.todos.viewType);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleDarkmode = () => {
    document.documentElement.classList.toggle("dark");
  };
  const handleViewType = () => {
    if (viewType == "grid") {
      dispatch(setViewType("list"));
    } else {
      dispatch(setViewType("grid"));
    }
  };

  useEffect(() => {
    if (search !== "") {
      const timeOut = setTimeout(() => {
        navigate(`/?search=${search}`);
      }, 300);
      return () => {
        clearTimeout(timeOut);
      };
    } else {
      navigate("/");
    }
  }, [search]);
  return (
    <header className="w-full border-b dark:border-brown mb-5 p-3">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="font-bold text-3xl flex gap-2 items-center cursor-pointer">
          <ListTodoIcon color="var(--primary-color)" size={40} /> Keep Todos
        </h1>
        <div className="border md:border-brown rounded-md cursor-pointer hidden md:flex gap-2 pl-2 items-center w-full md:w-80">
          <Search size={20} />
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none p-2 w-full"
            placeholder="Search Todo .."
          />
        </div>

        <div className="flex gap-2">
          <div
            onClick={handleViewType}
            className="rounded-full hover:bg-gray-200 hover:dark:bg-gray-600 h-10 w-10 transition-all duration-300 cursor-pointer hidden md:flex items-center justify-center"
          >
            {viewType == "list" && <List />}
            {viewType == "grid" && <Grid3X3 />}
          </div>
          <div
            title="Dark Mode"
            onClick={handleDarkmode}
            className="border relative p-2 rounded-full bg-gray-600 dark:bg-yellow-200 transition-all duration-300 h-10 w-10 cursor-pointer overflow-hidden"
          >
            <Moon
              color="white"
              className="absolute transition-all duration-300 left-2 dark:left-10"
            />
            <Sun
              color="orangered"
              className="absolute transition-all duration-300 left-10 dark:left-2"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
