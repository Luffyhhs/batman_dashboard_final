import React, { useEffect, useState } from "react";
import CustomTable from "../components/Tables/Table";
import { carFuelColumns } from "../constants/TableColumn";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarDetailsFuel,
  selectCarDetailsFuel,
  selectCarDetailsFuelStatus,
  selectCarDetailsFuelTotal,
} from "../app/CarSlice/CarSlice";
import {
  dateFormatChange,
  generateQueryString,
} from "../utilities/UtilFunctions";

const CarFuel = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = location.state;
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
  const carDetailsFuel = useSelector(selectCarDetailsFuel);
  const carDetailsFuelStatus = useSelector(selectCarDetailsFuelStatus);
  const carDetailsFuelTotal = useSelector(selectCarDetailsFuelTotal);

  const getCarDetails = () => {
    const queryString = generateQueryString(searchInputs);
    dispatch(
      getCarDetailsFuel({
        api: `cardetail?carId=${id}&page=${pagination.current}&type=fuel${queryString}`,
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
    getCarDetails();
    // dispatch(getCarDetails({ api: `cardetail?carId=${1}` }));
  }, [searchInputs, pagination.current]);
  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: carDetailsFuelTotal }));
  }, [carDetailsFuelTotal]);
  return (
    <>
      <div className="flex w-auto flex-col md:flex-row flex-wrap my-8 gap-5">
        <CustomInput
          clearable={true}
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
          clearable={true}
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
          className={"bg-indigo-700 text-white mb-2"}
          click={searchHandler}
        />
      </div>
      <CustomTable
        columns={carFuelColumns}
        onChange={handleTableChange}
        data={carDetailsFuel.fuel?.data}
        pagination={pagination}
        loading={carDetailsFuelStatus === "loading"}
      />
    </>
  );
};

export default CarFuel;
