import React, { useEffect } from "react";
import Container from "../../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { driverUpdateInputs } from "../../constants/FormInputs";
import CustomForm from "../../components/Forms/CustomForm";
import { base64Changer, dateFormatChange } from "../../utilities/UtilFunctions";
import PagesTitle from "../../components/PagesTitle";
import {
  selectUpdateDriverMsg,
  selectUpdateDriverStatus,
  updateDriver,
} from "../../app/UserSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader/Loader";

const DriverUpdate = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    id,
    dname,
    dphoto,
    address,
    dob,
    licenceNo,
    licenceexpiredate,
    nrc,
    phone,
  } = location.state;
  // console.log(location.state);
  const initialValues = {
    dname: dname,
    phone: phone,
    nrc: nrc,
    dob: dateFormatChange(dob),
    licenceNo: licenceNo,
    licenceexpiredate: dateFormatChange(licenceexpiredate),
    address: address,
    dphoto: dphoto,
  };
  const updateDriverMsg = useSelector(selectUpdateDriverMsg);
  const updateDriverStatus = useSelector(selectUpdateDriverStatus);

  const specificAttributes = ["dphoto"];

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
    values.licenceexpiredate = dateFormatChange(values.licenceexpiredate);
    values.dob = dateFormatChange(values.dob);
    values.loginId = values.phone;
    const changedValues = getChangedValues(
      initialValues,
      values,
      specificAttributes
    );
    if (Object.keys(values).length > 0) {
      const final = await base64Changer(values, Object.keys(changedValues));
      // console.log("Update final:", final);
      const filteredFinal = {};
      for (const key in final) {
        if (final.hasOwnProperty(key)) {
          if (
            typeof final[key] === "string" &&
            !final[key].startsWith("https")
          ) {
            filteredFinal[key] = final[key];
          }
        }
      }
      // console.log(filteredFinal);
      try {
        dispatch(
          updateDriver({ api: `driver_update/${id}`, pData: filteredFinal })
        );
      } catch (error) {
        // console.error("Update failed:", error);
      }
    } else {
      // console.log("No changes detected.");
    }
  };
  useEffect(() => {
    if (updateDriverStatus === "fail") {
      toast.error(updateDriverMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }

    if (updateDriverStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      toast.success(updateDriverMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
      return () => clearTimeout(timer);
    }
    // updateDriverStatus === "success" && nav(-1);
  }, [updateDriverStatus]);
  return (
    <Container>
      <Notification />
      <Loader spin={updateDriverStatus === "loading"} />
      <PagesTitle title={"Edit an Existing Driver"} />
      <div className="p-8">
        <CustomForm
          data={driverUpdateInputs}
          onFinish={onFinish}
          initialValues={initialValues}
          text="Update"
        />
      </div>
    </Container>
  );
};

export default DriverUpdate;
