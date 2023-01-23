import React, { useState } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { Roles } from "../../Enums/RoleEnum";
import ConfigureUserModal from "./ConfigureUserModal";
const UserDetails = ({ Users, setUsers }) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const handleButtonClick = (valueForUserId, valueForRole) => {
    setUserId(valueForUserId);
    setRoleId(valueForRole);
    setShow(!show);
  };
  const handleRole = (role) => {
    switch (role) {
      case 1:
        return Roles.Administrator;
      case 2:
        return Roles.Worker;
      case 3:
        return Roles.User;
      default:
        return Roles.Guest;
    }
  };
  const handleBadgeColor = (role) => {
    switch (role) {
      case 1:
        return "danger";
      case 2:
        return "warning";
      case 3:
        return "success";
      default:
        return "white";
    }
  };
  return (
    <>
      <Table
        variant="light"
        className="text-center"
        striped
        bordered
        hover
        size="sm"
        responsive={true}
      >
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Adjust</th>
          </tr>
          {Users.map((item, index) => (
            <tr key={index} className="text-center">
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.lastName}</td>
              <td>
                {
                  <Badge bg={handleBadgeColor(item.roleId)}>
                    {handleRole(item.roleId)}
                  </Badge>
                }
              </td>
              <td>
                <Button
                  className="m-auto"
                  variant="outline-dark"
                  onClick={() => handleButtonClick(item.id, item.roleId)}
                >
                  Adjust Role
                </Button>
              </td>
            </tr>
          ))}
        </thead>
      </Table>
      {show && (
        <ConfigureUserModal
          show={show}
          onClose={setShow}
          userId={userId}
          roleId={roleId}
          setUsers={setUsers}
        />
      )}
    </>
  );
};

export default UserDetails;
