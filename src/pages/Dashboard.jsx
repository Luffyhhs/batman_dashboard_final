import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../components/Tables/Table";

import { carouselAdsColumns, wheelColumns } from "../constants/TableColumn";
import { useNavigate } from "react-router-dom";
import CustomForm from "../components/Forms/CustomForm";
import { adsInputs, wheelInputs } from "../constants/FormInputs";
import {
  deleteAds,
  getAds,
  getWheel,
  modifyAds,
  modifyWheel,
  resetAdsDeleteStatus,
  resetAdsModifyStatus,
  resetWheelStatus,
} from "../app/UiThingsSlice/UiThingsSlice";
import ModalCmp from "../components/Modal/ModalCmp";
import { postData } from "../utilities/ApiCalls";
import Notification from "../components/Notification";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [adsId, setAdsId] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const nav = useNavigate();
  // console.log(
  //   currentDate.getFullYear(),
  //   currentDate.toLocaleDateString("default", { month: "short" })
  // );
  const columns = carouselAdsColumns(setAdsId, setOpen);
  const columnsWheel = wheelColumns();

  const adsArr = useSelector((state) => state.ui.adsArr);
  const wheelArr = useSelector((state) => state.ui.wheelArr);

  const deleteAdsStatus = useSelector((state) => state.ui.deleteAdsStatus);
  const modifyAdsStatus = useSelector((state) => state.ui.modifyAdsStatus);
  const modifyWheelStatus = useSelector((state) => state.ui.modifyWheelStatus);

  const deleteAdsMsg = useSelector((state) => state.ui.deleteAdsMsg);
  const modifyAdsMsg = useSelector((state) => state.ui.modifyAdsMsg);
  const modifyWheelMsg = useSelector((state) => state.ui.modifyWheelMsg);

  // console.log(adsArr);
  useEffect(() => {
    dispatch(getAds({ api: "ads" }));
    (deleteAdsStatus === "fail" || deleteAdsStatus === "success") &&
      dispatch(resetAdsDeleteStatus());

    (modifyAdsStatus === "fail" || modifyAdsStatus === "success") &&
      dispatch(resetAdsModifyStatus());
  }, [deleteAdsStatus, modifyAdsStatus]);
  useEffect(() => {
    dispatch(getWheel({ api: "wheel" }));
    (modifyWheelStatus === "fail" || modifyWheelStatus === "success") &&
      dispatch(resetWheelStatus());
  }, [modifyWheelStatus]);
  // console.log(modifyWheelStatus, deleteAdsStatus);
  const adsOnFinish = (values) => {
    dispatch(modifyAds({ api: `ads`, postData: values }));
  };
  const wheelOnFinish = (values) => {
    dispatch(
      modifyWheel({ api: "wheel", postData: { ...values, name: "Wheel" } })
    );
  };
  useEffect(() => {
    if (deleteAdsStatus === "success") {
      toast.success(deleteAdsMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
    if (modifyAdsStatus === "success") {
      toast.success(modifyAdsMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
    if (modifyWheelStatus === "success") {
      toast.success(modifyWheelMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
  }, [modifyAdsStatus, modifyWheelStatus, deleteAdsStatus]);
  return (
    <Container>
      <Notification />
      <Loader
        spin={
          deleteAdsStatus === "loading" ||
          modifyAdsStatus === "loading" ||
          modifyWheelStatus === "loading"
        }
        fullscreen={true}
      />
      <ModalCmp
        title={"Delete Ads"}
        open={open}
        text={"Are you sure to delete this ads?"}
        onCancel={() => setOpen(false)}
        onOk={() => {
          dispatch(deleteAds({ api: `ads/${adsId}` }));
          setOpen(false);
        }}
      />
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
        <div className="col-span-1 py-2 shadow-md">
          <p className=" px-2 text-2xl font-semibold">Carousel Ads</p>
          <CustomTable columns={columns} data={adsArr} />
        </div>

        <div className="col-span-1 py-2 shadow-md">
          <p className=" px-2 text-2xl font-semibold">Wheel</p>
          <CustomTable columns={columnsWheel} data={wheelArr} />
        </div>
        <div className="col-span-1 py-2 shadow-md">
          <p className=" px-2 text-2xl font-semibold mb-4">
            Create (OR) Modify Ads
          </p>
          <CustomForm onFinish={adsOnFinish} text="Submit" data={adsInputs} />
        </div>
        <div className="col-span-1 py-2 shadow-md">
          <p className=" px-2 text-2xl font-semibold mb-4">Modify Wheel</p>
          <CustomForm
            text="Submit"
            data={wheelInputs}
            onFinish={wheelOnFinish}
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
