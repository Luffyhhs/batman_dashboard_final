import React, { useEffect } from "react";
import Container from "../../components/Container";
import CustomForm from "../../components/Forms/CustomForm";
import { termInputs } from "../../constants/FormInputs";
import PagesTitle from "../../components/PagesTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  modifyTerms,
  resetTermsModifyStatus,
} from "../../app/UiThingsSlice/UiThingsSlice";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";

const Terms = () => {
  const dispatch = useDispatch();
  const modifyTermsStatus = useSelector((state) => state.ui.modifyTermsStatus);
  const onFinish = (values) => {
    values.settingName = "Terms";
    dispatch(modifyTerms({ api: "uiThing", pData: values }));
  };

  useEffect(() => {
    if (modifyTermsStatus === "success") {
      toast.success("Succeed", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    }
    if (modifyTermsStatus === "fail") {
      toast.error("Succeed", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
    }
    (modifyTermsStatus === "fail" || modifyTermsStatus === "success") &&
      dispatch(resetTermsModifyStatus());
  }, [modifyTermsStatus]);
  return (
    <Container>
      <Notification />
      <div className="mt-2">
        <PagesTitle title={"Terms & Conditions"} />
        <CustomForm data={termInputs} onFinish={onFinish} />
      </div>
    </Container>
  );
};

export default Terms;
