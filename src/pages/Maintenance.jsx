import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import CustomSelect from "../components/Inputs/CustomSelect";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";

import CustomTable from "../components/Tables/Table";
import { maintenanceColumns } from "../constants/TableColumn";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCarSelectInputs } from "../app/CarSlice/CarSlice";
import {
  deleteMaintenance,
  getMaintenanceList,
  resetDeleteMaintenanceStatus,
  resetUpdateMaintenanceStatus,
  selectDeleteMaintenanceMsg,
  selectDeleteMaintenanceStatus,
  selectMaintenanceAmtTotal,
  selectMaintenanceList,
  selectMaintenanceListStatus,
  selectMaintenanceTotal,
  selectUpdateMaintenanceStatus,
} from "../app/MaintenanceSlice/MaintenanceSlice";
import {
  dateFormatChange,
  generateQueryString,
  photoUrlFix,
} from "../utilities/UtilFunctions";
import { toast } from "react-toastify";
import Notification from "../components/Notification";
import Loader from "../components/Loader/Loader";
import ModalCmp from "../components/Modal/ModalCmp";
import { Table } from "antd";

const Maintenance = () => {
  const currentDate = Date();
  const location = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    current: 1, // Current page number
    total: 0, // Total number of records
  });
  const [open, setOpen] = useState(false);
  const [maintenanceId, setMaintenanceId] = useState(null);
  const [searchParams, setSearchParams] = useState({
    car_id: "",
    driver_id: "",
    status: "",
    start_date: dateFormatChange(currentDate),
    end_date: dateFormatChange(currentDate),
  });
  const [searchInputs, setSearchInputs] = useState({
    car_id: "",
    driver_id: "",
    status: "",
    start_date: dateFormatChange(currentDate),
    end_date: dateFormatChange(currentDate),
  });
  const [initialCallMade, setInitialCallMade] = useState(false);
  const columns = maintenanceColumns(nav, setOpen, setMaintenanceId);
  // const columns = drivingHistory(nav, setOpen, setDrivingId);

  const carSelectInputs = useSelector(selectCarSelectInputs);
  const maintenanceListStatus = useSelector(selectMaintenanceListStatus);
  const maintenanceList = useSelector(selectMaintenanceList);
  const maintenanceListTotal = useSelector(selectMaintenanceTotal);
  const maintenanceAmtTotal = useSelector(selectMaintenanceAmtTotal);
  // const maintenanceListMsg = useSelector(selectMaintenanceMsg);
  const deleteMaintenanceStatus = useSelector(selectDeleteMaintenanceStatus);
  const updateMaintenanceStatus = useSelector(selectUpdateMaintenanceStatus);
  const deleteMaintenanceMsg = useSelector(selectDeleteMaintenanceMsg);

  // Parse query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearchParams = {
      start_date: params.get("start_date") || searchParams.start_date,
      end_date: params.get("end_date") || searchParams.end_date,
      car_id: params.get("car_id") || "",
    };
    setSearchParams(initialSearchParams);
    // setSearchInputs(initialSearchParams);
    setInitialCallMade(true);
  }, [location.search]);

  // Set state from location.state if available
  useEffect(() => {
    if (location.state && !initialCallMade) {
      setSearchParams((prev) => ({ ...prev, ...location.state }));
      // setSearchInputs((prev) => ({ ...prev, ...location.state }));
      setInitialCallMade(true);
    }
  }, [location.state, initialCallMade]);

  const memoizedQueryString = useMemo(() => {
    const filteredSearchParams = { ...searchParams };
    // Check if both fromDate and toDate are valid
    if (!filteredSearchParams.start_date || !filteredSearchParams.end_date) {
      delete filteredSearchParams.start_date;
      delete filteredSearchParams.end_date;
    }
    return generateQueryString(filteredSearchParams);
  }, [searchParams]);
  const getMaintenanceData = () => {
    // change inputs into query string
    // const queryString = generateQueryString(searchInputs);

    dispatch(
      getMaintenanceList({
        api: `getallMaintenance?page=${pagination.current}${memoizedQueryString}`,
      })
    );
  };

  // const searchHandler = () => {
  //   setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
  //   setSearchInputs(searchParams);
  // };
  const fixAttributes = [
    { folder: "maintenance/", attributes: ["photo.photo_path"] },
  ];
  const finalMaintenanceList = photoUrlFix(maintenanceList, fixAttributes);
  // console.log(finalMaintenanceList);
  // carList.map((item) => {
  //   return { ...item, photo: PHOTO_BASE_URL + "car/" + item.photo };
  // });
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const generateSummary = () => {
    return {
      dname: "Total",
      amount: maintenanceAmtTotal.toLocaleString(),
    };
  };

  const summaryData = generateSummary();

  const summary = (
    <Table.Summary.Row>
      {columns.map((col, index) => (
        // console.log(index)
        <Table.Summary.Cell
          key={index}
          index={index}
          className={`${
            isNaN(summaryData[col.dataIndex]) ? " font-bold" : ""
          } text-right`}
        >
          {summaryData[col.dataIndex] || ""}
        </Table.Summary.Cell>
      ))}
    </Table.Summary.Row>
  );

  useEffect(() => {
    deleteMaintenanceStatus === "success" &&
      toast.success(deleteMaintenanceMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    deleteMaintenanceStatus === "fail" &&
      toast.error(deleteMaintenanceMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    (deleteMaintenanceStatus === "loading" ||
      deleteMaintenanceStatus === "success" ||
      deleteMaintenanceStatus === "fail") &&
      dispatch(resetDeleteMaintenanceStatus());
  }, [deleteMaintenanceStatus]);
  // useEffect(() => {
  //   if (location.state && !initialCallMade) {
  //     setSearchParams((prev) => ({ ...prev, ...location.state }));
  //     // setSearchInputs((prev) => ({ ...prev, ...location.state }));
  //     setInitialCallMade(true);
  //   }
  // }, [location, initialCallMade]);
  // useEffect(() => {
  //   updateCarSuccess &&
  //     toast.success(updateCarMsg, {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       closeOnClick: true,
  //       theme: "light",
  //     });
  // }, [updateCarSuccess]);
  useEffect(() => {
    if (initialCallMade) {
      getMaintenanceData();
    }
  }, [
    pagination.current,
    searchParams,
    deleteMaintenanceStatus,
    initialCallMade,
  ]);
  useEffect(() => {
    setPagination({ ...pagination, total: maintenanceListTotal });
  }, [maintenanceListTotal]);
  useEffect(() => {
    if (initialCallMade) {
      const queryString = generateQueryString(searchParams);
      nav(`${location.pathname}?${queryString.slice(1)}`, { replace: true });
    }
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
  }, [searchParams, initialCallMade, nav, location.pathname]);
  useEffect(() => {
    (updateMaintenanceStatus === "success" ||
      updateMaintenanceStatus === "loading" ||
      updateMaintenanceStatus === "error") &&
      dispatch(resetUpdateMaintenanceStatus());
  }, [updateMaintenanceStatus]);
  // useEffect(() => {
  //   searchHandler();
  // }, [searchParams.car_id, searchParams.start_date, searchParams.end_date]);

  return (
    <Container>
      <Loader spin={deleteMaintenanceStatus === "loading"} />
      <Notification />
      <ModalCmp
        title={"Delete"}
        open={open}
        text={"Are you sure to delete this Maintenance record?"}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false);
          dispatch(
            deleteMaintenance({ api: `deleteMaintenance/${maintenanceId}` })
          );
        }}
      />
      <h1 className="text-4xl py-2">Car Maintenance List</h1>
      <div className="row flex flex-wrap w-full justify-between px-10">
        <div className="flex flex-wrap w-auto gap-2 sm:gap-4">
          <CustomSelect
            value={searchParams.car_id}
            options={carSelectInputs}
            searchable={true}
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, car_id: value }))
            }
            className="w-[12rem]"
          />

          <CustomInput
            type="date"
            defaultValue={currentDate}
            placeholder={"From  :dd/mm/yyyy"}
            className={"w-[12rem]"}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                start_date: dateFormatChange(e),
              }))
            }
          />
          <CustomInput
            type="date"
            defaultValue={currentDate}
            placeholder={"To  :dd/mm/yyyy"}
            className={"w-[12rem]"}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                end_date: dateFormatChange(e),
              }))
            }
          />
        </div>
        <div className="w-auto">
          <CustomButton
            text={"Add New Maintenance"}
            icon={<FaPlus />}
            className={"text-white bg-[#00a65a] "}
            click={() => nav("create")}
          />
        </div>
      </div>
      <CustomTable
        pagination={pagination}
        columns={columns}
        onChange={handleTableChange}
        loading={maintenanceListStatus === "loading"}
        data={finalMaintenanceList}
        summary={summary}
      />
    </Container>
  );
};

export default Maintenance;
