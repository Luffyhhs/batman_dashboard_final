import CustomTable from "../components/Tables/Table";
import Container from "../components/Container";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { FaPlus } from "react-icons/fa6";
import CustomSelect from "../components/Inputs/CustomSelect";
import {
  selectBranch,
  selectFuelType,
  selectStatus,
  selectValidation,
} from "../constants/SlelectData";
import { carsColumns } from "../constants/TableColumn";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCar,
  deleteCar,
  getCarsListPaginate,
  resetCarUpdateStatus,
  selectCarList,
  selectCarListLoading,
  selectChangeCarStatus,
  selectDeleteCarError,
  selectDeleteCarLoading,
  selectDeleteCarMsg,
  selectDeleteCarSuccess,
  selectTotalCars,
  selectUpdateCarMsg,
  selectUpdateCarStatus,
  selectUpdateCarSuccess,
} from "../app/CarSlice/CarSlice";
import { generateQueryString, photoUrlFix } from "../utilities/UtilFunctions";
import { toast } from "react-toastify";
import ModalCmp from "../components/Modal/ModalCmp";
import Notification from "../components/Notification";
import Loader from "../components/Loader/Loader";

const Car = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1, // Current page number
    total: 0, // Total number of records
  });
  const [open, setOpen] = useState(false);
  const [carId, setCarId] = useState(null);
  const [carStatus, setCarStatus] = useState(null);
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    check_valid: "",
    branch: "",
    status: "",
    fuel_type: "",
  });
  // const [searchInputs, setSearchInputs] = useState({
  //   keyword: "",
  //   check_valid: null,
  //   branch: "",
  //   status: "",
  //   fuel_type: "",
  // });
  const [initialCallMade, setInitialCallMade] = useState(false);
  const carList = useSelector(selectCarList);
  const total = useSelector(selectTotalCars);
  const carListLoading = useSelector(selectCarListLoading);
  // const updateCarSuccess = useSelector(selectUpdateCarSuccess);
  const updateCarStatus = useSelector(selectUpdateCarStatus);
  // const updateCarMsg = useSelector(selectUpdateCarMsg);
  const deleteCarSuccess = useSelector(selectDeleteCarSuccess);
  const deleteCarLoading = useSelector(selectDeleteCarLoading);
  const deleteCarError = useSelector(selectDeleteCarError);
  const deleteCarMsg = useSelector(selectDeleteCarMsg);
  const changeCarStatusState = useSelector(selectChangeCarStatus);
  // console.log(changeCarStatusState);
  // Parse query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearchParams = {
      keyword: params.get("keyword") || "",
      check_valid: params.get("check_valid") || "",
      branch: params.get("branch") || "",
      status: params.get("status") || "",
      fuel_type: params.get("fuel_type") || "",
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
  const getCarList = () => {
    // const queryString = generateQueryString(searchInputs);
    dispatch(
      getCarsListPaginate({
        api: `carlists?page=${pagination.current}${memoizedQueryString}`,
      })
    );
  };
  const searchHandler = () => {
    // setSearchInputs(memoizedSearchParams);

    const queryString = generateQueryString(searchParams);
    nav(`${location.pathname}?${queryString}`, { replace: true });
  };
  const fixAttributes = [
    { folder: "car/", attributes: ["photo"] },
    { folder: "front_licence/", attributes: ["licence_front"] },
    { folder: "back_licence/", attributes: ["licence_back"] },
    { folder: "owner_book/", attributes: ["owner_book"] },
  ];
  const finalCarList = useMemo(
    () => photoUrlFix(carList, fixAttributes),
    [carList, fixAttributes]
  );
  // carList.map((item) => {
  //   return { ...item, photo: PHOTO_BASE_URL + "car/" + item.photo };
  // });
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const handleInputKeyPress = (e) => {
    // console.log(e, "key Entered");
    if (e.key === "Enter") {
      searchHandler();
    }
  };
  const changeCarStatus = () => {
    dispatch(
      changeCar({
        api: "updateStatus",
        pData: { car_id: carId, status: carStatus },
      })
    );
  };

  const columns = useMemo(
    () => carsColumns(nav, setOpen, setCarId, setCarStatus),
    [nav, setOpen, setCarId, setCarStatus]
  );
  // table row class function
  const getCarRowClassName = (record) => {
    const licenseDate = new Date(record.licenceexpiredate);
    const currentDate = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(currentDate.getMonth() + 1);
    if (licenseDate < currentDate) {
      return "table-row-red";
    } else if (licenseDate <= oneMonthFromNow) {
      return "table-row-yellow";
    } else {
      return "table-row-default";
    }
  };

  useEffect(() => {
    deleteCarSuccess &&
      toast.success(deleteCarMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    deleteCarError &&
      toast.error(deleteCarMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
  }, [deleteCarSuccess, deleteCarError]);

  useEffect(() => {
    // updateCarStatus === "success" &&
    //   toast.success(updateCarMsg, {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     closeOnClick: true,
    //     theme: "light",
    //   });
    (updateCarStatus === "success" ||
      updateCarStatus === "loading" ||
      updateCarStatus === "error") &&
      dispatch(resetCarUpdateStatus());
  }, [updateCarStatus]);

  // useEffect(() => {
  //   if (location.state && !initialCallMade) {
  //     setSearchParams((prev) => ({ ...prev, ...location.state }));
  //     setSearchInputs((prev) => ({ ...prev, ...location.state }));
  //     setInitialCallMade(true);
  //   }
  // }, [location.state]);

  useEffect(() => {
    if (initialCallMade) {
      getCarList();
    }
  }, [
    pagination.current,
    searchParams,
    deleteCarSuccess,
    changeCarStatusState,
    initialCallMade,
  ]);

  useEffect(() => {
    setLoading(carListLoading);
    setPagination((prev) => ({ ...prev, total: total }));
  }, [carListLoading, total]);

  useEffect(() => {
    carStatus !== null && changeCarStatus();
  }, [carStatus]);
  // Update URL when searchParams change
  useEffect(() => {
    if (initialCallMade) {
      const queryString = generateQueryString(searchParams);
      nav(`${location.pathname}?${queryString}`, { replace: true });
    }
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
  }, [searchParams, initialCallMade, nav, location.pathname]);
  // useEffect(() => {
  //   searchHandler();
  // }, [
  //   searchParams.branch,
  //   searchParams.status,
  //   searchParams.check_valid,
  //   searchParams.fuel_type,
  // ]);
  // console.log(carListLoading);

  return (
    <Container>
      <Loader spin={deleteCarLoading} />
      <Notification />
      <ModalCmp
        title={"Delete"}
        open={open}
        text={"Are you sure to delete this Car?"}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false);
          dispatch(deleteCar({ api: `car_delete/${carId}` }));
        }}
      />
      <h1 className="text-4xl py-4">Car List</h1>

      <CustomTable
        columns={columns}
        data={finalCarList}
        rowClassName={getCarRowClassName}
        scroll={{ x: "100vw" }}
        pagination={pagination}
        onChange={handleTableChange}
        loading={loading}
      />
    </Container>
  );
};

export default Car;

// queryParams.length > 0 ? `&${queryParams.join("&")}` : "";
// generateQueryString(searchInputs);
// console.log(queryString);

// const { keyword, checkValid, branch, status } = searchInputs;
// const queryParams = [];

// if (keyword) queryParams.push(`keyword=${keyword}`);
// if (checkValid !== 0) queryParams.push(`check_valid=${checkValid}`);
// if (branch) queryParams.push(`branch=${branch}`);
// if (status !== null) queryParams.push(`status=${status}`);
