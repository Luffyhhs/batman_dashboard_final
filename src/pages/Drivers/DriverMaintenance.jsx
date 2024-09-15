import React, { useEffect, useState } from "react";
import CustomTable from "../../components/Tables/Table";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { driverMaintenanceColumns } from "../../constants/TableColumn";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDriverDetailsMaintenance,
  selectDriverDetailsMaintenance,
  selectDriverDetailsMaintenanceStatus,
  selectDriverDetailsMaintenanceTotal,
} from "../../app/UserSlice/UserSlice";
import {
  dateFormatChange,
  generateQueryString,
} from "../../utilities/UtilFunctions";

const DriverMaintenance = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({
    from_date: "",
    to_date: "",
  });
  const [searchInputs, setSearchInputs] = useState({
    from_date: "",
    to_date: "",
  });
  const [pagination, setPagination] = useState({
    current: 1, // Current page number
    total: 0, // Total number of records
  });

  const { id } = location.state;
  const driverDetailsMaintenance = useSelector(selectDriverDetailsMaintenance);
  const driverDetailsMaintenanceStatus = useSelector(
    selectDriverDetailsMaintenanceStatus
  );
  const total = useSelector(selectDriverDetailsMaintenanceTotal);
  // console.log(carDetailsHistory);
  const getDriverDetails = () => {
    const queryString = generateQueryString(searchInputs);
    dispatch(
      getDriverDetailsMaintenance({
        api: `driverDetail?driverId=${id}&page=${pagination.current}&type=maintenance${queryString}`,
      })
    );
  };
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const searchHandler = () => {
    setSearchInputs(searchParams);
  };
  useEffect(() => {
    getDriverDetails();
    // dispatch(getCarDetails({ api: `cardetail?carId=${1}` }));
  }, [searchInputs, pagination.current]);
  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: total }));
  }, [total]);
  return (
    <>
      <div className="flex w-auto flex-col md:flex-row flex-wrap my-8 gap-5">
        <CustomInput
          type={"date"}
          className={"md:w-[20rem] w-full mb-2"}
          placeholder={"From:  dd/mm/yyyy"}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              from_date: dateFormatChange(e),
            }))
          }
        />
        <CustomInput
          type={"date"}
          className={"md:w-[20rem] w-full mb-2"}
          placeholder={"To:  dd/mm/yyyy"}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              to_date: dateFormatChange(e),
            }))
          }
        />
        <CustomButton
          text={"Search"}
          icon={<FaMagnifyingGlass />}
          className={"bg-[#3c8dbc] text-white mb-2"}
          click={searchHandler}
        />
      </div>
      <CustomTable
        columns={driverMaintenanceColumns}
        onChange={handleTableChange}
        pagination={pagination}
        data={driverDetailsMaintenance.maintenance?.data}
        loading={driverDetailsMaintenanceStatus === "loading"}
      />
    </>
  );
};

export default DriverMaintenance;
