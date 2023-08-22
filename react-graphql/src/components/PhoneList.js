import React, { useState, useEffect } from "react";
import UserItem from "./PhoneItem";

const ITEMS_PER_PAGE = 10; // Number of items to display per page

export default function UserList({
  listPhone,
  q,
  searchParam,
  sortTypes,
  currenSort,
}) {
  //this state is to set a page data
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  //this function is to set a search data
  const search = (listPhone) => {
    return listPhone.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  useEffect(() => {
    // Update the currentItems whenever listPhone, q, or currenSort changes
    const filteredItems = search([...listPhone].sort(sortTypes[currenSort].fn));
    setCurrentItems(filteredItems.slice(0, currentPage * ITEMS_PER_PAGE));
  }, [listPhone, currenSort, currentPage, sortTypes]);

  // Function to handle the scroll event and trigger pagination
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      // User has reached the bottom of the page, load more data
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="main">
      {currentItems.map((student, index) => (
        <UserItem key={student._id} student={student} no={index + 1} />
      ))}

      <div style={{ height: "600px" }}></div>
    </div>
  );
}
