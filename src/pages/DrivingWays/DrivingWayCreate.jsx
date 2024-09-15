import React, { useEffect } from "react";
import Container from "../../components/Container";
import CustomButton from "../../components/Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomForm from "../../components/Forms/CustomForm";
import { drivingWayInputs } from "../../constants/FormInputs";
import { useDispatch, useSelector } from "react-redux";
import PagesTitle from "../../components/PagesTitle";
import { selectDriverSelectInputs } from "../../app/UserSlice/UserSlice";
import { selectCarSelectInputs } from "../../app/CarSlice/CarSlice";
import {
  createDrivingHistory,
  selectCreateDrivingHistoryMsg,
  selectCreateDrivingHistoryStatus,
} from "../../app/DrivingHistorySlice/DrivingHistorySlice";
import { base64Changer, timeFormatChange } from "../../utilities/UtilFunctions";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader/Loader";

const DrivingWayCreate = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const driversSelectBox = useSelector(selectDriverSelectInputs);
  const carsSelectBox = useSelector(selectCarSelectInputs);
  const drivingCreateStatus = useSelector(selectCreateDrivingHistoryStatus);
  const drivingCreateMsg = useSelector(selectCreateDrivingHistoryMsg);
  const inputs = drivingWayInputs(driversSelectBox, carsSelectBox);
  const onFinish = async (values) => {
    const final = await base64Changer(values, [
      "startKilo_photo",
      "endKilo_photo",
    ]);
    final.start_time = timeFormatChange(final.start_time);
    final.end_time = timeFormatChange(final.end_time);
    dispatch(createDrivingHistory({ api: "create_report", pData: final }));
  };
  useEffect(() => {
    drivingCreateStatus === "success" &&
      toast.success(drivingCreateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    drivingCreateStatus === "fail" &&
      toast.error(drivingCreateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    if (drivingCreateStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      return () => clearTimeout(timer);
    }
  }, [drivingCreateStatus]);
  return (
    <Container>
      <Loader spin={drivingCreateStatus === "loading"} />
      <Notification />
      <PagesTitle title={"Add New Driving Way"} />
      <CustomForm data={inputs} onFinish={onFinish} />
    </Container>
  );
};

export default DrivingWayCreate;
