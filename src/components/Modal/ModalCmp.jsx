import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import { BsExclamationCircleFill } from "react-icons/bs";
const ModalCmp = ({
  title,
  text,
  open,
  onOk,
  onCancel,
  okText = "Confirm",
  footer,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText="Cancel"
        footer={footer}
      >
        {text}
      </Modal>
    </>
  );
};

export default ModalCmp;

// const [open, setOpen] = useState(false);
// const showConfirm = () => {
//   confirm({
//     title: "Do you want to delete this item?",
//     icon: <BsExclamationCircleFill />,
//     // content: "Some descriptions",
//     onOk() {
//       console.log("OK");
//     },
//     onCancel() {
//       console.log("Cancel");
//     },
//   });
// };
// const showModal = () => {
//   setOpen(true);
// };
// const hideModal = () => {
//   setOpen(false);
// };
// const ModalCmp = () => {
//   const [modal, contextHolder] = Modal.useModal();
//   const confirm = () => {
//     modal.confirm({
//       title: "Confirm",
//       icon: <ExclamationCircleOutlined />,
//       content: "Bla bla ...",
//       okText: "确认",
//       cancelText: "取消",
//     });
//   };
//   return (
//     <>
//       <Space>
//         <LocalizedModal />
//         <Button onClick={confirm}>Confirm</Button>
//       </Space>
//       {contextHolder}
//     </>
//   );
// };
