import { useEffect } from "react";
import Container from "../components/Container";
import CustomForm from "../components/Forms/CustomForm";
import { carNew } from "../constants/FormInputs";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Changer, dateFormatChange } from "../utilities/UtilFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUpdateCarError,
  selectUpdateCarMsg,
  selectUpdateCarStatus,
  updateCar,
} from "../app/CarSlice/CarSlice";
import Notification from "../components/Notification";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import PagesTitle from "../components/PagesTitle";

const CarUpdate = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // console.log(location?.state, carNew);
  const { id, licenceexpiredate } = location.state;
  // console.log(location.state);
  const initialValues = {
    ...location.state,
    licenceexpiredate: dateFormatChange(licenceexpiredate),
  };
  // const getChangedValues = (initial, current) => {
  //   let changedValues = {};
  //   for (let key in current) {
  //     if (current[key] !== initial[key]) {
  //       changedValues[key] = current[key];
  //     }
  //   }
  //   return changedValues;
  // };
  const updateCarError = useSelector(selectUpdateCarError);
  const updateCarMsg = useSelector(selectUpdateCarMsg);
  const updateCarStatus = useSelector(selectUpdateCarStatus);

  const specificAttributes = [
    "photo",
    "licence_front",
    "licence_back",
    "owner_book",
  ];

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
    const changedValues = getChangedValues(
      initialValues,
      values,
      specificAttributes
    );
    // console.log(changedValues);
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
        dispatch(updateCar({ api: `car_update/${id}`, pData: filteredFinal }));
      } catch (error) {
        console.error("Update failed:", error);
      }
    } else {
      // console.log("No changes detected.");
    }
  };
  useEffect(() => {
    if (updateCarError) {
      toast.error(updateCarMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
    updateCarStatus === "success" &&
      toast.success(updateCarMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    if (updateCarStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      return () => clearTimeout(timer);
    }
    // updateCarStatus === "success" && nav(-1);
  }, [updateCarError, updateCarStatus]);
  return (
    <Container>
      <Notification />
      <Loader
        spin={updateCarStatus === "loading"}
        fullscreen
        percent={"auto"}
      />
      <PagesTitle title={"Edit an Existing Car"} />
      <div className="p-8">
        <CustomForm
          data={carNew}
          initialValues={initialValues}
          onFinish={onFinish}
          text="Update"
        />
      </div>
    </Container>
  );
};

export default CarUpdate;
