import React, { useEffect, useState } from "react";
import UserDetails from "../../Components/Users/UserDetails";
import { UserService } from "../../Services/UserService";
import { Spinner } from "react-bootstrap";
import "./Users.css";
const Users = () => {
  const [Users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const handleFetching = async () => {
      let result = await UserService.GetAllUsers();
      setUsers(result.data);
      setLoading(false);
    };
    handleFetching();
  }, []);

  return (
    <div>
      <h1 className="text-center text-success fw-bold">
        Insights into all users of the app
      </h1>

      {Loading === false ? (
        <div className="bg-light User-Table mt-5 mb-5 ">
          {" "}
          <UserDetails Users={Users} setUsers={setUsers} />
        </div>
      ) : (
        <div className="text-center" style={{marginTop:"100px"}}>
          <Spinner
            className="m-auto text-center"
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default Users;
