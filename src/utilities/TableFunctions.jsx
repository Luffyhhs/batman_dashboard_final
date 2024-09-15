import { Table } from "antd";

export const calculateTotals = (data, totals) => {
  data.forEach((item) => {
    Object.keys(totals).forEach((key) => {
      totals[key] += parseFloat(item[key]) || 0;
    });
    // Add other columns you want to calculate totals for
  });

  return totals;
};

export const footer = (column, total) => {
  if (!total) return null;
  // console.log("Totals:", total);

  return (
    <Table.Summary fixed>
      <Table.Summary.Row>
        {column.map((column, index) => {
          const key = column.dataIndex || column.key;
          // console.log("Column Key:", key, "Index:", index);
          return (
            <Table.Summary.Cell key={key || index} index={index}>
              {total.hasOwnProperty(key) ? total[key] : ""}
            </Table.Summary.Cell>
          );
        })}
      </Table.Summary.Row>
    </Table.Summary>
  );
};
// export const summaryTotals = (data) => {
//   return (
//     <Table.Summary.Row>
//       <Table.Summary.Cell index={0}></Table.Summary.Cell>
//       <Table.Summary.Cell index={1}></Table.Summary.Cell>
//       <Table.Summary.Cell index={2}></Table.Summary.Cell>
//       <Table.Summary.Cell index={3}></Table.Summary.Cell>
//       <Table.Summary.Cell index={4}>Total</Table.Summary.Cell>
//       {Object.keys(data).map((key, i) => (
//         <Table.Summary.Cell index={i} key={i}>
//           {data[key]}
//         </Table.Summary.Cell>
//       ))}
//     </Table.Summary.Row>
//   );
// };
