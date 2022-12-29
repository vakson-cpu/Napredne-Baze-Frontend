import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeedingGroundsService } from "../../Services/FeedingGroundsService";
import FeedingGroundCard from "../../Components/FeedingGrounds/FeedingGroundCard";
import { Spinner } from "react-bootstrap";
import "./FeedingGrounds.css";

const FeedingGrounds = () => {
  const id = +useParams().regionId;
  const [FeedingGrounds, setFeedingGrounds] = useState([]);
  const [Loading, setLoading] = useState(true);
  const page= parseInt(useParams().pageNumber);
  const [currentPage, setCurrentPage] = useState(page || 1)
  useEffect(() => {
    async function getRegion() {
      setLoading(true);
      let result = await FeedingGroundsService.GetByRegionId(id,page);
      setFeedingGrounds(result.data);
      setLoading(false);
    }
    getRegion();
  }, []);

  console.log(FeedingGrounds);
  if (Loading === false)
    return (
      <div className="forest-background">
        <div className="mt-5 mb-5 d-flex flex-row flex-wrap align-items-center ">
          {" "}
          {FeedingGrounds.map((item, index) => (
            <FeedingGroundCard
              key={index}
              className="m-auto"
              Id={item.id}
              startDate={item.startDate}
              endDate={item.endDate}
              fgnumber={item.fgNumber}
              animals={item.animals}
            />
          ))}
          {FeedingGrounds.length === 0 && (
            <h1 className="text-center text-white">
              Region has no feeding grounds.
            </h1>
          )}
        </div>
      </div>
    );
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
};

export default FeedingGrounds;
