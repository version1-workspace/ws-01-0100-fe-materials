import { createContext, useContext, useState } from "react";

const CheckContext = createContext({
  checked: {},
  allChecked: false,
  check: (_id) => {},
  checkAll: (_ids) => {},
});

export const CheckContainer = ({ children }) => {
  const [checked, setChecked] = useState({});
  const [allChecked, setAllChecked] = useState(false);

  const checkAll = (ids) => {
    if (allChecked) {
      setChecked({});
      setAllChecked(false);
      return;
    }

    const newChecked = {};
    ids.forEach((id) => {
      newChecked[id] = true;
    });

    setChecked(newChecked);
    setAllChecked(true);
  };

  const check = (id) => {
    const newChecked = JSON.parse(JSON.stringify(checked));
    newChecked[id] = !newChecked[id];

    setChecked(newChecked);
  };

  return (
    <CheckContext.Provider value={{ check, checked, allChecked, checkAll }}>
      {children}
    </CheckContext.Provider>
  );
};

const useCheck = () => {
  const { check, checked, allChecked, checkAll } = useContext(CheckContext);
  const ids = Object.keys(checked);

  return {
    ids,
    check,
    checked,
    allChecked,
    checkAll,
  };
};

export default useCheck;
