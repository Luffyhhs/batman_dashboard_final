import React, { useEffect } from "react";
import Container from "../../components/Container";
import CustomForm from "../../components/Forms/CustomForm";
import PagesTitle from "../../components/PagesTitle";
import { updateReward } from "../../constants/FormInputs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modifyReward } from "../../app/RewardSlice/rewardSlice";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";

const UpdateReward = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const modifyRewardStatus = useSelector(
    (state) => state.reward.modifyRewardStatus
  );
  const modifyRewardMsg = useSelector((state) => state.reward.modifyRewardMsg);
  useEffect(() => {
    if (modifyRewardStatus === "success") {
      toast.success(modifyRewardMsg, {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
      if (modifyRewardStatus === "success") {
        const timer = setTimeout(() => {
          nav(-1);
        }, 2000); // 2000 milliseconds = 2 seconds
        // Cleanup the timer if the component unmounts or drivingCreateStatus changes
        return () => clearTimeout(timer);
      }
    } else if (modifyRewardStatus === "fail") {
      toast.error(modifyRewardMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
  });
  const onFinish = async (values) => {
    values.name = location.state.name;
    dispatch(modifyReward({ api: "reward", postData: values }));
  };
  console.log(location);
  return (
    <Container>
      <Notification />
      <PagesTitle title={"Update Reward"} btn={true} />
      <div className="p-5 shadow-xl mt-4">
        <CustomForm
          data={updateReward}
          text="Update"
          initialValues={{ ...location.state }}
          onFinish={onFinish}
        />
      </div>
    </Container>
  );
};

export default UpdateReward;
