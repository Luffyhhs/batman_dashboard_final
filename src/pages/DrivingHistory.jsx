import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import CustomSelect from "../components/Inputs/CustomSelect";
import { usingStatus } from "../constants/SlelectData";
import CustomButton from "../components/Buttons/CustomButton";
import { FaPlus } from "react-icons/fa6";
import CustomInput from "../components/Inputs/CustomInput";
import CustomTable from "../components/Tables/Table";
import { drivingHistory } from "../constants/TableColumn";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dateFormatChange,
  generateQueryString,
  photoUrlFix,
} from "../utilities/UtilFunctions";
import {
  deleteDrivingHistory,
  getDrivingHistory,
  resetDeleteDrivingStatus,
  resetUpdateDrivingStatus,
  selectDeleteDrivingHistoryMsg,
  selectDeleteDrivingHistoryStatus,
  selectDrivingHistory,
  selectDrivingHistoryStatus,
  selectDrivingHistoryTotal,
  selectUpdateDrivingHistoryStatus,
} from "../app/DrivingHistorySlice/DrivingHistorySlice";
import { toast } from "react-toastify";
import { selectCarSelectInputs } from "../app/CarSlice/CarSlice";
import { selectDriverSelectInputs } from "../app/UserSlice/UserSlice";
import Loader from "../components/Loader/Loader";
import Notification from "../components/Notification";
import ModalCmp from "../components/Modal/ModalCmp";

