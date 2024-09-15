import React, { useEffect } from "react";
import Container from "../../components/Container";
import PagesTitle from "../../components/PagesTitle";
import CustomForm from "../../components/Forms/CustomForm";
import { userInputs } from "../../constants/FormInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  resetCreateUserStatus,
  selectUserCreateMsg,
  selectUserCreateStatus,
} from "../../app/UserSlice/UserSlice";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

const UserCreate = () => {
  const dispatch = useDispatch();
  const userCreateStatus = useSelector(selectUserCreateStatus);
  const userCreateMsg = useSelector(selectUserCreateMsg);

  const onFinish = async (values) => {
    // const final = await base64Changer(values, ["photo"]);
    dispatch(createUser({ api: `createUser`, pData: values }));
  };
  useEffect(() => {
    userCreateStatus === "success" &&
      toast.success(userCreateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    userCreateStatus === "fail" &&
      toast.error(userCreateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    (userCreateStatus === "success" ||
      userCreateStatus === "fail" ||
      userCreateStatus === "loading") &&
      dispatch(resetCreateUserStatus());
  }, [userCreateStatus]);
  return (
    <Container>
      <Notification />
      <Loader spin={userCreateStatus === "loading"} />
      <PagesTitle title={"Add New User"} />
      <div className="p-8">
        <CustomForm data={userInputs} onFinish={onFinish} />
      </div>
    </Container>
  );
};

export default UserCreate;
