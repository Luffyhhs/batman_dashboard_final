import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dateFormatChange,
  generateQueryString,
} from "../utilities/UtilFunctions";
import {
  fuelDetailsList,
  selectFuelDetailsList,
  selectFuelDetailsListAvgPrice,
  selectFuelDetailsListStatus,
  selectFuelDetailsListTotal,
  selectFuelDetailsListTotalPrice,
} from "../app/FuelSlice/FuelSlice";
import Container from "../components/Container";
import CustomButton from "../components/Buttons/CustomButton";
import CustomInput from "../components/Inputs/CustomInput";
import CustomSelect from "../components/Inputs/CustomSelect";
import { selectCarSelectInputs } from "../app/CarSlice/CarSlice";
import CustomTable from "../components/Tables/Table";
import { fuelReportListColumns } from "../constants/TableColumn";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";

const FuelReportDaily = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id, from_date, to_date } = location.state;
  // console.log(location.state, id);
  const fromDate = Date(from_date);
  const toDate = Date(to_date);
  // console.log(fromDate, toDate);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 15,
  });
  const [searchParams, setSearchParams] = useState({
    car_id: `${id}`,
    from_date: dateFormatChange(fromDate),
    to_date: dateFormatChange(toDate),
  });
  // const [searchInputs, setSearchInputs] = useState({
  //   car_id: `${id}`,
  //   from_date: dateFormatChange(currentDate),
  //   to_date: dateFormatChange(currentDate),
  // });
  const columns = fuelReportListColumns();

  const carSelectBox = useSelector(selectCarSelectInputs);
  const fuelDetailsListData = useSelector(selectFuelDetailsList);
  const fuelDetailsListTotal = useSelector(selectFuelDetailsListTotal);
  const fuelDetailsListStatus = useSelector(selectFuelDetailsListStatus);
  const fuelDetailsListTotalPrice = useSelector(
    selectFuelDetailsListTotalPrice
  );

  const fuelDetailsListAvgPrice = useSelector(selectFuelDetailsListAvgPrice);

  // console.log(fuelDetailsListTotalPrice, fuelDetailsListAvgPrice);
  const getFuelDetailsList = () => {
    const queryString = generateQueryString(searchParams);
    dispatch(
      fuelDetailsList({
        api: `dailyFuelReport?page=${pagination.current}${queryString}`,
      })
    );
  };

  const generateSummary = () => {
    // const totalPrice = data.reduce((total, item) => total + item, 0);
    return {
      amount: `${parseFloat(fuelDetailsListTotalPrice).toFixed(2)}`,
      liter: `Total Amount`,
      // Add other summary values for specific columns as needed
    };
  };

  const avgSummary = () => {
    return {
      liter: "Daily Average Amount",
      amount: `${parseFloat(fuelDetailsListAvgPrice).toFixed(2)}`,
    };
  };

  const avgSummaryData = avgSummary();
  const summaryData = generateSummary();
  // console.log(summaryData);

  const summary = (
    <>
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
      <Table.Summary.Row>
        {columns.map((col, index) => (
          <Table.Summary.Cell
            key={index}
            index={index}
            className={`${
              isNaN(avgSummaryData[col.dataIndex]) ? " font-bold" : ""
            } text-right`}
          >
            {avgSummaryData[col.dataIndex] || ""}
          </Table.Summary.Cell>
        ))}
      </Table.Summary.Row>
    </>
  );

  // const searchHandler = () => {
  //   setSearchParams(searchInputs);
  // };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  useEffect(() => {
    getFuelDetailsList();
  }, [pagination.current, searchParams]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
      total: fuelDetailsListTotal,
    }));
  }, [fuelDetailsListTotal, dispatch]);

  // useEffect(() => {
  //   searchHandler();
  // }, [searchInputs.car_id, searchInputs.from_date, searchInputs.to_date]);

  return (
    <Container>
      <div className="py-2 pl-8 pr-20 flex justify-between items-center flex-wrap">
        <h1 className="text-3xl">Fuel Daily Report</h1>
      </div>
      <div className="flex lsm:flex-wrap w-auto items-center justify-between">
        <div className="flex flex-wrap item-center gap-2 sm:gap-4 ">
          <CustomSelect
            options={carSelectBox}
            searchable={true}
            value={searchParams.car_id}
            onChange={(val) =>
              setSearchParams((prev) => ({ ...prev, car_id: val }))
            }
            className={"sm:w-[10rem] w-[80%]"}
          />
          <CustomInput
            id="from"
            defaultValue={fromDate}
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
            defaultValue={toDate}
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

        <CustomButton
          text={"Back"}
          className={"shrink bg-[#3c8dbc] text-white"}
          click={() => nav(-1)}
        />
      </div>
      <CustomTable
        rowKey="date"
        columns={columns}
        data={fuelDetailsListData}
        loading={fuelDetailsListStatus === "loading"}
        onChange={handleTableChange}
        pagination={pagination}
        summary={summary}
      />
    </Container>
  );
};

export default FuelReportDaily;
