import React, { createContext, useCallback, useContext, useState } from "react";

const NoteStore = createContext(null);

export const useNoteStore = () => useContext(NoteStore);

const NoteStoreProvider = ({ children }) => {
  const [selectedID, setSelectedID] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const resetValues = useCallback(() => {
    setTitle("");
    setValue("");
  }, []);

  const setValues = useCallback((title_, value_) => {
    setTitle(title_);
    setValue(value_);
  }, []);

  return (
    <NoteStore.Provider
      value={{
        selectedID,
        value,
        title,
        setSelectedID,
        setTitle,
        setValue,
        resetValues,
        setValues,
      }}
    >
      {children}
    </NoteStore.Provider>
  );
};

export default NoteStoreProvider;
