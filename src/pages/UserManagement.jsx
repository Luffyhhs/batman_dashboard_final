import { useEffect, useState } from "react";
import Container from "../components/Container";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import CustomTable from "../components/Tables/Table";
import { userColumns } from "../constants/TableColumn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUserList,
  resetDeleteUserStatus,
  resetUpdateUserStatus,
  selectUserDeleteMsg,
  selectUserDeleteStatus,
  selectUserList,
  selectUserListMsg,
  selectUserListStatus,
  selectUserListTotal,
  selectUserUpdateStatus,
} from "../app/UserSlice/UserSlice";
import { toast } from "react-toastify";
import Notification from "../components/Notification";
import ModalCmp from "../components/Modal/ModalCmp";

const UserManagement = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [searchParams, setSearchParams] = useState({ keyword: "" });
  const [searchInputs, setSearchInputs] = useState({ keyword: "" });
  const userList = useSelector(selectUserList);
  const userListTotal = useSelector(selectUserListTotal);
  // console.log(userList);
  const userListStatus = useSelector(selectUserListStatus);
  const userListMsg = useSelector(selectUserListMsg);
  const userDeleteStatus = useSelector(selectUserDeleteStatus);
  const userDeleteMsg = useSelector(selectUserDeleteMsg);
  const userUpdateStatus = useSelector(selectUserUpdateStatus);
  const columns = userColumns(nav, setOpen, setUserId);
  const searchHandler = () => {
    setSearchInputs(searchParams);
  };
  const handleInputKeyPress = (e) => {
    // console.log(e, "key Entered");
    if (e.key === "Enter") {
      searchHandler();
    }
  };
  // console.log(
  //   "userstatus:",
  //   userListStatus,
  //   "userdeletestatus:",
  //   userDeleteStatus
  // );
  const getUsers = () => {
    dispatch(
      getUserList({ api: `getAllUser?keyword=${searchInputs.keyword}` })
    );
  };
  useEffect(() => {
    userListStatus === "fail" &&
      toast.error(userListMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
  }, [userListStatus]);
  useEffect(() => {
    userDeleteStatus === "success" &&
      toast.success(userDeleteMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    userDeleteStatus === "fail" &&
      toast.error(userDeleteMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    (userDeleteStatus === "loading" ||
      userDeleteStatus === "success" ||
      userDeleteStatus === "fail") &&
      dispatch(resetDeleteUserStatus());
    getUsers();
  }, [searchInputs, userDeleteStatus]);
  useEffect(() => {
    (userUpdateStatus === "loading" ||
      userUpdateStatus === "success" ||
      userUpdateStatus === "fail") &&
      dispatch(resetUpdateUserStatus());
  }, [userUpdateStatus]);
  return (
    <Container>
      <Notification />
      <ModalCmp
        title={"Delete"}
        open={open}
        text={"Are you sure to delete this User?"}
        onCancel={() => setOpen(false)}
        onOk={() => {
          try {
            setOpen(false);
            dispatch(deleteUser({ api: `deleteUser/${userId}` }));
          } catch (error) {
            // console.error(error);
          } finally {
            dispatch(resetDeleteUserStatus());
          }
        }}
      />
      <h1 className="text-4xl py-2">User List</h1>
      <div className="row flex flex-wrap w-auto justify-between px-10">
        <div className="flex flex-wrap w-auto gap-2 sm:gap-4">
          <CustomInput
            placeholder={"Search ..."}
            className={"w-[12rem]"}
            onChange={(e) =>
              setSearchParams({ ...searchParams, keyword: e.target.value })
            }
            onKeyPress={handleInputKeyPress}
          />
        </div>
        <div className="w-auto">
          <CustomButton
            text={"Add New User"}
            icon={<FaPlus />}
            className={"text-white bg-[#00a65a] "}
            click={() => nav("create")}
          />
        </div>
      </div>
      <p>Total - {userListTotal}</p>

      <CustomTable
        columns={columns}
        data={userList}
        loading={userListStatus === "loading"}
      />
    </Container>
  );
};

export default UserManagement;