const DrivingHistory = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location.state);
  const [pagination, setPagination] = useState({
    current: 1, // Current page number
    total: 0, // Total number of records
  });
  const [open, setOpen] = useState(false);
  const [drivingId, setDrivingId] = useState(null);
  const [searchParams, setSearchParams] = useState({
    car_id: "",
    driver_id: "",
    status: "",
    fromDate: "",
    toDate: "",
  });
  // const [searchInputs, setSearchInputs] = useState({
  //   car_id: "",
  //   driver_id: "",
  //   status: "",
  //   fromDate: "",
  //   toDate: "",
  // });

  const [initialCallMade, setInitialCallMade] = useState(false);
  const columns = drivingHistory(nav, setOpen, setDrivingId);

  const carSelectInputs = useSelector(selectCarSelectInputs);
  const driverSelectInputs = useSelector(selectDriverSelectInputs);
  const drivingHistoryStatus = useSelector(selectDrivingHistoryStatus);
  const updateDrivingHistoryStatus = useSelector(
    selectUpdateDrivingHistoryStatus
  );
  const drivingHistoryList = useSelector(selectDrivingHistory);
  const finalDrivingHistoryList = photoUrlFix(drivingHistoryList, [
    { folder: "reports/", attributes: ["endKilo_photo", "startKilo_photo"] },
  ]);
  const drivingHistoryTotal = useSelector(selectDrivingHistoryTotal);
  // console.log(drivingHistoryTotal);
  const deleteDrivingHistoryStatus = useSelector(
    selectDeleteDrivingHistoryStatus
  );
  const deleteDrivingHistoryMsg = useSelector(selectDeleteDrivingHistoryMsg);
  const memoizedQueryString = useMemo(() => {
    const filteredSearchParams = { ...searchParams };
    // Check if both fromDate and toDate are valid
    if (!filteredSearchParams.fromDate || !filteredSearchParams.toDate) {
      delete filteredSearchParams.fromDate;
      delete filteredSearchParams.toDate;
    }
    return generateQueryString(filteredSearchParams);
  }, [searchParams]);
  const getDrivingHistoryList = () => {
    // change inputs into query string
    // const queryString = generateQueryString(searchInputs);

    dispatch(
      getDrivingHistory({
        api: `driving_history?page=${pagination.current}${memoizedQueryString}`,
      })
    );
  };

  // const searchHandler = () => {
  //   setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
  //   const filteredSearchParams = { ...searchParams };
  //   // Check if both fromDate and toDate are valid
  //   if (!filteredSearchParams.fromDate || !filteredSearchParams.toDate) {
  //     delete filteredSearchParams.fromDate;
  //     delete filteredSearchParams.toDate;
  //   }
  //   const queryString = generateQueryString(filteredSearchParams);
  //   nav(`${location.pathname}?${queryString}`, { replace: true });
  //   // setSearchInputs(filteredSearchParams);
  // };
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  // console.log(deleteDrivingHistoryStatus);

  // useEffect(() => {
  //   if (location.state && !initialCallMade) {
  //     setSearchParams((prev) => ({ ...prev, ...location.state }));
  //     setSearchInputs((prev) => ({ ...prev, ...location.state }));
  //     setInitialCallMade(true);
  //   }
  // }, [location, initialCallMade]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearchParams = {
      car_id: params.get("car_id") || "",
      driver_id: params.get("driver_id") || "",
      fromDate: params.get("fromDate") || "",
      status: params.get("status") || "",
      toDate: params.get("toDate") || "",
    };
    setSearchParams(initialSearchParams);
    // setSearchInputs(initialSearchParams);
    setInitialCallMade(true);
  }, [location.search]);
  useEffect(() => {
    if (location.state && !initialCallMade) {
      setSearchParams((prev) => ({ ...prev, ...location.state }));
      // setSearchInputs((prev) => ({ ...prev, ...location.state }));
      setInitialCallMade(true);
    }
  }, [location.state, initialCallMade]);

  useEffect(() => {
    deleteDrivingHistoryStatus === "success" &&
      toast.success(deleteDrivingHistoryMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    deleteDrivingHistoryStatus === "fail" &&
      toast.error(deleteDrivingHistoryMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    deleteDrivingHistoryStatus === "success" && getDrivingHistoryList();
    (deleteDrivingHistoryStatus === "loading" ||
      deleteDrivingHistoryStatus === "success" ||
      deleteDrivingHistoryStatus === "fail") &&
      dispatch(resetDeleteDrivingStatus());
  }, [deleteDrivingHistoryStatus]);

  useEffect(() => {
    (updateDrivingHistoryStatus === "loading" ||
      updateDrivingHistoryStatus === "success" ||
      updateDrivingHistoryStatus === "fail") &&
      dispatch(resetUpdateDrivingStatus());
  }, [updateDrivingHistoryStatus]);

  useEffect(() => {
    if (initialCallMade) {
      getDrivingHistoryList();
    }
  }, [pagination.current, searchParams, initialCallMade]);

  useEffect(() => {
    setPagination({ ...pagination, total: drivingHistoryTotal });
  }, [drivingHistoryTotal]);

  useEffect(() => {
    if (initialCallMade) {
      const queryString = generateQueryString(searchParams);
      nav(`${location.pathname}?${queryString}`, { replace: true });
    }
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, [searchParams, initialCallMade, nav, location.pathname]);

  // useEffect(() => {
  //   searchHandler();
  // }, [searchParams.car_id, searchParams.driver_id, searchParams.status]);

  // useEffect(() => {
  //   searchParams.fromDate !== "" &&
  //     searchParams.fromDate !== null &&
  //     searchParams.toDate !== "" &&
  //     searchParams.toDate !== null &&
  //     searchHandler();
  // }, [searchParams.fromDate, searchParams.toDate]);

  return (
    <Container>
      <Loader spin={deleteDrivingHistoryStatus === "loading"} />
      <Notification />
      <ModalCmp
        title={"Delete"}
        open={open}
        text={"Are you sure to delete this driving record?"}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false);
          dispatch(
            deleteDrivingHistory({ api: `driving_history_delete/${drivingId}` })
          );
        }}
      />
      <h1 className="text-4xl py-4">Driving Ways</h1>
      <div className="row flex w-[95%] justify-between px-2 flex-wrap">
        <div className="flex w-auto flex-wrap gap-8 mb-2 items-baseline">
          <CustomSelect
            value={searchParams.car_id}
            options={carSelectInputs}
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, car_id: value }))
            }
            className="sm:w-[12rem] w-[80%]"
            searchable={true}
          />
          <CustomSelect
            value={searchParams.driver_id}
            options={driverSelectInputs}
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, driver_id: value }))
            }
            className="sm:w-[15rem] w-[80%]"
            searchable={true}
          />

          <CustomInput
            type="date"
            placeholder="From: dd/mm/yyyy"
            className="sm:w-[12rem] w-[80%]"
            clearable={true}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                fromDate: dateFormatChange(e),
              }))
            }
          />
          <CustomInput
            type="date"
            placeholder="To: dd/mm/yyyy"
            className="sm:w-[12rem] w-[80%]"
            clearable={true}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                toDate: dateFormatChange(e),
              }))
            }
          />
          <CustomSelect
            value={searchParams.status}
            options={usingStatus}
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, status: value }))
            }
            className="sm:w-[12rem] w-[80%]"
          />

          {/* <CustomButton
            text={"Search"}
            icon={<FaMagnifyingGlass />}
            className={"text-white bg-[#3c8dbc] "}
            click={searchHandler}
          /> */}
        </div>
        <div className="w-full flex flex-wrap items-center">
          <p>Total - {drivingHistoryTotal}</p>
          <CustomButton
            text={"Add New Report"}
            icon={<FaPlus />}
            className={"text-white bg-[#00a65a] ml-auto"}
            click={() => nav("create")}
          />
        </div>
      </div>

      <CustomTable
        pagination={pagination}
        data={finalDrivingHistoryList}
        columns={columns}
        onChange={handleTableChange}
        loading={drivingHistoryStatus === "loading"}
      />
    </Container>
  );
};

export default DrivingHistory;
