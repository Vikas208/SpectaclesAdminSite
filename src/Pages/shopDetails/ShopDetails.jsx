import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getGlassTypes } from "../../API/LoadData";
import {
  deleteCarouselImage,
  deleteData,
  getCarousel,
  updateShopContactDetails,
  updateShopDetails,
  updateData,
  addData,
  deleteGlassDetails,
  updateGlassDetails,
  addGlassDetails,
  getServiceDetails,
  addServiceDetails,
  deleteServiceDetails,
  updateServiceDetails,
} from "../../API/shopDetails";
import { useDataLayerValue } from "../../DataLayer";
import { action } from "../../Reducer/action";

function ShopDetails() {
  const [{ data }] = useDataLayerValue();
  return (
    <div style={{ marginTop: "10px" }} className="container">
      <div className="row">
        <div className="col-sm">
          <ShopData />
        </div>
        <div className="col-sm">
          <Carousel />
          <DataCard
            title={"Category"}
            data={data?.categories}
            type="category"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <DataCard
            title={"FrameStyle"}
            data={data?.frameStyles}
            type="framestyle"
          />
        </div>
        <div className="col-sm">
          <DataCard
            title={"Company Name"}
            data={data?.companyNames}
            type="companyname"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <GlassType />
        </div>
        <div className="col-sm">
          <Service />
        </div>
      </div>
    </div>
  );
}
export default ShopDetails;

