import React from "react";
import { Avatar, List, Badge } from "antd";
import { Link } from "react-router-dom";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const ListBox = ({ data }) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.photo} />}
          title={
            <Link to={`cars/${item.id}`} state={{ ...item }}>
              {item.car_no}
            </Link>
          }
          description={item.model}
        />
        <Badge count={item.freq} color="#faad14" />
      </List.Item>
    )}
  />
);

export default ListBox;
