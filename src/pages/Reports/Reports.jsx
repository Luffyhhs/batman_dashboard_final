import React, { useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import PagesTitle from "../../components/PagesTitle";
import CustomTable from "../../components/Tables/Table";
import { reportColumns } from "../../constants/TableColumn";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomSelect from "../../components/Inputs/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { getReportList } from "../../app/ReportSlice/ReportSlice";
import { FaFileExcel } from "react-icons/fa6";
import dayjs from "dayjs";
import {
  generateQueryString,
  transformSearchParams,
} from "../../utilities/UtilFunctions";
import { Table } from "antd";

const Reports = () => {
  const dispatch = useDispatch();
  const reportList = useSelector((state) => state.report.reportList);
  const reportListStatus = useSelector(
    (state) => state.report.reportListStatus
  );
  const reportListTotal = useSelector((state) => state.report.reportListTotal);
  const agentSelectBox = useSelector((state) => state.user.agentSelectBox);
  console.log(agentSelectBox);
  console.log(reportList);
  const [pagination, setPagination] = useState({
    current: 1,
    total: reportListTotal,
    pageSize: 100,
    pageSizeOptions: [100, 200, 300, 500, 1000],
  });
  const [searchParams, setSearchParams] = useState({
    user: "",
    reward: "",
    agent: "",
    fromDate: "",
    toDate: "",
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const memoizedQueryString = useMemo(() => {
    const transformParams = transformSearchParams(searchParams);
    return generateQueryString(transformParams);
  }, [searchParams]);
  const columns = reportColumns();
  const generateSummary = (data) => {
    const totalAmt = data.reduce(
      (total, item) => total + item?.reward?.value,
      0
    );
    // const liters = data.reduce((total, item) => total + item.liters, 0);
    // const gallons = data.reduce((total, item) => total + item.gallons, 0);
    // const amount = data.reduce((total, item) => total + item.amount, 0);
    return {
      lucky_code: "Total",
      lucky_value: `${totalAmt.toLocaleString()}`,
      // end_kilo: `Total Price: `,
      // liters: `${parseFloat(liters).toFixed(3)}`,
      // gallons: `${parseFloat(gallons).toFixed(2)}`,
      // amount: `${amount.toLocaleString()}`,
      // Add other summary values for specific columns as needed
    };
  };
  const summaryData = generateSummary(reportList);
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

  useEffect(() => {
    dispatch(
      getReportList({
        api: `report?page=${pagination.current}&limit=${pagination.pageSize}${memoizedQueryString}`,
      })
    );
  }, [dispatch, memoizedQueryString, pagination.current, pagination.pageSize]);
  useEffect(() => {
    memoizedQueryString !== "" &&
      setPagination((prev) => ({ ...prev, current: 1 }));
  }, [memoizedQueryString]);
  useEffect(() => {
    setPagination({ ...pagination, total: reportListTotal });
  }, [reportListTotal]);
  return (
    <Container>
      <div className="mt-2">
        <PagesTitle title={"Reports"} />
        <div className="w-full flex flex-wrap justify-start gap-4 my-2">
          <CustomInput
            placeholder={"Reward Name"}
            className={"w-[90%] sm:w-[12rem]"}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setSearchParams({ ...searchParams, reward: e.target.value })
            }
          />
          <CustomInput
            placeholder={"User Name"}
            className={"w-[90%] sm:w-[12rem]"}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setSearchParams({ ...searchParams, user: e.target.value })
            }
          />
          <CustomSelect
            options={agentSelectBox}
            onChange={(val) => setSearchParams({ ...searchParams, agent: val })}
            className={"w-[90%] sm:w-[12rem]"}
          />
          <CustomInput
            type="date"
            className={"w-[90%] sm:w-[12rem]"}
            placeholder={"From Date: dd-mm-yyyy"}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                fromDate: dayjs(e).format("DD-MM-YYYY"),
              })
            }
          />
          <CustomInput
            type="date"
            className={"w-[90%] sm:w-[12rem]"}
            placeholder={"To Date: dd-mm-yyyy"}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                toDate: dayjs(e).format("DD-MM-YYYY"),
              })
            }
          />
        </div>
        <CustomTable
          columns={columns}
          data={reportList}
          pagination={pagination}
          onChange={handleTableChange}
          exportableProps={{
            showColumnPicker: true,
            children: "Export To Excel",
            fileName: `Reports`,
            btnProps: {
              className: "flex ml-auto text-white bg-yellow-700",
              icon: <FaFileExcel />,
            },
          }}
          extraButton={true}
          summary={summary}
          loading={reportListStatus === "loading"}
        />
      </div>
    </Container>
  );
};

export default Reports;
