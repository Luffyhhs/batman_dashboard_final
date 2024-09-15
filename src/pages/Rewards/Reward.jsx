import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import CustomForm from "../../components/Forms/CustomForm";
import { rewardInputs } from "../../constants/FormInputs";
import CustomTable from "../../components/Tables/Table";
import Notification from "../../components/Notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReward,
  getReward,
  modifyReward,
  resetDeleteRewardStatus,
  resetModifyRewardStatus,
} from "../../app/RewardSlice/rewardSlice";
import { toast } from "react-toastify";
import { rewardColumns } from "../../constants/TableColumn";
import ModalCmp from "../../components/Modal/ModalCmp";
import Loader from "../../components/Loader/Loader";

const Reward = () => {
  const [open, setOpen] = useState(false);
  const [rewardId, setRewardId] = useState(null);
  const nav = useNavigate();
  // console.log(carNew);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(modifyReward({ api: "reward", postData: values }));
  };
  const rewardArr = useSelector((state) => state.reward.rewardArr);
  const modifyRewardStatus = useSelector(
    (state) => state.reward.modifyRewardStatus
  );

  const deleteRewardStatus = useSelector(
    (state) => state.reward.deleteRewardStatus
  );
  const deleteRewardMsg = useSelector((state) => state.reward.deleteRewardMsg);

  const rewardDeleteHandler = () => {
    dispatch(deleteReward({ api: `reward/${rewardId}` }));
  };

  const modifyRewardMsg = useSelector((state) => state.reward.modifyRewardMsg);
  useEffect(() => {
    if (modifyRewardStatus === "success") {
      toast.success(modifyRewardMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    } else if (modifyRewardStatus === "fail") {
      toast.error(modifyRewardMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
    if (deleteRewardStatus === "success") {
      toast.success(deleteRewardMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    } else if (deleteRewardStatus === "fail") {
      toast.error(deleteRewardMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
  }, [modifyRewardStatus, deleteRewardStatus]);
  useEffect(() => {
    dispatch(getReward({ api: "reward" }));
  }, [modifyRewardStatus, deleteRewardStatus]);
  useEffect(() => {
    if (modifyRewardStatus === "success" || modifyRewardStatus === "fail") {
      const timer = setTimeout(() => {
        dispatch(resetModifyRewardStatus());
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (deleteRewardStatus === "success" || deleteRewardStatus === "fail") {
      const timer = setTimeout(() => {
        dispatch(resetDeleteRewardStatus());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modifyRewardStatus, deleteRewardStatus]);
  return (
    <Container>
      <ModalCmp
        title={"Delete Reward"}
        open={open}
        text={'Are you sure you want to delete this reward?"'}
        onOk={() => {
          rewardDeleteHandler();
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        okText={"Delete"}
      />
      <Loader
        spin={
          modifyRewardStatus === "loading" || deleteRewardStatus === "loading"
        }
        fullscreen
      />
      <Notification />
      <div className=" p-5 shadow-xl mt-4">
        <p className=" text-3xl">Create Reward</p>
        <CustomForm data={rewardInputs} text="Create" onFinish={onFinish} />
      </div>
      <div className="p-5 shadow-xl mt-4">
        <p className="text-3xl">Reward List</p>
        <CustomTable
          data={rewardArr}
          columns={rewardColumns(nav, setOpen, setRewardId)}
        />
      </div>
    </Container>
  );
};

export default Reward;
