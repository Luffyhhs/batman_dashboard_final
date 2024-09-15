import React, { useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import CustomTable from "../../components/Tables/Table";
import PagesTitle from "../../components/PagesTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQueryString,
  transformSearchParams,
} from "../../utilities/UtilFunctions";
import { getReportList } from "../../app/ReportSlice/ReportSlice";
import CustomInput from "../../components/Inputs/CustomInput";
import { agentReportColumns } from "../../constants/TableColumn";

const AgentReports = () => {
  const dispatch = useDispatch();
  const reportList = useSelector((state) => state.report.reportList);
  const reportListTotal = useSelector((state) => state.report.reportListTotal);
  const updateReportStatus = useSelector(
    (state) => state.report.updateReportStatus
  );

  const [pagination, setPagination] = useState({
    current: 1,
    total: reportListTotal,
    pageSize: 100,
    pageSizeOptions: [100, 200, 300, 500, 1000],
  });
  const [searchParams, setSearchParams] = useState({
    user: "",
    fromDate: "",
    toDate: "",
  });
  const memoizedQueryString = useMemo(() => {
    const transformParams = transformSearchParams(searchParams);
    return generateQueryString(transformParams);
  }, [searchParams]);
  useEffect(() => {
    dispatch(
      getReportList({
        api: `report?page=${pagination.current}&limit=${pagination.pageSize}${memoizedQueryString}`,
      })
    );
  }, [
    dispatch,
    memoizedQueryString,
    pagination.current,
    pagination.pageSize,
    updateReportStatus,
  ]);
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  useEffect(() => {
    memoizedQueryString !== "" &&
      setPagination((prev) => ({ ...prev, current: 1 }));
  }, [memoizedQueryString]);
  useEffect(() => {
    setPagination({ ...pagination, total: reportListTotal });
  }, [reportListTotal]);
  return (
    <Container>
      <div className="shadow-md mt-2 p-2">
        <PagesTitle title="Reports" />
        <div className="w-full flex flex-wrap justify-start gap-4 my-2">
          <CustomInput
            placeholder={"User Name"}
            className={"w-[90%] sm:w-[12rem]"}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setSearchParams({ ...searchParams, user: e.target.value })
            }
          />
          <CustomInput
            type="date"
            className={"w-[90%] sm:w-[12rem]"}
            placeholder={"From Date: dd-mm-yyyy"}
            onChange={(e) => setSearchParams({ ...searchParams, fromDate: e })}
          />
          <CustomInput
            type="date"
            className={"w-[90%] sm:w-[12rem]"}
            placeholder={"To Date: dd-mm-yyyy"}
            onChange={(e) => setSearchParams({ ...searchParams, toDate: e })}
          />
        </div>
        <CustomTable
          data={reportList}
          columns={agentReportColumns(dispatch)}
          onChange={handleTableChange}
          pagination={pagination}
        />
      </div>
    </Container>
  );
};

export default AgentReports;
