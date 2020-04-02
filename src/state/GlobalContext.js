import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

const Provider = GlobalContext.Provider;

export const GlobalProvider = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  // const [loggedUser, setLoggedUser] = useState({
  //   userName: "orez",
  //   password: "gay",
  //   email: "aaaa@gmail.com",
  //   _id: "5dc172c78972b8f32e7247a3",
  //   creationDate: "1572958918427",
  //   avatar: "http://robohash.org/349028"
  // });
  // const [loggedIn, setLoggedIn] = useState(true);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  const state = {
    loggedUser,
    selectedPost,
    loggedIn,
    dropDownIsOpen
  };

  const action = {
    setLoggedUser,
    setSelectedPost,
    setLoggedIn,
    setDropDownIsOpen
  };

  return <Provider value={{ ...state, ...action }}>{children}</Provider>;
};
