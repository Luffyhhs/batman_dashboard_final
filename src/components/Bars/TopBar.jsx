import React from "react";
import { FaPersonBurst, FaPowerOff } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../app/UserSlice/UserSlice";
import { FaDollarSign } from "react-icons/fa";

const TopBar = () => {
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    // console.log("clicked");
    dispatch(logout());
  };
  const currentUser = useSelector(selectUser);
  // console.log(currentUser);

  return (
    <>
      <nav className="flex w-full justify-between items-center bg-gradient-to-br from-[#454545] to-[#5f4600] text-gray-100 h-20">
        {/* <h1 className="text-3xl hover:cursor-pointer hover:bg-indigo-700 h-full flex items-center p-3">
          <FaBars />
        </h1> */}
        <div className="flex items-center h-full w-auto gap-5 ml-auto">
          <div className="flex items-center gap-2 h-full hover:bg-[#0000001a] p-4 cursor-pointer">
            {/* <img
              src="https://cardb.linnit.io/img/admin.png"
              alt="name"
              className="w-10 h-full"
            /> */}
            <FaPersonBurst />
            <p>{currentUser.name}</p>
          </div>

          <div className="flex items-center gap-2 h-full hover:bg-[#0000001a] p-4 cursor-pointer">
            {/* <img
              src="https://cardb.linnit.io/img/admin.png"
              alt="name"
              className="w-10 h-full"
            /> */}
            <FaDollarSign />
            <p>{currentUser.unit}</p>
          </div>

          <div
            onClick={handleLogOut}
            className="text-xl flex items-center gap-2 h-full  hover:bg-[#0000001a] cursor-pointer px-4"
          >
            <span className="inline-block">
              <FaPowerOff />
            </span>
            Logout
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopBar;
