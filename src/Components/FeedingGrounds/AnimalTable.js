import React from "react";

import Table from "react-bootstrap/Table";
const AnimalTable = ({ Animals }) => {
  return (
    <Table variant="dark" className="text-center" striped bordered hover size="sm" responsive={true}>
      <thead>
        <tr>
          <th>#</th>
          <th>Latin Name</th>
          <th>LocalName Name</th>
          <th>First appeared</th>
        </tr>
        {Animals.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.animal.latinName}</td>
            <td>{item.animal.localName}</td>
            <td>{item.firstSeen.slice(0,10)}</td>
          </tr>
        ))}
      </thead>
      <tbody></tbody>
    </Table>
  );
};
export default AnimalTable;
