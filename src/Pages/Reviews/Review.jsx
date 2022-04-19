import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DeleteReview, getReivews } from "../../API/LoadData";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
function Review() {
  const id = useParams("id");
  const [reviews, setReviews] = useState([]);

  const deleteReview = async (id) => {
    let ans = window.confirm("Are You Sure?");
    if (ans) {
      let reason = window.prompt(
        "Enter Reason Why you Delete This FeedBack [This Reason will mailed to user]"
      );

      let response = await DeleteReview(id, reason);
      if (response.status !== 200) {
        toast.error("Something went wrong");
      } else {
        let data = reviews.filter((element, index) => {
          return element?.id !== id;
        });
        setReviews(data);
      }
    }
  };

  useEffect(() => {
    if (id) {
      async function getAllReviews() {
        let response = await getReivews(id?.id);
        if (response.status === 200) {
          let result = await response.json();
          setReviews(result);
        }
      }
      getAllReviews();
    }
    return () => {
      setReviews([]);
    };
  }, [id]);
  return (
    <div className="row g-2">
      {
        reviews && typeof reviews === 'object' &&
        reviews?.length===0 &&
        <h3 className="mt-3 container">!! No Reviews Are There For This Product !!</h3>
      }
      {reviews &&
        typeof reviews === "object" &&
        reviews?.map((element, index) => {
          return (
            <div

              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                width: "300px",
                margin: "10px",
                overflow: "auto",
                padding: "10px",
                minHeight: "120px",
              }}
            >
              <div className="d-flex justify-content-end">
                <i
                  className="fa fa-close btn btn-danger"
                  onClick={() => {
                    deleteReview(element?.id);
                  }}
                ></i>
              </div>
              <div className="user d-flex align-items-center btn btn-primary mt-1">
                <span className="material-icons-outlined me-1">
                  account_circle
                </span>

                <span>{element?.user}</span>
              </div>
              <div>
                {" "}
                <Rating
                  size="large"
                  defaultValue={element?.rating ? element?.rating : 0}
                  precision={0.5}
                  readOnly
                  className="mt-2"
                />
              </div>
              <span>{element?.feedBack}</span>
              <span
                style={{
                  alignSelf: "end",
                  position: "absolute",
                  bottom: "0",
                  marginBottom: "5px",
                  color: "gray",
                  fontSize: "12px",
                }}
              >
                {element?.time}
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default Review;
