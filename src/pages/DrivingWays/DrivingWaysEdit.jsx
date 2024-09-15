import React, { useEffect } from "react";
import Container from "../../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../components/Buttons/CustomButton";
import CustomForm from "../../components/Forms/CustomForm";
import { drivingWayInputs } from "../../constants/FormInputs";
import { useDispatch, useSelector } from "react-redux";
import { selectDriverSelectInputs } from "../../app/UserSlice/UserSlice";
import { selectCarSelectInputs } from "../../app/CarSlice/CarSlice";
import {
  base64Changer,
  photoUrlFix,
  timeFormatChange,
} from "../../utilities/UtilFunctions";
import PagesTitle from "../../components/PagesTitle";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader/Loader";
import {
  selectUpdateDrivingHistoryMsg,
  selectUpdateDrivingHistoryStatus,
  updateDrivingHistory,
} from "../../app/DrivingHistorySlice/DrivingHistorySlice";
import { toast } from "react-toastify";

const DrivingWaysEdit = () => {
  const location = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const driversSelectBox = useSelector(selectDriverSelectInputs);
  const carsSelectBox = useSelector(selectCarSelectInputs);
  const drivingEditStatus = useSelector(selectUpdateDrivingHistoryStatus);
  const drivingEditMsg = useSelector(selectUpdateDrivingHistoryMsg);
  const { id } = location.state;
  // console.log(location.state);
  const initialValues = {
    ...location.state,
    car_id: `${location.state.car_id}`,
    driver_id: `${location.state.driver_id}`,
  };
  // console.log(initialValues);

  const specificAttributes = ["startKilo_photo", "endKilo_photo"];

  const getChangedValues = (initial, current, attributes) => {
    let changedValues = {};
    for (let key of attributes) {
      if (current[key] !== initial[key]) {
        changedValues[key] = current[key];
      }
    }
    return changedValues;
  };
  const onFinish = async (values) => {
    const changedValues = getChangedValues(
      initialValues,
      values,
      specificAttributes
    );
    const final = await base64Changer(values, Object.keys(changedValues));
    // console.log("Update final:", final);
    final.start_time = timeFormatChange(final.start_time);
    final.end_time = timeFormatChange(final.end_time);
    final.start_kilo = `${final.start_kilo}`;
    final.end_kilo = `${final.end_kilo}`;
    const filteredFinal = {};
    for (const key in final) {
      if (final.hasOwnProperty(key)) {
        if (typeof final[key] === "string" && !final[key].startsWith("https")) {
          filteredFinal[key] = final[key];
        }
      }
    }
    // console.log(filteredFinal);

    // const final = await base64Changer(values, [
    //   "startKilo_photo",
    //   "endKilo_photo",
    // ]);
    // filteredFinal.start_time = timeFormatChange(filteredFinal.start_time);
    // filteredFinal.end_time = timeFormatChange(filteredFinal.end_time);
    dispatch(
      updateDrivingHistory({
        api: `driving_history_update/${id}`,
        pData: filteredFinal,
      })
    );
  };
  // console.log(location.state);
  useEffect(() => {
    drivingEditStatus === "success" &&
      toast.success(drivingEditMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    drivingEditStatus === "fail" &&
      toast.error(drivingEditMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    if (drivingEditStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      return () => clearTimeout(timer);
    }
  }, [drivingEditStatus]);

  const inputs = drivingWayInputs(driversSelectBox, carsSelectBox);
  return (
    <Container>
      <Notification />
      <Loader spin={drivingEditStatus === "loading"} />
      <PagesTitle title={"Edit an Existing Driving Way"} />
      <CustomForm
        data={inputs}
        initialValues={initialValues}
        text="Update"
        onFinish={onFinish}
      />
    </Container>
  );
};

export default DrivingWaysEdit;
