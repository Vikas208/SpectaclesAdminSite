import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveProduct } from "../API/Product";
import { uploadImage } from "../API/Upload";
import { useDataLayerValue } from "../DataLayer";

function ProductAddCard() {
  const [{ data }] = useDataLayerValue();
  const [bannerImage, setBannerImage] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    return () => {
      setBannerImage(null);
      setUploadLoading(false);
    };
  }, []);

  const uploadBannerImage = async (e) => {
    e.preventDefault();
    // Upload Image On Cloudinary and get the url
    let bannerImage = document.getElementsByName("bannerImage")[0].files[0];
    const form = new FormData();
    form.append("file", bannerImage);

    setUploadLoading(true);
    let resp = await uploadImage(0, form);
    if (resp.status === 200) {
      let result = await resp.json();
      console.log(result);
      setBannerImage(result?.url);
    } else {
      toast.error("Image Uploadation failed");
    }
    setUploadLoading(false);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (bannerImage == null) {
      toast.info("Please Select Image");
      return;
    }
    let formData = new FormData(e.target);

    let data = {};
    for (let [key, value] of formData) {
      data[key] = value;
    }
    // Upload Image and get URL
    data["bannerImage"] = bannerImage;

    let productDescription = {
      p_description: data["p_description"],
      p_category: data["p_category"],
      p_frameSize: data["p_frameSize"],
      p_frameStyle: data["p_frameStyle"],
      p_group: data["p_group"],
      color: data["color"],
      company_name: data["company_name"],
      warranty: data["warranty"],
      guaranty: data["guaranty"],
    };

    delete data["p_description"];
    delete data["p_category"];
    delete data["p_frameSize"];
    delete data["p_frameStyle"];
    delete data["p_group"];
    delete data["color"];
    delete data["company_name"];
    delete data["warranty"];
    delete data["guaranty"];

    data["productDescription"] = productDescription;

    console.log(data);

    let response = await saveProduct(data);
    if (response.status === 200) {
      toast.success("Product Saved");
    } else {
      toast.error("Something is Wrong");
    }
  };

  return (
    <div
      id="productAddForm"
      style={{
        position: "absolute",
        zIndex: 2000,
        backgroundColor: "white",
        top: 25,
        padding: "15px",
        width: "75%",
        textAlign: "center",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
      }}
    >
      <form onSubmit={handelSubmit}>
        <fieldset>
          <legend>Basic Product Info</legend>

          <div className="input-group mb-2 mr-sm-2 ">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input
              type="text"
              className="form-control "
              id="validationCustomUsername"
              placeholder="Product Name"
              name="p_name"
              required
            />
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group">
              <span className="input-group-text">Description</span>
              <textarea
                className="form-control"
                aria-label="Description"
                name="p_description"
                required
              ></textarea>
            </div>
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">₹</div>
            </div>
            <input
              type="Number"
              className="form-control"
              id="inlineFormInputGroupUsername2"
              placeholder="Price"
              name="p_price"
              step={0.01}
              required
            />
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">color</div>
            </div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername2"
              name="color"
              required
            />
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Stock</div>
            </div>
            <input
              type="Number"
              className="form-control"
              id="inlineFormInputGroupUsername2"
              placeholder="Stock"
              name="p_stock"
              required
            />
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Category</div>
            </div>
            <select
              id="inputState"
              className="form-control"
              required
              name="p_category"
            >
              <option value="">Choose...</option>
              {data?.categories?.map((element, index) => {
                return (
                  <option key={index} value={element?.data}>
                    {element?.data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Frame Style</div>
            </div>
            <select
              id="inputState"
              className="form-control"
              required
              name="p_frameStyle"
            >
              <option value="">Choose...</option>
              {data?.frameStyles?.map((element, index) => {
                return (
                  <option key={index} value={element?.data}>
                    {element?.data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Frame Size</div>
            </div>
            <select
              id="inputState"
              className="form-control"
              required
              name="p_frameSize"
            >
              <option value="">Choose...</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Group</div>
            </div>
            <select
              id="inputState"
              className="form-control"
              required
              name="p_group"
            >
              <option selected value="">
                Choose...
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Company Name</div>
            </div>
            <select
              id="inputState"
              className="form-control"
              required
              name="company_name"
            >
              <option selected value="">
                Choose...
              </option>
              {data?.companyNames?.map((element, index) => {
                return (
                  <option key={index} value={element?.data}>
                    {element?.data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Warranty</div>
            </div>
            <input
              type="text"
              className="form-control"
              name="warranty"
              placeholder="Warranty"
            />
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Warranty</div>
            </div>
            <input
              type="text"
              className="form-control"
              name="guaranty"
              placeholder="Guaranty"
            />
          </div>
          {uploadLoading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend ">
              <div className="input-group-text">Banner Image</div>
            </div>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              className="form-control"
              name="bannerImage"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={uploadBannerImage}
            >
              upload Image
            </button>
          </div>
        </fieldset>
        <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
          Update
        </button>
      </form>
    </div>
  );
}

export default ProductAddCard;
