import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../../DataLayer";
import { action } from "../../Reducer/action";
function ShopDetails() {
  return (
    <div style={{ marginTop: "10px" }}>
      <ShopData />
    </div>
  );
}

export default ShopDetails;

function ShopData() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [mailId, setMailId] = useState();

  const [{ shopDetails }, dispatch] = useDataLayerValue();

  const deletePhoneNumber = (index) => {
    let data = phoneNumber?.filter((element, i) => {
      return i !== index;
    });
    setPhoneNumber(data);
  };

  useEffect(() => {
    dispatch({
      type: action.RELOADDETAILS,
      reloadDetails: true,
    });
    if (shopDetails?.phoneNumber && shopDetails?.mailId) {
      setPhoneNumber(JSON.parse(shopDetails?.phoneNumber));
      setMailId(JSON.parse(shopDetails?.mailId));
    }
    return () => {
      setPhoneNumber([]);
      setMailId([]);
    };
  }, [shopDetails]);
  return (
    <fieldset>
      <legend>Shop Data</legend>
      <form>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group">
            <span className="input-group-text material-icons-outlined">
              store
            </span>
            <input
              type="text"
              className="form-control"
              name="shopName"
              placeholder="Shop Name"
              required
              defaultValue={shopDetails?.shopName ? shopDetails?.shopName : ""}
            />
          </div>
        </div>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group">
            <span className="input-group-text material-icons-outlined ">
              home
            </span>
            <textarea
              className="form-control"
              aria-label="address"
              name="address"
              placeholder="Address"
              required
              defaultValue={
                shopDetails?.address?.address
                  ? shopDetails?.address?.address
                  : ""
              }
            ></textarea>
          </div>
        </div>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group">
            <span className="input-group-text material-icons-outlined ">
              location_city
            </span>
            <input
              className="form-control"
              aria-label="city"
              type="text"
              placeholder="City"
              name="city"
              required
              defaultValue={
                shopDetails?.address?.city ? shopDetails?.address?.city : ""
              }
            />
          </div>
        </div>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group">
            <span className="input-group-text material-icons-outlined ">
              place
            </span>
            <input
              className="form-control"
              aria-label="state"
              type="text"
              placeholder="State"
              name="state"
              required
              defaultValue={
                shopDetails?.address?.state ? shopDetails?.address?.state : ""
              }
            />
          </div>
        </div>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group">
            <span className="input-group-text material-icons-outlined ">
              pin
            </span>
            <input
              className="form-control"
              aria-label="pincode"
              type="text"
              placeholder="Pincode"
              name="pincode"
              minLength={6}
              maxLength={6}
              pattern="[0-9]{6}"
              required
              defaultValue={
                shopDetails?.address?.pinCode
                  ? shopDetails?.address?.pinCode
                  : ""
              }
            />
          </div>
        </div>
        <div>
          <span
            className="material-icons-outlined btn btn-success m-1"
            style={{ float: "right" }}
          >
            add
          </span>
          {phoneNumber &&
            typeof phoneNumber === "object" &&
            phoneNumber?.map((element, index) => {
              return (
                <div className="input-group mb-2 mr-sm-2" key={index}>
                  <div className="input-group">
                    <span className="input-group-text material-icons-outlined ">
                      phone
                    </span>
                    {phoneNumber?.length > 1 && (
                      <span
                        className="input-group-text material-icons-outlined "
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          deletePhoneNumber(index);
                        }}
                      >
                        close
                      </span>
                    )}
                    <input
                      className="form-control"
                      aria-label="phoneNumber"
                      type="text"
                      placeholder="PhoneNumber"
                      name="phoneNumber"
                      pattern="[789][0-9]{9}"
                      required
                      defaultValue={element}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div>
          <span
            className="material-icons-outlined btn btn-success m-1"
            style={{ float: "right" }}
          >
            add
          </span>

          {mailId &&
            mailId?.map((element, index) => {
              return (
                <div className="input-group mb-2 mr-sm-2" key={index}>
                  <div className="input-group">
                    <span className="input-group-text material-icons-outlined ">
                      mail
                    </span>
                    {mailId?.length > 1 && (
                      <span
                        className="input-group-text material-icons-outlined "
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          deletePhoneNumber(index);
                        }}
                      >
                        close
                      </span>
                    )}
                    <input
                      className="form-control"
                      aria-label="Email"
                      type="email"
                      placeholder="Email"
                      name="mailId"
                      required
                      defaultValue={element}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group">
            <input
              className="form-control"
              aria-label="File"
              type="file"
              placeholder="Choose File"
              name="file"
              required
            />
          </div>
        </div>
      </form>
    </fieldset>
  );
}
