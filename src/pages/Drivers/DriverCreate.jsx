import React, { useEffect } from "react";
import Container from "../../components/Container";
import { driverInputs } from "../../constants/FormInputs";
import CustomForm from "../../components/Forms/CustomForm";
import { useNavigate } from "react-router-dom";
import PagesTitle from "../../components/PagesTitle";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { base64Changer, dateFormatChange } from "../../utilities/UtilFunctions";
import {
  createDriver,
  selectCreateDriverMsg,
  selectCreateDriverStatus,
} from "../../app/UserSlice/UserSlice";
import { toast } from "react-toastify";

const DriverCreate = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const final = await base64Changer(values, ["dphoto"]);
    final.licenceexpiredate = dateFormatChange(final.licenceexpiredate);
    final.dob = dateFormatChange(final.dob);
    final.loginId = final.phone;
    dispatch(createDriver({ api: "driver_create", pData: final }));
  };
  const createDriverStatus = useSelector(selectCreateDriverStatus);
  const createDriverMsg = useSelector(selectCreateDriverMsg);
  useEffect(() => {
    createDriverStatus === "fail" &&
      toast.error(createDriverMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    createDriverStatus === "success" &&
      toast.success(createDriverMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    if (createDriverStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      return () => clearTimeout(timer);
    }
    // createDriverStatus === "success" && nav(-1);
  }, [createDriverStatus]);
  return (
    <Container>
      <Notification />
      <Loader spin={createDriverStatus === "loading"} />
      <PagesTitle title={"Add New Driver"} />
      <div className="p-8">
        <CustomForm data={driverInputs} onFinish={onFinish} />
      </div>
    </Container>
  );
};

export default DriverCreate;
