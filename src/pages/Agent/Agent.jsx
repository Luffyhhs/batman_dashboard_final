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
  updateUser,
} from "../../app/UserSlice/UserSlice";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";
import CustomTable from "../../components/Tables/Table";
import { agentColumns } from "../../constants/TableColumn";
import Loader from "../../components/Loader/Loader";
import ModalCmp from "../../components/Modal/ModalCmp";
import CustomInput from "../../components/Inputs/CustomInput";

const Agent = () => {
  const dispatch = useDispatch();
  const createUserStatus = useSelector((state) => state.user.createUserStatus);
  const updateUserStatus = useSelector((state) => state.user.updateUserStatus);
  console.log(updateUserStatus);
  const updateUserMsg = useSelector((state) => state.user.updateUserMsg);
  const createUserMsg = useSelector((state) => state.user.createUserMsg);
  const userList = useSelector((state) => state.user.userList);

  const [banOpen, setBanOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [topUpAmt, setTopUpAmt] = useState(0);
  console.log(userList);
  const getDownLineAgent = useCallback(() => {
    dispatch(getDownLineUsers({ api: "user?role=Agent" }));
  }, [dispatch]);
  const onFinish = (values) => {
    values.role = "Agent";
    console.log(values);
    dispatch(createUser({ api: "user", pData: values }));
  };
  useEffect(() => {
    getDownLineAgent();
  }, [getDownLineAgent, updateUserStatus]);
  useEffect(() => {
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

  const editModal = () => {
    return (
      <CustomInput
        type="number"
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
            updateUser({ api: `user/${agentId}`, pData: { unit: topUpAmt } })
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
          data={userList}
          columns={agentColumns(setBanOpen, setEditOpen, setAgentId)}
        />
      </div>
    </Container>
  );
};

export default Agent;