function ShopData() {
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [mailId, setMailId] = useState();
  const [{ shopDetails, reloadDetails }, dispatch] = useDataLayerValue();
  const [loading, setLoading] = useState(false);
  function getJsonFormateData(name) {
    let length = document.getElementsByName(name).length;
    let inputTag = document.getElementsByName(name);
    let data = [];
    for (let i = 0; i < length; ++i) {
      data.push(inputTag[i].value);
    }

    return data;
  }

  const deleteContact = async (index, key, param) => {
    let contactData = {};
    let data = phoneNumber?.filter((element, i) => {
      return i !== index;
    });
    contactData[key] = JSON.stringify(data);
    console.log(contactData);
    let response = await updateShopContactDetails(contactData, param);
    if (response.status === 200) {
      if (String(key).toLowerCase === String("mailId").toLowerCase) {
        setMailId(data);
      } else {
        setPhoneNumber(data);
      }
    } else {
      toast.error("Something is Wrong");
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    let data = {};
    for (let [key, value] of formData) {
      data[key] = value;
    }
    data["phoneNumber"] = JSON.stringify(getJsonFormateData("phoneNumber"));
    data["mailId"] = JSON.stringify(getJsonFormateData("mailId"));

    // Upload Image Here
    data["logoUrl"] =
      "https://res.cloudinary.com/dyg4mksoz/image/upload/v1643353999/ShopDetails/Logo-removebg-preview_jmpsu6.png";

    let address = {
      address: data["address"],
      city: data["city"],
      state: data["state"],
      pinCode: data["pinCode"],
    };

    delete data["city"];
    delete data["state"];
    delete data["pinCode"];

    data["address"] = address;
    console.log(data);
    let response = await updateShopDetails(data);
    if (response.status === 200) {
      toast.success("Data Updated");
    } else {
      toast.error("Something is Wrong");
    }
  };

  function CreateNewPhoneElement() {
    let div = document.createElement("div");
    div.innerHTML = `
     <div class="input-group mb-2 mr-sm-2">
       <div class="input-group">
         <span class="input-group-text material-icons-outlined ">
           phone
         </span>
         <input
           class="form-control"
           aria-label="phoneNumber"
           type="text"
           placeholder="phoneNumber"
           name="phoneNumber"
           required
           pattern="[789][0-9]{9}"
         />
       </div>
     </div>`;
    document.getElementById("_number").appendChild(div);
  }
  function createNewMailElement() {
    let div = document.createElement("div");
    div.innerHTML = `
     <div class="input-group mb-2 mr-sm-2">
                  <div class="input-group">
                    <span class="input-group-text material-icons-outlined ">
                      mail
                    </span>
                    <input
                      class="form-control"
                      aria-label="Email"
                      type="email"
                      placeholder="Email"
                      name="mailId"
                      required
                    />
                  </div>
                </div>`;
    document.getElementById("_mailId").appendChild(div);
  }

  useEffect(() => [phoneNumber, mailId]);
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: action.RELOADDETAILS,
      reloadDetails: true,
    });
    if (shopDetails?.phoneNumber && shopDetails?.mailId) {
      setPhoneNumber(JSON.parse(shopDetails?.phoneNumber));
      setMailId(JSON.parse(shopDetails?.mailId));
    }
    setLoading(false);
    return () => {
      setPhoneNumber([]);
      setMailId([]);
      setLoading(false);
    };
  }, [shopDetails]);
  return (
    <fieldset>
      {loading && (
        <div
          className="spinner-border text-dark justify-content-center"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <legend>Shop Data</legend>
      <form onSubmit={updateData}>
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
              name="pinCode"
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
                          deleteContact(index, "phoneNumber", "phone");
                        }}
                      >
                        close
                      </span>
                    )}

                    <input
                      className="form-control"
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

          <div id="_number"></div>
          <span
            className="material-icons-outlined btn  m-1 w-100"
            style={{ backgroundColor: "#1a76fc", color: "white" }}
            onClick={() => {
              CreateNewPhoneElement();
            }}
          >
            phone
          </span>
        </div>

        <div>
          {mailId &&
            typeof mailId === "object" &&
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
                          deleteContact(index, "mailId", "mail");
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
          <div id="_mailId"></div>
          <span
            className="material-icons-outlined btn  m-1 w-100"
            onClick={createNewMailElement}
            style={{ backgroundColor: "#1a76fc", color: "white" }}
          >
            mail
          </span>
        </div>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group">
            <input
              className="form-control"
              aria-label="File"
              type="file"
              placeholder="Choose File"
              name="logoUrl"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn mb-3 w-100"
          style={{ backgroundColor: "#1a76fc", color: "white" }}
        >
          Update Data
        </button>
      </form>
    </fieldset>
  );
}
function Carousel() {
  const [carousel, setCarousel] = useState([]);

  useEffect(() => {
    const getcarousel = async () => {
      let response = await getCarousel();
      if (response.status === 200) {
        let result = await response.json();
        setCarousel(result);
      }
    };
    getcarousel();
    return () => {
      setCarousel([]);
    };
  }, []);
  return (
    <fieldset className="mb-3">
      <legend>Carousel</legend>
      {carousel &&
        typeof carousel === "object" &&
        carousel?.map((element, index) => {
          return (
            <div
              style={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                display: "inline-flex",
                margin: "10px",
                borderRadius: "10px",
                padding: "5px",
                cursor: "pointer",
              }}
              key={index}
            >
              <img
                src={element?.images}
                key={index}
                alt="#"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              />
              <i
                className="material-icons"
                style={{ fontSize: "16px" }}
                onClick={async () => {
                  let response = await deleteCarouselImage(element?.id);
                  if (response.status === 200) {
                    let data = carousel?.filter((ele, i) => {
                      return i !== index;
                    });
                    setCarousel(data);
                  }
                }}
              >
                close
              </i>
            </div>
          );
        })}
      <form>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">Add Carousel</div>
          </div>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            className="form-control"
            multiple
            required
          />
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#1a76fc", color: "white" }}
        >
          <i className="fa fa-image"></i>
        </button>
      </form>
    </fieldset>
  );
}
function DataCard({ data, type, title }) {
  const [{ reloadDetails }, dispatch] = useDataLayerValue();
  const [hide, setHide] = useState(true);

  const _addData = async (e) => {
    e.preventDefault();

    let data = {
      data: document.getElementsByName("newdata")[0].value,
    };
    console.log(data);
    let response = await addData(data, type);
    if (response.status === 200) {
      dispatch({
        type: action.RELOADDETAILS,
        reloadDetails: !reloadDetails,
      });
      setHide(true);
    } else {
      toast.error("Something is Wrong");
    }
  };

  return (
    <fieldset className="mb-3">
      <legend>{title}</legend>

      {data &&
        typeof data === "object" &&
        data?.map((element, index) => {
          return (
            <div className="input-group mb-2 mr-sm-2" key={index}>
              <div className="input-group">
                <span className="input-group-text material-icons-outlined ">
                  category
                </span>

                <span
                  className="input-group-text material-icons-outlined "
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={async () => {
                    let response = await deleteData(element?.id, type);
                    if (response.status === 200) {
                      toast.success("Done");
                      dispatch({
                        type: action.RELOADDETAILS,
                        reloadDetails: !reloadDetails,
                      });
                    }
                    if (response.status === 403) {
                      let result = await response.json();
                      console.log(result);
                      toast.info(result?.message);
                    }
                  }}
                >
                  close
                </span>
                <span
                  className="input-group-text material-icons-outlined "
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={async () => {
                    let data = {
                      data: document.getElementsByName(type)[index].value,
                      id: element?.id,
                    };
                    console.log(data);
                    let response = await updateData(data, type);
                    console.log(response);
                    if (response.status === 200) {
                      toast.success("Done");
                      dispatch({
                        type: action.RELOADDETAILS,
                        reloadDetails: !reloadDetails,
                      });
                    }
                    if (response.status === 403) {
                      let result = await response.json();
                      toast.info(result?.message);
                    }
                  }}
                >
                  update
                </span>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Categories"
                  name={type}
                  required
                  defaultValue={element?.data}
                />
              </div>
            </div>
          );
        })}

      <span
        className="material-icons-outlined btn  m-1 w-100"
        style={{ backgroundColor: "#1a76fc", color: "white" }}
        onClick={() => {
          setHide((pre) => !pre);
        }}
      >
        category
      </span>
      {!hide && (
        <form onSubmit={_addData}>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group">
              <span className="input-group-text material-icons-outlined ">
                category
              </span>
              <button className="btn" type="submit" style={{ padding: "0px" }}>
                <span className="input-group-text material-icons-outlined  ">
                  done
                </span>
              </button>

              <input
                className="form-control"
                type="text"
                placeholder={type}
                name="newdata"
                required
              />
            </div>
          </div>
        </form>
      )}
    </fieldset>
  );
}
function GlassType() {
  const [glassDetails, setGlassDetails] = useState([]);
  const [hide, setHide] = useState(true);

  const addNewGlassType = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = {};
    for (let [key, value] of formData) {
      data[key] = value;
    }
    data["glass_name"] = data["newglassname"];
    data["price"] = data["newglassprice"];

    delete data["newglassname"];
    delete data["newglassprice"];

    let response = await addGlassDetails(data);
    if (response.status === 200) {
      toast.success("Data Inserted");
    } else if (response.status === 403) {
      let result = await response.json();
      toast.info(result?.message);
    } else {
      toast.error("Something is Wrong");
    }
    setHide(true);
  };
  useEffect(() => {
    async function getGlassDetails() {
      let response = await getGlassTypes();

      if (response.status === 200) {
        let result = await response.json();
        setGlassDetails(result);
      }
    }
    getGlassDetails();

    return () => {
      setGlassDetails([]);
    };
  }, []);
  return (
    <fieldset className="mb-3">
      <legend>Glasses</legend>
      {glassDetails &&
        typeof glassDetails === "object" &&
        glassDetails?.map((element, index) => {
          return (
            <div className="input-group mb-2 mr-sm-2" key={index}>
              <div className="input-group">
                <span className="input-group-text material-icons-outlined ">
                  category
                </span>

                <span
                  className="input-group-text material-icons-outlined "
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={async () => {
                    let response = await deleteGlassDetails(element?.id);
                    if (response.status === 200) {
                      let data = glassDetails?.filter((ele, i) => {
                        return ele?.id === element?.id;
                      });
                      setGlassDetails(data);
                    } else {
                      toast.error("Something is Wrong");
                    }
                  }}
                >
                  close
                </span>
                <span
                  className="input-group-text material-icons-outlined "
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={async () => {
                    let data = {
                      glass_name:
                        document.getElementsByName("glass_name")[index].value,
                      price: document.getElementsByName("price")[index].value,
                      id: element?.id,
                    };
                    let response = await updateGlassDetails(data);
                    if (response.status === 200) {
                      toast.success("data Updated");
                    } else {
                      toast.error("Something is wrong");
                    }
                  }}
                >
                  update
                </span>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Glass Type"
                  name="glass_name"
                  required
                  defaultValue={element?.glass_name}
                />
                <input
                  type="Number"
                  className="form-control"
                  id="inlineFormInputGroupUsername2"
                  placeholder="Price"
                  name="price"
                  defaultValue={element?.price}
                  step={0.01}
                  required
                />
              </div>
            </div>
          );
        })}

      <span
        className="material-icons-outlined btn m-1 w-100"
        style={{ backgroundColor: "#1a76fc", color: "white" }}
        onClick={() => {
          setHide((pre) => !pre);
        }}
      >
        category
      </span>
      {!hide && (
        <form onSubmit={addNewGlassType}>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group">
              <span className="input-group-text material-icons-outlined ">
                category
              </span>
              <button className="btn" type="submit" style={{ padding: "0px" }}>
                <span className="input-group-text material-icons-outlined  ">
                  done
                </span>
              </button>

              <input
                className="form-control"
                type="text"
                placeholder="Glass Type"
                name="newglassname"
                required
              />
              <input
                type="Number"
                className="form-control"
                id="inlineFormInputGroupUsername2"
                placeholder="Price"
                name="newglassprice"
                step={0.01}
                required
              />
            </div>
          </div>
        </form>
      )}
    </fieldset>
  );
}
function Service() {
  const [service, setService] = useState([]);
  const [hide, setHide] = useState(true);

  const addServiceData = async (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let data = {};
    for (let [key, value] of formdata) {
      data[key] = value;
    }
    console.log(data);
    let response = await addServiceDetails(data);
    if (response.status === 200) {
      toast.success("Data Inserted");
    } else {
      toast.error("something is wrong");
    }
    setHide(true);
  };

  useEffect(() => {
    async function getServiceDeta() {
      let response = await getServiceDetails();
      if (response.status === 200) {
        let result = await response.json();

        setService(result);
      }
    }
    getServiceDeta();
    return () => {
      setService([]);
    };
  }, []);
  return (
    <fieldset className="mb-3">
      <legend>Service Details</legend>
      {service &&
        typeof service === "object" &&
        service?.map((element, index) => {
          return (
            <div className="input-group mb-2 mr-sm-2" key={index}>
              <div className="input-group">
                <span className="input-group-text material-icons-outlined ">
                  person
                </span>

                <span
                  className="input-group-text material-icons-outlined "
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={async () => {
                    let response = await deleteServiceDetails(element?.id);
                    if (response.status === 200) {
                      let data = service?.filter((ele, i) => {
                        return ele?.id !== element?.id;
                      });
                      toast.success("Done");
                      setService(data);
                    } else {
                      toast.error("Something is wrong");
                    }
                  }}
                >
                  close
                </span>
                <span
                  className="input-group-text material-icons-outlined "
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={async () => {
                    if (
                      String(
                        document.getElementsByName("phonenumber")[index].value
                      ).length !== 10
                    ) {
                      toast.info("Check PhoneNumber");
                      return;
                    }
                    let data = {
                      id: element?.id,
                      name: document.getElementsByName("name")[index].value,
                      phonenumber:
                        document.getElementsByName("phonenumber")[index].value,
                    };
                    let response = await updateServiceDetails(data);
                    if (response.status === 200) {
                      toast.success("Done");
                    } else if (response.status !== 200) {
                      toast.error("Something is Wrong");
                    }
                  }}
                >
                  update
                </span>

                <input
                  className="form-control"
                  type="text"
                  placeholder="name"
                  name="name"
                  required
                  defaultValue={element?.name}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="PhoneNumber"
                  name="phonenumber"
                  pattern="[789][0-9]{9}"
                  required
                  defaultValue={element?.phonenumber}
                />
              </div>
            </div>
          );
        })}

      <span
        className="material-icons-outlined btn m-1 w-100"
        style={{ backgroundColor: "#1a76fc", color: "white" }}
        onClick={() => {
          setHide((pre) => !pre);
        }}
      >
        category
      </span>
      {!hide && (
        <form onSubmit={addServiceData}>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group">
              <span className="input-group-text material-icons-outlined ">
                category
              </span>
              <button className="btn" type="submit" style={{ padding: "0px" }}>
                <span className="input-group-text material-icons-outlined  ">
                  done
                </span>
              </button>

              <input
                className="form-control"
                type="text"
                placeholder="name"
                name="name"
                required
              />
              <input
                className="form-control"
                type="text"
                placeholder="PhoneNumber"
                name="phonenumber"
                pattern="[789][0-9]{9}"
                required
              />
            </div>
          </div>
        </form>
      )}
    </fieldset>
  );
}
