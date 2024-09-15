import { useEffect } from "react";
import Container from "../../components/Container";
import PagesTitle from "../../components/PagesTitle";
import CustomForm from "../../components/Forms/CustomForm";
import { userUpdateInputs } from "../../constants/FormInputs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserUpdateMsg,
  selectUserUpdateStatus,
  updateUser,
} from "../../app/UserSlice/UserSlice";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

const UserEdit = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { id, name } = location.state;
  location.state.password = null;
  location.state.user_name = name;

  const initialValues = { ...location.state };

  const dispatch = useDispatch();
  // console.log(location.state);
  const userUpdateStatus = useSelector(selectUserUpdateStatus);
  const userUpdateMsg = useSelector(selectUserUpdateMsg);
  const onFinish = async (values) => {
    try {
      dispatch(updateUser({ api: `editUser/${id}`, pData: values }));
    } catch (error) {
      // console.error(error);
    }
  };
  useEffect(() => {
    if (userUpdateStatus === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      toast.success(userUpdateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
      return () => clearTimeout(timer);
    }

    userUpdateStatus === "fail" &&
      toast.error(userUpdateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
  }, [userUpdateStatus]);
  // console.log(location.state);
  return (
    <Container>
      <Loader spin={userUpdateStatus === "loading"} />
      <PagesTitle title={"Edit an Existing User"} />
      <div className="p-8">
        <CustomForm
          data={userUpdateInputs}
          initialValues={initialValues}
          onFinish={onFinish}
        />
      </div>
    </Container>
  );
};

export default UserEdit;
