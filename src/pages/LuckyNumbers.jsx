import Container from "../components/Container";
import CustomInput from "../components/Inputs/CustomInput";
import CustomSelect from "../components/Inputs/CustomSelect";
import { selectStatus } from "../constants/SlelectData";
import { luckyColumns } from "../constants/TableColumn";
// import { dummyDrivers } from "../constants/Dummy";
import CustomTable from "../components/Tables/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { current } from "@reduxjs/toolkit";
import { generateQueryString } from "../utilities/UtilFunctions";
import Notification from "../components/Notification";
import {
  getLucky,
  resetUpdateLuckyStatus,
  updateLucky,
} from "../app/LuckySlice/LuckySlice";
import ModalCmp from "../components/Modal/ModalCmp";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const LuckyNumbers = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.lucky.luckyArrTotal);
  const luckyArr = useSelector((state) => state.lucky.luckyArr);
  const luckyArrStatus = useSelector((state) => state.lucky.luckyArrStatus);
  // const luckyArrStatus = useSelector();
  // console.log(total);
  const rewardSelectBoxData = useSelector(
    (state) => state.reward.rewardSelectBoxData
  );
  const updateLuckyStatus = useSelector(
    (state) => state.lucky.updateLuckyStatus
  );
  const updateLuckyMsg = useSelector((state) => state.lucky.updateLuckyMsg);
  const [luckyId, setLuckyId] = useState(null);
  const [luckyStatus, setLuckyStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    total: total,
    pageSize: 100,
    pageSizeOptions: [100, 200, 300, 500, 1000],
  });
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    reward: "",
    status: "",
  });

  const memoizedQueryString = useMemo(
    () => generateQueryString(searchParams),
    [searchParams]
  );

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleInputKeyPress = (e) => {
    // console.log(e, "key Entered");
    if (e.key === "Enter") {
      // console.log(e);
      // searchHandler();
      setSearchParams((prev) => ({ ...prev, keyword: e.target.value }));
    }
  };

  const getDriverRowClassName = (record) => {
    if (record.status === "requested") {
      return "table-row-green";
    } else if (record.status === "out") {
      return "table-row-red";
    } else if (record.status === "preset") {
      return "table-row-yellow";
    } else {
      return "";
    }
  };

  const column = useMemo(
    () => luckyColumns(nav, setLuckyStatus, setLuckyId, setOpen),
    [nav, setLuckyStatus, setLuckyId, setOpen]
  );
  useEffect(() => {
    dispatch(
      getLucky({
        api: `lucky?page=${pagination.current}&limit=${pagination.pageSize}&${memoizedQueryString}`,
      })
    );
  }, [pagination.current, pagination.pageSize, memoizedQueryString]);
  useEffect(() => {
    if (updateLuckyStatus === "success") {
      toast.success("Succeed", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
      dispatch(
        getLucky({
          api: `lucky?page=${pagination.current}&limit=${pagination.pageSize}${memoizedQueryString}`,
        })
      );
      const timer = setTimeout(() => {
        dispatch(resetUpdateLuckyStatus());
      }, 2000);
      return () => clearTimeout(timer);
    } else if (updateLuckyStatus === "fail") {
      toast.error(updateLuckyMsg, {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
      });
      dispatch(
        getLucky({
          api: `lucky?page=${pagination.current}&limit=${pagination.pageSize}${memoizedQueryString}`,
        })
      );
      const timer = setTimeout(() => {
        dispatch(resetUpdateLuckyStatus());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [updateLuckyStatus]);
  useEffect(() => {
    memoizedQueryString !== "" &&
      setPagination((prev) => ({ ...prev, current: 1 }));
  }, [memoizedQueryString]);
  // console.log(luckyArr);
  // console.log(luckyId, luckyStatus);
  useEffect(() => {
    luckyStatus &&
      luckyId &&
      dispatch(
        updateLucky({
          api: `lucky/${luckyId}`,
          data: { status: luckyStatus },
        })
      );
    const timer = setTimeout(() => {
      setLuckyStatus(null);
    }, 1000);
    clearTimeout(timer);
  }, [luckyStatus, luckyId]);

  useEffect(() => {
    setPagination({ ...pagination, total: total });
  }, [total]);

  return (
    <Container>
      <ModalCmp
        title={"Ban Lucky"}
        okText={"Ban"}
        text={"Are you sure you want to ban this lucky?"}
        onCancel={() => setOpen(false)}
        open={open}
        onOk={() => {
          setOpen(false);
          dispatch(
            updateLucky({ api: `lucky/${luckyId}`, pData: { status: "out" } })
          );
        }}
      />
      <Notification />
      <h1 className="text-4xl py-4">Lucky Codes</h1>
      <div className="row flex w-full justify-between flex-wrap gap-3 px-10">
        <div className="flex flex-wrap w-auto gap-8 mb-4">
          <CustomInput
            // onChange={(e) =>
            //   setSearchParams((prev) => ({ ...prev, code: e.target.value }))
            // }
            placeholder={"AB12345678"}
            className="sm:w-[10rem] w-[80%]"
            onKeyDown={handleInputKeyPress}
            // value={searchParams.code}
          />
          <CustomSelect
            value={searchParams.status}
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, status: value }))
            }
            options={selectStatus}
            className="sm:w-[15rem] w-[80%]"
          />
          <CustomSelect
            value={searchParams.reward}
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, reward: value }))
            }
            options={rewardSelectBoxData}
            className="sm:w-[15rem] w-[80%]"
          />
        </div>
      </div>
      <p>Total - {total}</p>
      <CustomTable
        columns={column}
        data={luckyArr}
        rowClassName={getDriverRowClassName}
        pagination={pagination}
        onChange={handleTableChange}
        loading={luckyArrStatus === "loading"}
      />
    </Container>
  );
};

export default LuckyNumbers;
