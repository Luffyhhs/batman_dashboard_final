import React, { useCallback, useEffect, useState } from "react";
import Container from "../../components/Container";
import CustomForm from "../../components/Forms/CustomForm";
import PagesTitle from "../../components/PagesTitle";
import { createUserInputs } from "../../constants/FormInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  getDownLineUsers,
  resetCreateUserStatus,
  resetUpdateUserStatus,
  selectUser,
  selectUserListStatus,
  updateUser,
} from "../../app/UserSlice/UserSlice";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";
import CustomTable from "../../components/Tables/Table";
import { agentColumns } from "../../constants/TableColumn";
import Loader from "../../components/Loader/Loader";
import ModalCmp from "../../components/Modal/ModalCmp";
import CustomInput from "../../components/Inputs/CustomInput";
import { FaCheck, FaCopy } from "react-icons/fa6";

const Agent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const createUserStatus = useSelector((state) => state.user.createUserStatus);
  const updateUserStatus = useSelector((state) => state.user.updateUserStatus);
  // console.log(updateUserStatus);
  const updateUserMsg = useSelector((state) => state.user.updateUserMsg);
  const createUserMsg = useSelector((state) => state.user.createUserMsg);
  const userList = useSelector((state) => state.user.userList);
  const userListStatus = useSelector(selectUserListStatus);

  const [banOpen, setBanOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [topUpAmt, setTopUpAmt] = useState("");
  const [copyOpen, setCopyOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [createdUser, setCreatedUser] = useState({});
  const [minus, setMinus] = useState(false);

  // console.log(userList);
  const getDownLineAgent = useCallback(() => {
    dispatch(getDownLineUsers({ api: "user?role=Agent" }));
  }, [dispatch]);
  const onFinish = (values) => {
    values.role = "Agent";
    values.upLine = currentUser._id;
    setCreatedUser(values);
    // console.log(values);
    dispatch(createUser({ api: "user", pData: values }));
  };
  useEffect(() => {
    getDownLineAgent();
  }, [getDownLineAgent, updateUserStatus]);
  useEffect(() => {
    if (createUserStatus === "success") {
      setCopyOpen(true);
    }

    if (createUserStatus === "success" || updateUserStatus === "success") {
      toast.success("Succeed", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
      getDownLineAgent();
    } else if (createUserStatus === "fail") {
      toast.error(createUserMsg, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    } else if (updateUserStatus === "fail") {
      toast.error(updateUserMsg, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    }
    (createUserStatus === "success" || createUserStatus === "fail") &&
      dispatch(resetCreateUserStatus());
    (updateUserStatus === "success" || updateUserStatus === "fail") &&
      dispatch(resetUpdateUserStatus());
  }, [createUserStatus, updateUserStatus]);
  const handleCopyAll = async () => {
    const textToCopy = `User Id: ${createdUser?.name}\nPassword: ${createdUser?.password}\nLink: https://lucky-portal.batman688.vip`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const editModal = () => {
    return (
      <CustomInput
        type="number"
        value={topUpAmt}
        placeholder={"Top Up Amount"}
        onChange={(e) => {
          setTopUpAmt(e.target.value);
        }}
      />
    );
  };
  return (
    <Container>
      <ModalCmp
        open={copyOpen}
        onCancel={() => setCopyOpen(false)}
        onOk={handleCopyAll}
        footer={null}
        title={"Copy All"}
        text={
          <>
            <button
              className="bg-[#3c8dbc] text-white p-2 rounded mr-auto"
              onClick={handleCopyAll}
            >
              {isCopied ? <FaCheck /> : <FaCopy />}
            </button>
            <div className="flex flex-col gap-2">
              <p>UserId: {createdUser?.name}</p>
              <p>Password: {createdUser?.password}</p>
              <p>Link: https://lucky-portal.batman688.vip</p>
            </div>
          </>
        }
      />
      <ModalCmp
        open={banOpen}
        onCancel={() => setBanOpen(false)}
        onOk={() => {
          dispatch(
            updateUser({ api: `user/${agentId}`, pData: { status: false } })
          );
          setBanOpen(false);
        }}
        title={"Ban Agent"}
        text={"Are you sure you want to ban this agent?"}
      />
      <ModalCmp
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        onOk={() => {
          setEditOpen(false);
          dispatch(
            updateUser({
              api: `user/${agentId}`,
              pData: { unit: minus ? -topUpAmt : topUpAmt },
            })
          );
          setTopUpAmt("");
        }}
        title={"TopUp Agent"}
        text={editModal()}
      />
      <Loader spin={createUserStatus === "loading"} />
      <Notification />
      <div className="mt-2 shadow-sm py-2">
        <PagesTitle title={"Create Agent"} />
        <CustomForm data={createUserInputs} onFinish={onFinish} />
      </div>
      <div className="mt-4">
        <CustomTable
          loading={userListStatus === "loading"}
          data={userList}
          columns={agentColumns(setBanOpen, setEditOpen, setAgentId, setMinus)}
        />
      </div>
    </Container>
  );
};

export default Agent;
