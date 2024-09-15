import { useEffect } from "react";
import Container from "../../components/Container";
import PagesTitle from "../../components/PagesTitle";
import CustomForm from "../../components/Forms/CustomForm";
import { useLocation, useNavigate } from "react-router-dom";
import { maintenanceEditInputs } from "../../constants/FormInputs";
import { dateFormatChange } from "../../utilities/UtilFunctions";
import { useDispatch, useSelector } from "react-redux";
import { selectCarSelectInputs } from "../../app/CarSlice/CarSlice";
import { selectDriverSelectInputs } from "../../app/UserSlice/UserSlice";
import {
  selectUpdateMaintenanceMsg,
  selectUpdateMaintenanceStatus,
  updateMaintenance,
} from "../../app/MaintenanceSlice/MaintenanceSlice";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";

const MaintenanceEdit = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const carsSelectInputs = useSelector(selectCarSelectInputs);
  const driversSelectInputs = useSelector(selectDriverSelectInputs);
  const updateMaintenanceStatus = useSelector(selectUpdateMaintenanceStatus);
  const updateMaintenanceMsg = useSelector(selectUpdateMaintenanceMsg);

  const inputs = maintenanceEditInputs(driversSelectInputs, carsSelectInputs);
  // console.log(updateMaintenanceStatus);
  const initialValues = {
    ...location.state,
    car_no: `${location.state.car_id}`,
    driver_name: `${location.state.driver_id}`,
    v_photo: location.state.photo,
    // driver_name: location.state.dname,
    created_at: dateFormatChange(location.state.created_at),
  };
  // console.log(initialValues);

  const onFinish = async (values) => {
    try {
      values.created_at = dateFormatChange(values.created_at);
      dispatch(
        updateMaintenance({ api: `editMaintenance/${id}`, pData: values })
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (updateMaintenanceStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      toast.success(updateMaintenanceMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
      return () => clearTimeout(timer);
    }
  }, [updateMaintenanceStatus]);
  // console.log(initialValues);
  return (
    <Container>
      <Loader spin={updateMaintenanceStatus === "loading"} />
      <Notification />
      <PagesTitle title={"Edit an Existing Maintenance"} />
      <div className="p-8">
        <CustomForm
          onFinish={onFinish}
          initialValues={initialValues}
          data={inputs}
          text="Update"
        />
      </div>
    </Container>
  );
};

export default MaintenanceEdit;
