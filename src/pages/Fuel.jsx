import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import CustomSelect from "../components/Inputs/CustomSelect";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { FaFileExport, FaPlus } from "react-icons/fa6";
import CustomTable from "../components/Tables/Table";
import { fuelColumns } from "../constants/TableColumn";
import { useLocation, useNavigate } from "react-router-dom";
import {
  dateFormatChange,
  generateQueryString,
  photoUrlFix,
} from "../utilities/UtilFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFuel,
  getFuel,
  resetFuelUpdateStatus,
  selectDeleteFuelMsg,
  selectDeleteFuelStatus,
  selectFuel,
  selectFuelStatus,
  selectFuelTotal,
  selectFuelTotalPrice,
  selectUpdateFuelStatus,
} from "../app/FuelSlice/FuelSlice";
import { selectDriverSelectInputs } from "../app/UserSlice/UserSlice";
import { selectCarSelectInputs } from "../app/CarSlice/CarSlice";
import Loader from "../components/Loader/Loader";
import Notification from "../components/Notification";
import ModalCmp from "../components/Modal/ModalCmp";
import { toast } from "react-toastify";
import { Table } from "antd";
const Fuel = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [fuelId, setFuelId] = useState(null);
  const columns = fuelColumns(nav, setOpen, setFuelId);
  const currentDate = Date();
  const [pagination, setPagination] = useState({
    current: 1, // Current page number
    total: 0, // Total number of records
  });
  // const [selectDrivers, setSelectDrivers] = useState([]);
  // const [selectCarInputs, setSelectCarsInputs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    driver_id: "",
    car_id: "",
    start_date: dateFormatChange(currentDate),
    end_date: dateFormatChange(currentDate),
  });
  // const [searchInputs, setSearchInputs] = useState({
  //   driver_id: "",
  //   car_id: "",
  //   start_date: dateFormatChange(currentDate),
  //   end_date: dateFormatChange(currentDate),
  // });
  const [initialCallMade, setInitialCallMade] = useState(false);
  // console.log(location.state);
  const fuelList = useSelector(selectFuel);
  const fuelListStatus = useSelector(selectFuelStatus);
  const fuelTotalPrice = useSelector(selectFuelTotalPrice);
  const deleteFuelStatus = useSelector(selectDeleteFuelStatus);
  const fuelUpdateStatus = useSelector(selectUpdateFuelStatus);
  const deleteFuelMsg = useSelector(selectDeleteFuelMsg);
  // const queryString = generateQueryString(sea);
  const fuelTotal = useSelector(selectFuelTotal);
  const selectBoxDrivers = useSelector(selectDriverSelectInputs);
  const selectBoxCars = useSelector(selectCarSelectInputs);
  // console.log(selectBoxCars, selectBoxDrivers);
  // const total = calculateTotals(dummyFuel, { price: 0 });
  const fixAttributes = [{ folder: "fuel/", attributes: ["photo"] }];
  const final = photoUrlFix(fuelList, fixAttributes);
  // console.log(final);

  // Parse query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearchParams = {
      driver_id: params.get("driver_id") || "",
      car_id: params.get("car_id") || "",
      start_date: params.get("start_date") || searchParams.start_date,
      end_date: params.get("end_date") || searchParams.end_date,
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

  const generateSummary = () => {
    // const totalPrice = data.reduce((total, item) => total + item, 0);
    return {
      price: ` ${fuelTotalPrice.toLocaleString()}`,
      kilo: `Total Price: `,
      // Add other summary values for specific columns as needed
    };
  };
  const summaryData = generateSummary();
  // console.log(summaryData);

  const summary = (
    <Table.Summary.Row>
      {columns.map((col, index) => (
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
  // const searchHandler = () => {
  //   setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
  //   setSearchInputs(searchParams);
  // };
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  // useEffect(() => {
  //   if (location.state && !initialCallMade) {
  //     setSearchParams((prev) => ({ ...prev, ...location.state }));
  //     setSearchInputs((prev) => ({ ...prev, ...location.state }));
  //     setInitialCallMade(true);
  //   }
  // }, [location, initialCallMade]);
  // console.log(currentDate);
  const memoizedQueryString = useMemo(() => {
    const filteredSearchParams = { ...searchParams };
    // Check if both fromDate and toDate are valid
    if (!filteredSearchParams.start_date || !filteredSearchParams.end_date) {
      delete filteredSearchParams.start_date;
      delete filteredSearchParams.end_date;
    }
    return generateQueryString(filteredSearchParams);
  }, [searchParams]);

  useEffect(() => {
    if (initialCallMade) {
      dispatch(
        getFuel({
          api: `getAllfuel?page=${pagination.current}${memoizedQueryString}`,
        })
      );
    }
  }, [searchParams, pagination.current, deleteFuelStatus, initialCallMade]);
  useEffect(() => {
    deleteFuelStatus === "success" &&
      toast.success(deleteFuelMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    deleteFuelStatus === "fail" &&
      toast.error(deleteFuelMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
  }, [deleteFuelStatus]);

  useEffect(() => {
    (fuelUpdateStatus === "success" ||
      fuelUpdateStatus === "loading" ||
      fuelUpdateStatus === "error") &&
      dispatch(resetFuelUpdateStatus());
  }, [fuelUpdateStatus]);

  useEffect(() => {
    if (initialCallMade) {
      const queryString = generateQueryString(searchParams);
      nav(`${location.pathname}?${queryString}`, { replace: true });
    }
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
  }, [searchParams, initialCallMade, nav, location.pathname]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: fuelTotal }));
  }, [fuelTotal]);

  // useEffect(() => {
  //   searchHandler();
  // }, [
  //   searchParams.car_id,
  //   searchParams.driver_id,
  //   searchParams.start_date,
  //   searchParams.end_date,
  // ]);

  // console.log(fuelList);
  return (
    <Container>
      <Loader spin={deleteFuelStatus === "loading"} />
      <Notification />
      <ModalCmp
        title={"Delete"}
        open={open}
        text={"Are you sure to delete this Fuel record?"}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false);
          dispatch(deleteFuel({ api: `deleteFuel/${fuelId}` }));
        }}
      />

      <h1 className="text-4xl py-2">Fuel</h1>
      <div className="row flex flex-wrap w-auto justify-between md:justify-normal md:gap-2 px-10">
        <div className="flex flex-wrap w-auto gap-2 sm:gap-4 items-center">
          <CustomSelect
            value={searchParams.driver_id}
            options={selectBoxDrivers}
            searchable={true}
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, driver_id: value }))
            }
            className="sm:w-[15rem] w-[80%]"
          />

          <CustomSelect
            value={searchParams.car_id}
            options={selectBoxCars}
            searchable={true}
            onChange={(value) =>
              setSearchParams((prev) => ({ ...prev, car_id: value }))
            }
            className="sm:w-[10rem] w-[80%]"
          />

          <CustomInput
            id="from"
            defaultValue={currentDate}
            type="date"
            placeholder={"From:  dd/mm/yyyy"}
            className={"sm:w-[12rem] w-[80%]"}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                start_date: dateFormatChange(e),
              }))
            }
          />

          <CustomInput
            id="to"
            defaultValue={currentDate}
            type="date"
            placeholder={"To:  dd/mm/yyyy"}
            className={"sm:w-[12rem] w-[80%]"}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                end_date: dateFormatChange(e),
              }))
            }
          />
          <CustomButton
            text={"Add New Fuel"}
            icon={<FaPlus />}
            className={"text-white bg-[#00a65a] mr-4"}
            click={() => nav("create")}
          />
        </div>
        <div className="mt-2 sm:mt-0 w-auto gap-5 md:w-full flex flex-wrap justify-between items-center">
          <p>Total - {fuelTotal}</p>

          {/* <CustomButton
            text={"Export"}
            icon={<FaFileExport />}
            className={"text-white bg-yellow-600 "}
          /> */}
        </div>
      </div>
      <CustomTable
        columns={columns}
        data={final}
        pagination={pagination}
        onChange={handleTableChange}
        loading={fuelListStatus === "loading"}
        exportableProps={{
          showColumnPicker: true,
          children: "Export To CSV",
          fileName: `fuelRecord From: ${searchParams.start_date} To: ${searchParams.end_date}`,
          btnProps: {
            className: "ml-auto mr-[5%] md:mr-[5%] text-white bg-yellow-700",
            icon: <FaFileExport />,
          },
        }}
        summary={summary}
        // generateSummary={generateSummary}
        // summary={() => (
        //   <Table.Summary.Row>
        //     <Table.Summary.Cell index={0} colSpan={3}></Table.Summary.Cell>
        //     <Table.Summary.Cell index={4}>
        //       <b>Total Price:</b>
        //     </Table.Summary.Cell>
        //     <Table.Summary.Cell index={5} colSpan={1}>
        //       {fuelTotalPrice}
        //     </Table.Summary.Cell>
        //   </Table.Summary.Row>
        // )}
      />
    </Container>
  );
};

export default Fuel;

// footer={() => (
//   <div className="ml-10">
//     <span className="font-bold text-3xl inline-block mr-4">
//       Total Price:
//     </span>
//     <span className="text-2xl">{fuelTotalPrice}</span>
//   </div>
// )}
// footer={() => (
//   <Table.Summary fixed>
//     <Table.Summary.Row>
//       {fuelColumns.map((column, index) => {
//         const key = column.dataIndex || column.key;
//         console.log("Column Key:", key, "Index:", index);
//         return (
//           <Table.Summary.Cell key={key || index} index={index}>
//             {total.hasOwnProperty(key) ? total[key] : ""}
//           </Table.Summary.Cell>
//         );
//       })}
//     </Table.Summary.Row>
//   </Table.Summary>
// )}
