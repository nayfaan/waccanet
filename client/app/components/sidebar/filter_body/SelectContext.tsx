// // SelectContext.js
// import React, { createContext, useContext, useState } from "react";

// const SelectContext = createContext<string[]>([]);
// const minPriceContext = createContext<number>(0);
// const maxPriceContext = createContext<number>(0);

// export const useSelectContext = () => useContext(SelectContext);

// const SelectProvider = ({ children }: any) => {
//   // ここで必要な状態や関数を定義

//   const [selectedValues, setSelectedValues] = useState<string[]>([]);

//   const sharedState = {
//     selectedValues,
//     // 他にも必要なものがあれば追加
//   };

//   return (
//     <SelectContext.Provider value={sharedState}>
//       {children}
//     </SelectContext.Provider>
//   );
// };

// export default SelectProvider;
