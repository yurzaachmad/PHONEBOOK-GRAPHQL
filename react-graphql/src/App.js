import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import UserAdd from "./components/PhoneAdd";
import UserBox from "./components/PhoneBox";
import { useQuery } from "@apollo/client";
import { GET_CONTACTS } from "./graphql/gql";

const SearchContact = ({
  q,
  setQ,
  sortTypes,
  currenSort,
  onSortChange,
  navigate,
  setPlus,
}) => (
  <div className="input-group mb-8" id="search">
    <div id="icon" onClick={onSortChange}>
      <i className={`fa-solid ${sortTypes[currenSort].class}`}></i>
    </div>
    <div className="input-container">
      <i className="fa-solid fa-magnifying-glass" id="input-icon"></i>
      <input
        type="text"
        className="form-control"
        aria-describedby="basic-addon1"
        id="input-field"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
        }}
      />
    </div>
    <div id="icon">
      <i
        className="fa-solid fa-user-plus"
        onClick={() => {
          navigate("add");
          setPlus(true);
        }}
      ></i>
    </div>
  </div>
);

function Layout({
  q,
  setQ,
  sortTypes,
  currenSort,
  onSortChange,
  onClick,
  setPlus,
  plus,
}) {
  const navigate = useNavigate();

  return (
    <div className="all">
      {plus ? null : (
        <SearchContact
          onClick={onClick}
          q={q}
          setQ={setQ}
          onSortChange={onSortChange}
          currenSort={currenSort}
          sortTypes={sortTypes}
          navigate={navigate}
          setPlus={setPlus}
        />
      )}
      <Outlet />
    </div>
  );
}

function NotFound() {
  return <h1>Halaman tidak ditemukan</h1>;
}

function App() {
  const [contact, setContact] = useState([]);
  const [q, setQ] = useState("");

  // this code is for showing form to add contact
  const [plus, setPlus] = useState(false);
  const onClick = () => setPlus(true);

  const [searchParam] = useState(["name", "phone"]);

  const { loading, error, data } = useQuery(GET_CONTACTS);

  useEffect(() => {
    if (data) {
      setContact(data.getContacts);
    }
    if (loading) {
      <h1>Loading...</h1>;
    }
    if (error) {
      return <h1>Error : {error.message}</h1>;
    }
  }, [data]);

  //this is state to sort asc and desc
  const sortTypes = {
    up: {
      class: "fa-arrow-down-a-z",
      fn: (a, b) => a.name.localeCompare(b.name),
    },
    down: {
      class: "fa-arrow-up-z-a",
      fn: (a, b) => b.name.localeCompare(a.name),
    },
  };

  const [currenSort, setCurrentSort] = useState("up");

  const onSortChange = () => {
    let nexSort;

    if (currenSort === "down") nexSort = "up";
    else if (currenSort === "up") nexSort = "down";

    setCurrentSort(nexSort);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              q={q}
              setQ={setQ}
              sortTypes={sortTypes}
              currenSort={currenSort}
              onSortChange={onSortChange}
              onClick={onClick}
              setPlus={setPlus}
              plus={plus}
            />
          }
        >
          <Route
            index
            element={
              <UserBox
                contact={contact}
                q={q}
                setQ={setQ}
                searchParam={searchParam}
                sortTypes={sortTypes}
                currenSort={currenSort}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="add" element={<UserAdd setPlus={setPlus} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
