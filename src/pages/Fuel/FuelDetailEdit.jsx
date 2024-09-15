import Container from "../../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import CustomForm from "../../components/Forms/CustomForm";
import { fuelInputs } from "../../constants/FormInputs";
import PagesTitle from "../../components/PagesTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectDriverSelectInputs } from "../../app/UserSlice/UserSlice";
import { selectCarSelectInputs } from "../../app/CarSlice/CarSlice";
import {
  selectUpdateFuelMsg,
  selectUpdateFuelStatus,
  updateFuel,
} from "../../app/FuelSlice/FuelSlice";

import { toast } from "react-toastify";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import Notification from "../../components/Notification";

const FuelDetailEdit = () => {
  const nav = useNavigate();
  const location = useLocation();
  // console.log(location.state);
  const { id } = location.state;
  const initialValues = location.state;
  initialValues.car_no = `${location.state.car_id}`;
  initialValues.driver_name = `${location.state.driver_id}`;
  const dispatch = useDispatch();
  const fuelUpdateStatus = useSelector(selectUpdateFuelStatus);
  const fuelUpdateMsg = useSelector(selectUpdateFuelMsg);
  const driversSelectBox = useSelector(selectDriverSelectInputs);
  const carsSelectBox = useSelector(selectCarSelectInputs);
  const inputs = fuelInputs(driversSelectBox, carsSelectBox);

  const onFinish = async (values) => {
    // const final = await base64Changer(values, ["photo"]);
    // console.log(final);
    try {
      dispatch(updateFuel({ api: `editFuel/${id}`, pData: values }));
    } catch (error) {
      // console.log("update failed :", error);
    } finally {
      fuelUpdateStatus === "success" && nav(-1);
    }
  };
  useEffect(() => {
    fuelUpdateStatus === "fail" &&
      toast.error(fuelUpdateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    if (fuelUpdateStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      toast.success(fuelUpdateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
      return () => clearTimeout(timer);
    }
  }, [fuelUpdateStatus]);
  // console.log(location.state);
  return (
    <Container>
      <Loader spin={fuelUpdateStatus === "loading"} />
      <Notification />
      <PagesTitle title={"Edit an Existing Fuel"} />
      <div className="p-8">
        <CustomForm
          initialValues={location.state}
          data={inputs}
          onFinish={onFinish}
          text="Update"
        />
      </div>
    </Container>
  );
};

export default FuelDetailEdit;
