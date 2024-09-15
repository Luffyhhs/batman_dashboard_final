import React, { useEffect } from "react";
import Container from "../../components/Container";
import CustomForm from "../../components/Forms/CustomForm";
import PagesTitle from "../../components/PagesTitle";
import {
  modifyMoreWinnerInputs,
  top10Inputs,
} from "../../constants/FormInputs";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import {
  addMoreWinner,
  modifyTopList,
  resetAddMoreWinnerStatus,
  resetModifyTopListStatus,
} from "../../app/UiThingsSlice/UiThingsSlice";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";

const Top10 = () => {
  const dispatch = useDispatch();
  const addMoreWinnerStatus = useSelector(
    (state) => state.ui.addMoreWinnerStatus
  );
  const addMoreWinnerMsg = useSelector((state) => state.ui.addMoreWinnerMsg);
  const modifyTopListStatus = useSelector(
    (state) => state.ui.modifyTopListStatus
  );
  const modifyTopListMsg = useSelector((state) => state.ui.modifyTopListMsg);
  const onFinish = (values) => {
    const data = { settingName: "More Winner", moreName: values };
    dispatch(addMoreWinner({ api: "uiThing", postData: data }));
    console.log(data);
  };
  const topListOnFinish = (values) => {
    const { settingName, ...rest } = values;
    const data = { settingName, topName: rest };
    dispatch(modifyTopList({ api: "uiThing", postData: data }));
  };

  useEffect(() => {
    if (
      modifyTopListStatus === "success" ||
      addMoreWinnerStatus === "success"
    ) {
      toast.success("Succeed", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
      modifyTopListStatus === "success" && dispatch(resetModifyTopListStatus());
      addMoreWinnerStatus === "success" && dispatch(resetAddMoreWinnerStatus());
    } else if (modifyTopListStatus === "fail") {
      toast.error(modifyTopListMsg, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    } else if (addMoreWinnerStatus === "fail") {
      toast.error(addMoreWinnerMsg, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    }
  }, [modifyTopListStatus, addMoreWinnerStatus]);
  return (
    <Container>
      <Notification />
      <Loader
        spin={
          addMoreWinnerStatus === "loading" || modifyTopListStatus === "loading"
        }
      />
      <div className="mt-2 grid grid-cols-1 gap-y-2">
        <div className=" col-span-1 shadow-md py-2">
          <PagesTitle title={"Add MoreWinners List"} />
          <CustomForm data={modifyMoreWinnerInputs()} onFinish={onFinish} />
        </div>
        <div className=" col-span-1 shadow-md py-2">
          <PagesTitle title={"Modify Top 10 List"} />
          <CustomForm data={top10Inputs} onFinish={topListOnFinish} />
        </div>
      </div>
    </Container>
  );
};

export default Top10;
