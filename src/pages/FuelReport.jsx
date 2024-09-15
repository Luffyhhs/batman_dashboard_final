import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import CustomInput from "../components/Inputs/CustomInput";
import {
  dateFormatChange,
  generateQueryString,
} from "../utilities/UtilFunctions";
import CustomTable from "../components/Tables/Table";
import { fuelReportColumns } from "../constants/TableColumn";
import { useDispatch, useSelector } from "react-redux";
import {
  getFuelReports,
  selectFuelReport,
  selectFuelReportStatus,
} from "../app/ReportSlice/ReportSlice";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/Inputs/CustomSelect";
import { selectBranch } from "../constants/SlelectData";
import { FaFileExport } from "react-icons/fa6";

const FuelReport = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const currentDate = Date();
  const [selectedBranch, setSelectedBranch] = useState();
  const [tableData, setTableData] = useState([]);
  const [initialCallMade, setInitialCallMade] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from_date: dateFormatChange(currentDate),
    to_date: dateFormatChange(currentDate),
  });
  // const [searchInputs, setSearchInputs] = useState({
  //   from_date: dateFormatChange(currentDate),
  //   to_date: dateFormatChange(currentDate),
  // });

  // const searchHandler = () => {
  //   setSearchParams(searchInputs);
  // };
  const fuelReport = useSelector(selectFuelReport);
  const fuelReportStatus = useSelector(selectFuelReportStatus);
  const columns = fuelReportColumns();
  // Parse query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearchParams = {
      from_date: params.get("from_date") || searchParams.from_date,
      to_date: params.get("to_date") || searchParams.to_date,
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
  const generateSummary = (data) => {
    const usingKilo = data.reduce((total, item) => total + item.using_kilo, 0);
    const liters = data.reduce((total, item) => total + item.liters, 0);
    const gallons = data.reduce((total, item) => total + item.gallons, 0);
    const amount = data.reduce((total, item) => total + item.amount, 0);
    return {
      using_kilo: `${usingKilo.toLocaleString()}`,
      end_kilo: `Total Price: `,
      liters: `${parseFloat(liters).toFixed(3)}`,
      gallons: `${parseFloat(gallons).toFixed(2)}`,
      amount: `${amount.toLocaleString()}`,
      // Add other summary values for specific columns as needed
    };
  };
  const summaryData = generateSummary(fuelReport);
  // console.log(summaryData);

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

  // const generateInnerSummary = (data) => {
  //   const liters
  // };
  // console.log(fuelReport, tableData);
  const memoizedQueryString = useMemo(() => {
    const filteredSearchParams = { ...searchParams };
    // Check if both fromDate and toDate are valid
    if (!filteredSearchParams.start_date || !filteredSearchParams.end_date) {
      delete filteredSearchParams.start_date;
      delete filteredSearchParams.end_date;
    }
    return generateQueryString(filteredSearchParams);
  }, [searchParams]);
  const getFuelReportList = () => {
    // const queryString = generateQueryString(searchParams);
    dispatch(
      getFuelReports({
        api: `fuelReport?${memoizedQueryString.slice(1)}`,
      })
    );
  };

  useEffect(() => {
    if (initialCallMade) {
      getFuelReportList();
    }
  }, [searchParams, initialCallMade]);

  useEffect(() => {
    const filteredReport = fuelReport.filter(
      (f) => selectedBranch === f.branch
    );
    // console.log(fuelReport, filteredReport, selectedBranch);
    selectedBranch === ""
      ? setTableData([])
      : setTableData([...filteredReport]);
  }, [selectedBranch, fuelReport]);

  useEffect(() => {
    if (initialCallMade) {
      const queryString = generateQueryString(searchParams);
      nav(`${location.pathname}?${queryString.slice(1)}`, { replace: true });
    }
  }, [searchParams, initialCallMade, nav, location.pathname]);

  // useEffect(() => {
  //   searchHandler();
  // }, [searchInputs.from_date, searchInputs.to_date]);
  return (
    <Container>
      <div className="py-2 pl-8 pr-20 flex justify-between items-center flex-wrap">
        <h1 className="text-3xl">Fuel Report</h1>
      </div>

      <div className="flex flex-wrap w-auto gap-2 sm:gap-4 items-center">
        <CustomSelect
          options={selectBranch}
          className={"sm:w-[12rem] w-[80%]"}
          onChange={(value) => setSelectedBranch(value)}
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
              from_date: dateFormatChange(e),
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
              to_date: dateFormatChange(e),
            }))
          }
        />
      </div>
      <CustomTable
        columns={columns}
        loading={fuelReportStatus === "loading"}
        data={tableData.length === 0 ? fuelReport : tableData}
        summary={summary}
        onRow={(record) => ({
          onClick: () => {
            nav("/fuel-report-daily", {
              state: {
                ...record,
                from_date: searchParams.from_date,
                to_date: searchParams.to_date,
              },
            });
            // console.log("clicked", record);
          },
          style: { cursor: "pointer" },
        })}
        exportableProps={{
          showColumnPicker: true,
          children: "Export To CSV",
          fileName: `Fuel Report from:${searchParams.from_date} to:${searchParams.to_date}`,
          btnProps: {
            className: "ml-auto mr-[5%] md:mr-[5%] text-white bg-yellow-700",
            icon: <FaFileExport />,
          },
        }}
      />
    </Container>
  );
};

export default FuelReport;

// expandable={{
//   expandedRowRender: () => (
//     <CustomTable
//       rowKey="date"
//       columns={innerColumns}
//       data={fuelDetailsListData}
//       onChange={handleInnerTableChange}
//       pagination={pagination}
//       loading={fuelDetailsListStatus === "loading"}
//     />
//   ),
//   expandedRowKeys: expandedRowKeys,
//   onExpand: handleExpand,
// }}
