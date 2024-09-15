// import React, { useState } from "react";
// import { sideBarData } from "../../constants/SideBarData";
// import { useNavigate } from "react-router-dom";

// const SideBar = () => {
//   const [current, setCurrent] = useState(0);
//   const nav = useNavigate();
//   const handleClick = (i) => {
//     setCurrent(i);
//     nav(sideBarData[i].path);
//   };
//   return (
//     <>
//       <aside className="nav bg-gray-900 text-gray-100 h-screen top-16 w-[5rem] md:w-[20rem] border-r border-gray-300 fixed">
//         <ul className="flex flex-col text-3xl md:text-2xl gap-4">
//           {sideBarData.map((item, i) => (
//             <li
//               className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-gray-700 ${
//                 current === i ? "border-l-indigo-50 border-l-2 bg-gray-700" : ""
//               }`}
//               key={i}
//               onClick={() => handleClick(i)}
//             >
//               {item.icon}
//               <span className="hidden md:inline">{item.name}</span>
//             </li>
//           ))}
//         </ul>
//       </aside>
//     </>
//   );
// };

// export default SideBar;
