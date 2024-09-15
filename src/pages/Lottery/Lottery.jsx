import React, { useCallback, useEffect, useState } from "react";
import Container from "../../components/Container";
import PagesTitle from "../../components/PagesTitle";
import CustomTable from "../../components/Tables/Table";
import { lotteryColumns } from "../../constants/TableColumn";
import CustomInput from "../../components/Inputs/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getLottery } from "../../app/LotterySlice/lotterySlice";

const Lottery = () => {
  const dispatch = useDispatch();
  const lotteryList = useSelector((state) => state.lottery.lotteryList);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 100,
    pageSizeOptions: [100, 200, 300, 500, 1000],
  });
  const getLotteryList = useCallback(() => {
    dispatch(getLottery({ api: "lottery" }));
  }, [dispatch]);
  useEffect(() => {
    getLotteryList();
  }, [getLotteryList]);
  return (
    <Container>
      <PagesTitle title={"Requested Lottery List"} />
      <div className="flex gap-4">
        <CustomInput
          placeholder={"Name"}
          className="w-full sm:w-[12rem]"
          onKeyDown={() => {}}
        />
        <CustomInput
          placeholder={"Number"}
          className="w-full sm:w-[12rem]"
          onKeyDown={() => {}}
        />
      </div>
      <CustomTable columns={lotteryColumns()} data={lotteryList} />
    </Container>
  );
};

export default Lottery;
