import React, { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import FeedingGroundsService from "../../Services/FeedingGroundsService";
const FeedingGroundsTable = () => {
  const [FeedingGrounds, setFeedingGrounds] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Workers, setWorkers] = useState({ workers: [], doesWork: [] });
  const [LoadWorkers, setLoadWorkers] = useState({
    Loading: true,
    isEmpty: false,
    firstTime: true,
  });
  const [fgInfo, setFgInfo] = useState({ fgid: 0, regionId: 0 });

  useEffect(() => {
    const fetchFeedingGrounds = async () => {
      let result = await FeedingGroundsService.GetAllFeedingGrounds();
      setFeedingGrounds(result.data);
      setLoading(false);
    };
    fetchFeedingGrounds();
  }, []);

  const handleSelect = async (fgid, regionId) => {
    setLoadWorkers(true);
    let result = await FeedingGroundsService.GetWorkersAndOptions(
      fgid,
      regionId
    );
    setFgInfo({ fgid: fgid, regionId: regionId });
    setWorkers(result.data);
    if (result.data.workers.length === 0)
      setLoadWorkers({ Loading: false, isEmpty: true, firstTime: false });
    else setLoadWorkers({ Loading: false, isEmpty: false, firstTime: false });
  };
  const addUserToFeedingGround = async (feedingGroundId, workerId) => {
    let token = localStorage.getItem('token');
    setLoadWorkers(true);
    let niz = [workerId];
     await FeedingGroundsService.AddWorkerToFg(
      niz,
      feedingGroundId,
      token
    );
    let result = await FeedingGroundsService.GetWorkersAndOptions(
      fgInfo.fgid,
      fgInfo.regionId
    );

    setWorkers(result.data);
    setLoadWorkers({Loading:false,isEmpty:false,firstTime:false});
  };

  const removeWorker = async (userId, fgid) => {
    let token = localStorage.getItem('token');
    setLoadWorkers(true);
    await FeedingGroundsService.RemoveWorkersFromFg(userId, fgid,token);
    let result = await FeedingGroundsService.GetWorkersAndOptions(
      fgInfo.fgid,
      fgInfo.regionId
    );
    setWorkers(result.data);
    setLoadWorkers({Loading:false,isEmpty:false,firstTime:false});
  };
  if (Loading === false)
    return (
      <div className='w-75 m-auto'>
        <h3 className="text-black text-center fw-bold mt-3 mb-3">
          List of FeedingGrounds
        </h3>
        <Table striped bordered hover size>
          <thead>
            <tr className="text-center">
              <th>FeedingGround number</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>RegionId</th>
              <th>Workers</th>
            </tr>
          </thead>
          <tbody>
            {FeedingGrounds.map((item,index) => (
              <tr key={index} className="text-center">
                <td>{item.fgNumber}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.regionId}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => handleSelect(item.id, item.regionId)}
                  >
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3 className="text-black text-center fw-bold mt-5 mb-5">
          Workers in FeedingGround
        </h3>
        <div className='w-75 m-auto'>
          {LoadWorkers.Loading === false ? (
            <div>
              {LoadWorkers.isEmpty === false ? (
                <Table striped bordered hover size>
                  <thead>
                    <tr className="text-center fw-bold">
                      <td>Name</td>
                      <td>LastName</td>
                      <td>Add/Remove</td>
                    </tr>
                  </thead>
                  <tbody>
                    {Workers.workers.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td className="text-center">{item.name}</td>
                        <td>{item.lastName}</td>
                        <td>
                          <Button
                            onClick={
                              Workers.doesWork[index] === false
                                ? () =>
                                    addUserToFeedingGround(fgInfo.fgid, item.id)
                                : () => removeWorker(item.id, fgInfo.fgid)
                            }
                            variant={
                              Workers.doesWork[index] === false
                                ? "outline-dark"
                                : "outline-danger"
                            }
                          >
                            {Workers.doesWork[index] === false
                              ? "Add"
                              : "Remove"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <h3 className="text-danger text-center mb-5 ">
                  There Are no Workers working at this region!
                </h3>
              )}
            </div>
          ) : (
            <div className="text-black mb-5 mt-5">
              {LoadWorkers.firstTime ? (
                <h1 className="text-center">...</h1>
              ) : (
                <div className="text-center mt-5">
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
          )}
        </div>
      </div>
    );
  else {
    if (LoadWorkers.firstTime === true)
      return <h1 className="text-center text-black">...</h1>;
    else
      return (
        <div className="text-center mt-5">
          <Spinner
            className="m-auto text-center"
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
  }
};

export default FeedingGroundsTable;
