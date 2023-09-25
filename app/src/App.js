import { Provider } from "react-redux";
import "./App.css";
import UserList from "./components/UserList";
import { store } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <div className="container py-10">
        <UserList />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
