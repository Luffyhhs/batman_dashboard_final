import React, { useEffect, useState } from "react";
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
  updateUser,
} from "../../app/UserSlice/UserSlice";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";
import ModalCmp from "../../components/Modal/ModalCmp";
import CustomInput from "../../components/Inputs/CustomInput";

const Users = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const currentUser = useSelector(selectUser);
  const createUserStatus = useSelector((state) => state.user.createUserStatus);
  const createUserMsg = useSelector((state) => state.user.createUserMsg);
  const updateUserMsg = useSelector((state) => state.user.updateUserMsg);
  const updateUserStatus = useSelector((state) => state.user.updateUserStatus);

  const [banOpen, setBanOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [topUpAmt, setTopUpAmt] = useState(0);

  const onFinish = (values) => {
    values.upLine = currentUser._id;
    dispatch(createUser({ api: "user", pData: values }));
  };
  useEffect(() => {
    if (createUserStatus === "success") {
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

  const editModal = () => {
    return (
      <CustomInput
        type="number"
        placeholder={"Top Up Amount"}
        onChange={(e) => setTopUpAmt(e.target.value)}
      />
    );
  };
  return (
    <Container>
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
            updateUser({ api: `user/${userId}`, pData: { deposits: topUpAmt } })
          );
        }}
        title="TopUp User"
        text={editModal()}
      />
      <Notification />
      <div className="shadow-md p-2">
        <PagesTitle title={"Users"} />
        <CustomForm data={createUserInputs} onFinish={onFinish} />
        <CustomTable
          data={userList}
          columns={userColumns(setBanOpen, setEditOpen, setUserId)}
        />
      </div>
    </Container>
  );
};

export default Users;
