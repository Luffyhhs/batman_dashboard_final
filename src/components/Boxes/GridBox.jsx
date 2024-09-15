import React, { useState } from "react";
import { Card, List } from "antd";
import { FaMaximize, FaMinimize } from "react-icons/fa6";
const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
];
const GridBox = () => {
  const [isMaximized, setIsMaximized] = useState(true);
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <>
      <div className="flex justify-between p-2">
        <h2 className="text-xl mb-2">
          လမ်းကြောင်းအများဆုံးဆွဲသည့်ယာဥ်မောင်းများ
        </h2>
        <div>
          <button style={{ marginRight: "5px" }} onClick={handleMaximize}>
            {isMaximized ? <FaMinimize /> : <FaMaximize />}
          </button>
        </div>
      </div>
      <div
        style={{
          transition: "height 0.5s ease-in-out",
          overflow: "hidden",
          height: isMaximized ? "auto" : "0",
        }}
      >
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          className={`p-5`}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default GridBox;
