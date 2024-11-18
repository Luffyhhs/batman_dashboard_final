import React, { useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import PagesTitle from "../../components/PagesTitle";
import CustomForm from "../../components/Forms/CustomForm";
import { createUserInputs } from "../../constants/FormInputs";
import CustomTable from "../../components/Tables/Table";
import { userColumns } from "../../constants/TableColumn";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  getDownLineUsers,
  getOwnUserInfo,
  resetCreateUserStatus,
  resetUpdateUserStatus,
  selectUser,
  selectUserListStatus,
  updateUser,
} from "../../app/UserSlice/UserSlice";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";
import ModalCmp from "../../components/Modal/ModalCmp";
import CustomInput from "../../components/Inputs/CustomInput";
import { FaCheck, FaCopy } from "react-icons/fa6";
import {
  generateQueryString,
  handleCopyAll,
} from "../../utilities/UtilFunctions";
import CustomSelect from "../../components/Inputs/CustomSelect";

const Users = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const userListStatus = useSelector(selectUserListStatus);
  const currentUser = useSelector(selectUser);
  const createUserStatus = useSelector((state) => state.user.createUserStatus);
  const createUserMsg = useSelector((state) => state.user.createUserMsg);
  const updateUserMsg = useSelector((state) => state.user.updateUserMsg);
  const updateUserStatus = useSelector((state) => state.user.updateUserStatus);
  // console.log(createUserStatus, createUserMsg);
  const [searchParams, setSearchParams] = useState({
    id: "",
  });
  const [banOpen, setBanOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [createdUser, setCreatedUser] = useState({});
  const [minus, setMinus] = useState(false);
  const [userId, setUserId] = useState(null);
  const [topUpAmt, setTopUpAmt] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const userSelect = useSelector((state) => state.user.userSelectBox);

  const onFinish = (values) => {
    values.upLine = currentUser._id;
    setCreatedUser(values);
    dispatch(createUser({ api: "user", pData: values }));
  };

  // const handleCopyAll = async (text = "", setIsCopied = () => {}) => {
  //   const textToCopy =
  //     text !== ""
  //       ? text
  //       : `User Id: ${createdUser?.name}\nPassword: ${createdUser?.password}\nLink: https://batman688.vip`;

  //   try {
  //     await navigator.clipboard.writeText(textToCopy);
  //     setIsCopied(true);
  //     setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  //   } catch (err) {
  //     console.error("Failed to copy: ", err);
  //   }
  // };
  const queryString = useMemo(
    () => generateQueryString(searchParams),
    [searchParams]
  );
  // console.log(queryString);
  useEffect(() => {
    if (createUserStatus === "success") {
      setCopyOpen(true);
      toast.success("Succeed", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    }
    if (createUserStatus === "fail") {
      toast.error(createUserMsg, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    }
    if (updateUserStatus === "success") {
      toast.success("Succeed", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    }
    if (updateUserStatus === "fail") {
      toast.error(updateUserMsg, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    }
    (createUserStatus === "fail" || createUserStatus === "success") &&
      dispatch(resetCreateUserStatus());
    if (updateUserStatus === "fail" || updateUserStatus === "success") {
      dispatch(resetUpdateUserStatus());
      dispatch(getOwnUserInfo({ api: `user/${currentUser._id}` }));
    }
  }, [
    createUserStatus,
    dispatch,
    createUserMsg,
    updateUserStatus,
    updateUserMsg,
  ]);
  useEffect(() => {
    dispatch(getDownLineUsers({ api: "user" }));
  }, [createUserStatus, dispatch, updateUserStatus]);

  useEffect(() => {
    dispatch(getDownLineUsers({ api: `user?${queryString}` }));
  }, [queryString, dispatch]);
  console.log(userSelect);
  const editModal = () => {
    return (
      <CustomInput
        type="number"
        placeholder={"Top Up Amount"}
        value={topUpAmt}
        onChange={(e) => setTopUpAmt(e.target.value)}
      />
    );
  };
  return (
    <Container>
      {
        <ModalCmp
          open={copyOpen}
          onCancel={() => {
            setCopyOpen(false);
          }}
          footer={null}
          title={"Copy Text"}
          text={
            <>
              <button
                className="bg-[#3c8dbc] text-white p-2 rounded mr-auto"
                onClick={() =>
                  handleCopyAll(
                    `User Id: ${createdUser?.name}\nPassword: ${createdUser?.password}\nLink: https://batman688.vip`,
                    setIsCopied
                  )
                }
              >
                {isCopied ? <FaCheck /> : <FaCopy />}
              </button>
              <div className="flex flex-col gap-2">
                <p>UserId: {createdUser?.name}</p>
                <p>Password: {createdUser?.password}</p>
                <p>Link: https://batman688.vip</p>
              </div>
            </>
          }
        />
      }
      <ModalCmp
        open={banOpen}
        onCancel={() => setBanOpen(false)}
        onOk={() => {
          setBanOpen(false);
          dispatch(
            updateUser({ api: `user/${userId}`, pData: { status: false } })
          );
        }}
        title="Ban User"
        text={"Are you sure you want to ban this user?"}
      />
      <ModalCmp
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        onOk={() => {
          setEditOpen(false);
          dispatch(
            updateUser({
              api: `user/${userId}`,
              pData: { deposits: minus ? -topUpAmt : topUpAmt },
            })
          );
          setTopUpAmt("");
        }}
        title="TopUp User"
        text={editModal()}
      />
      <Notification />
      <div className="shadow-md p-2">
        <PagesTitle title={"Users"} />
        <CustomForm data={createUserInputs} onFinish={onFinish} />
        <div className="py-2 flex flex-wrap gap-4">
          <CustomSelect
            searchable={true}
            options={userSelect || []}
            className={"w-[12rem]"}
            onChange={(e) => {
              setSearchParams((prev) => ({ ...prev, id: e }));
            }}
          />
        </div>
        <CustomTable
          data={userList}
          loading={userListStatus === "loading"}
          columns={userColumns(setBanOpen, setEditOpen, setUserId, setMinus)}
        />
      </div>
    </Container>
  );
};

export default Users;
