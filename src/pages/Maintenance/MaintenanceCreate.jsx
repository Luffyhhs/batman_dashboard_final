import React, { useEffect } from "react";
import Container from "../../components/Container";
import PagesTitle from "../../components/PagesTitle";
import CustomForm from "../../components/Forms/CustomForm";
import { maintenanceInputs } from "../../constants/FormInputs";
import { useDispatch, useSelector } from "react-redux";
import { selectDriverSelectInputs } from "../../app/UserSlice/UserSlice";
import { selectCarSelectInputs } from "../../app/CarSlice/CarSlice";
import {
  createMaintenance,
  selectCreateMaintenanceMsg,
  selectCreateMaintenanceStatus,
} from "../../app/MaintenanceSlice/MaintenanceSlice";
import { dateFormatChange } from "../../utilities/UtilFunctions";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const MaintenanceCreate = () => {
  const dispatch = useDispatch();
  const driversSelectBox = useSelector(selectDriverSelectInputs);
  const carsSelectBox = useSelector(selectCarSelectInputs);
  const maintenanceCreateStatus = useSelector(selectCreateMaintenanceStatus);
  const maintenanceCreateMsg = useSelector(selectCreateMaintenanceMsg);
  const inputs = maintenanceInputs(driversSelectBox, carsSelectBox);
  const onFinish = async (values) => {
    // const final = await base64Changer(values, ["vPhoto"]);
    // console.log(values);
    values.created_at = dateFormatChange(values.created_at);
    dispatch(createMaintenance({ api: "createMaintenance", pData: values }));
  };
  useEffect(() => {
    maintenanceCreateStatus === "success" &&
      toast.success(maintenanceCreateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    maintenanceCreateStatus === "fail" &&
      toast.error(maintenanceCreateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
  }, [maintenanceCreateStatus]);
  return (
    <Container>
      <Loader spin={maintenanceCreateStatus === "loading"} />
      <PagesTitle title={"Add New Maintenance"} />
      <div className="p-8">
        <CustomForm data={inputs} onFinish={onFinish} />
      </div>
    </Container>
  );
};

export default MaintenanceCreate;
