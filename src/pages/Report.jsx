import { memo, useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import CustomSelect from "../components/Inputs/CustomSelect";
import { selectBranch } from "../constants/SlelectData";
import CustomInput from "../components/Inputs/CustomInput";
import { FaFileExport } from "react-icons/fa6";
import CustomTable from "../components/Tables/Table";
import { reportColumns } from "../constants/TableColumn";

import { calculateTotals } from "../utilities/TableFunctions";
import { useDispatch, useSelector } from "react-redux";

import {
  getReportList,
  selectReportList,
  selectReportStatus,
} from "../app/ReportSlice/ReportSlice";
import { selectUserListStatus } from "../app/UserSlice/UserSlice";
import {
  dateFormatChange,
  generateQueryString,
} from "../utilities/UtilFunctions";
import { Table } from "antd";

const Report = () => {
  const dispatch = useDispatch();
  const currentDate = Date();
  const [searchParams, setSearchParams] = useState({
    branch: "",
    keyword: "",
    date: dateFormatChange(currentDate),
  });
  const [initialCallMade, setInitialCallMade] = useState(false);
  const [searchInputs, setSearchInputs] = useState({
    branch: "",
    keyword: "",
    date: dateFormatChange(currentDate),
  });
  const reportList = useSelector(selectReportList);
  const reportListStatus = useSelector(selectReportStatus);

  // console.log(reportListStatus);
  const finalReport = reportList.map((rp, i) => ({
    ...rp,
    no: i + 1,
    liters: parseFloat(rp.liters).toFixed(3),
    gallons: parseFloat(rp.gallons.toFixed(2)),
  }));
  const total = calculateTotals(reportList, {
    liters: 0,
    gallons: 0,
    amount: 0,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearchParams = {
      keyword: params.get("keyword") || "",
      branch: params.get("branch") || "",
      date: params.get("date") || "",
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
  // const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);
  const memoizedQueryString = useMemo(
    () => generateQueryString(searchParams),
    [searchParams]
  );

  const searchHandler = () => {
    setSearchInputs(searchParams);
  };
  const columns = reportColumns(total);
  const getReportData = () => {
    // const queryString = generateQueryString(searchInputs);
    dispatch(
      getReportList({
        api: `report?${memoizedQueryString.slice(1)}`,
      })
    );
  };

  const handleInputKeyPress = (e) => {
    // console.log(e, "key Entered");
    if (e.key === "Enter") {
      searchHandler();
    }
  };
  const generateSummary = () => {
    return {
      usingKilo: `Total`,
      liters: parseFloat(total.liters).toFixed(3),
      gallons: parseFloat(total.gallons).toFixed(3),
      amount: Number(total.amount).toLocaleString(),
    };
  };
  const summaryData = generateSummary();
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
  useEffect(() => {
    getReportData();
  }, [searchInputs]);

  useEffect(() => {
    searchHandler();
  }, [searchParams.branch, searchParams.date]);

  return (
    <Container>
      <h1 className="text-4xl py-2">Report</h1>
      <div className="row flex flex-wrap w-auto justify-between px-10">
        <div className="flex flex-wrap w-auto gap-8">
          <CustomSelect
            options={selectBranch}
            onChange={(value) =>
              setSearchParams((prev) => ({
                ...prev,
                branch: value,
              }))
            }
            className="sm:w-[12rem] w-[80%]"
          />

          <CustomInput
            defaultValue={currentDate}
            type="date"
            placeholder={"dd/mm/yyyy"}
            className={"sm:w-[12rem] w-[80%]"}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                date: dateFormatChange(e),
              }))
            }
          />
          <CustomInput
            className={"sm:w-[10rem] w-[80%]"}
            placeholder={"2K-1234"}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, keyword: e.target.value }))
            }
            onKeyPress={handleInputKeyPress}
          />
          {/* <CustomButton
            text={"Search"}
            icon={<FaMagnifyingGlass />}
            className={"text-white bg-[#3c8dbc] "}
            click={searchHandler}
          /> */}
        </div>
      </div>
      <CustomTable
        loading={reportListStatus === "loading"}
        columns={columns}
        data={finalReport}
        scroll={{ x: "100vw" }}
        exportableProps={{
          showColumnPicker: true,
          children: "Export To CSV",
          fileName: `Report for: ${searchParams.date}`,
          btnProps: {
            className: "ml-auto mr-[5%] md:mr-[5%] text-white bg-yellow-700",
            icon: <FaFileExport />,
          },
        }}
        summary={summary}
      />
    </Container>
  );
};

export default Report;

// footer={() => (
//   <div className="flex justify-evenly">
//     <div className="ml-10">
//       <span className="font-bold text-3xl inline-block mr-4">
//         Total Liters:
//       </span>
//       <span className="text-2xl">
//         {parseFloat(total.liters).toFixed(3)}
//       </span>
//     </div>
//     <div className="ml-10">
//       <span className="font-bold text-3xl inline-block mr-4">
//         Total Gallons:
//       </span>
//       <span className="text-2xl">
//         {parseFloat(total.gallons).toFixed(2)}
//       </span>
//     </div>
//     <div className="ml-10">
//       <span className="font-bold text-3xl inline-block mr-4">
//         Total Amount:
//       </span>
//       <span className="text-2xl">
//         {parseInt(total.amount).toFixed(2)}
//       </span>
//     </div>
//   </div>
// )}
