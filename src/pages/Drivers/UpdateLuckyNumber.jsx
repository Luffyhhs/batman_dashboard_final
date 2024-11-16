import React, { useEffect } from "react";
import Container from "../../components/Container";
import CustomForm from "../../components/Forms/CustomForm";
import PagesTitle from "../../components/PagesTitle";
import { updateLuckyInputs } from "../../constants/FormInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUpdateLuckyStatus,
  updateLucky,
} from "../../app/LuckySlice/LuckySlice";
import Loader from "../../components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";

const UpdateLuckyNumber = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const agentSelectBox = useSelector((state) => state.user.agentSelectBox);
  // console.log(agentSelectBox);
  const updateLuckyStatus = useSelector(
    (state) => state.lucky.updateLuckyStatus
  );
  const updateLuckyMsg = useSelector((state) => state.lucky.updateLuckyMsg);
  const onFinish = (values) => {
    values.status = "preset";
    // console.log(values);
    dispatch(
      updateLucky({ api: `lucky/${location.state._id}`, pData: values })
    );
  };
  useEffect(() => {
    updateLuckyStatus === "success" &&
      toast.success("Succeed", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });

    updateLuckyStatus === "fail" &&
      toast.error(updateLuckyMsg, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
  }, [updateLuckyStatus, updateLuckyMsg]);
  useEffect(() => {
    if (updateLuckyStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
        // console.log("work");
        dispatch(resetUpdateLuckyStatus());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [updateLuckyStatus, dispatch]);
  return (
    <Container>
      <Notification />
      <Loader spin={updateLuckyStatus === "loading"} />
      <div className="shadow-md p-2">
        <PagesTitle btn={true} title={"Update Lucky"} />
        <div className="mt-2">
          <CustomForm
            data={updateLuckyInputs(agentSelectBox)}
            text="Update"
            onFinish={onFinish}
          />
        </div>
      </div>
    </Container>
  );
};

export default UpdateLuckyNumber;
