import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImage, uploadProductCarousel } from "../API/Upload";
import {
  addProductCarousel,
  deleteProduct,
  deleteProductImage,
  updateProduct,
  updateProductSale,
} from "../API/Product";
import { useDataLayerValue } from "../DataLayer";

function ProductCard({ productId }) {
  const [{ data }] = useDataLayerValue();
  const [addsale, setAddsale] = useState(false);
  const [product, setProduct] = useState({});
  const [Carousel, setCarousel] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setBannerImage(product?.bannerImage);
    }

    return () => {
      setBannerImage(null);
      setUploadLoading(false);
    };
  }, []);
  const uploadBannerImage = async (e) => {
    e.preventDefault();
    // Upload Image On Cloudinary and get the url
    let bannerImage = document.getElementsByName("bannerImage")[0].files[0];
    //console.log(bannerImage);
    const form = new FormData();

    form.append("file", bannerImage);

    setUploadLoading(true);
    let resp = await uploadImage(product?.id, form);
    if (resp.status === 200) {
      let result = await resp.json();
      //console.log(result);
      setBannerImage(result?.url);
    } else {
      toast.error("Image Uploadation failed");
    }
    setUploadLoading(false);
  };
  const uploadCarousel = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    let carousel = document.getElementsByName("productCarousel")[0].files;

    const formdata = new FormData();
    for (let i = 0; i < carousel.length; ++i) {
      formdata.append("file", carousel[i]);
    }
    //console.log(formdata);

    let response = await uploadProductCarousel(product?.id, formdata);
    if (response.status === 200) {
      let result = await response.json();

      if (result) {
        let arr = [];
        for (let i = 0; i < result?.length; ++i) {
          let data = {};
          data["p_id"] = product?.id;
          data["images"] = result[i];
          arr.push(data);
        }
        //console.log(arr);
        let res = await addProductCarousel(arr);
        if (res.status !== 200) {
          toast.error("Something went wrong");
        }
      }
    } else {
      toast.error("File Uploading Error");
    }
    setUploadLoading(false);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let data = {};
    for (let [key, value] of formdata) {
      data[key] = value;
      // //console.log(key + ": " + value);
    }

    data["id"] = product?.id;
    data["bannerImage"] = bannerImage ? bannerImage : product?.bannerImage;

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

    if (addsale) {
      let productSales = {
        ps_id: product?.productSales?.ps_id,
        saleOff: data["saleOff"],
        salePercentage: data["salePercentage"],
        sale_start: data["sale_start"],
        sale_end: data["sale_end"],
      };

      let response = await updateProductSale(productSales);
      if (response.status !== 200) {
        toast.error("Something is Wrong Sale Data Not Updated");
      }
    }

    let response = await updateProduct(data);
    if (response.status === 200) {
      toast.success("SuccessFully Data Updated");
    } else {
      toast.error("Something is Wrong");
    }
  };
  useEffect(() => {
    if (productId) {
      const getProduct = async () => {
        let response = await fetch(
          `/api/products/fetch/getProduct?productId=${productId}&admin=${true}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        let result = await response.json();
        setProduct(result);
      };
      getProduct();
      const getProductCarousel = async () => {
        let response = await fetch(
          `/api/products/fetch/getProductImages?productId=${productId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        let result = await response.json();
        setCarousel(result);
      };
      getProductCarousel();
    }
    return () => {
      setProduct({});
    };
  }, [productId]);
  return (
    <div
      id="productForm"
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
              defaultValue={product?.p_name ? product?.p_name : ""}
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
                defaultValue={
                  product?.productDescription?.p_description
                    ? product?.productDescription?.p_description
                    : ""
                }
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
              defaultValue={product?.p_price ? product?.p_price : ""}
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
              defaultValue={
                product?.productDescription?.color
                  ? product?.productDescription?.color
                  : ""
              }
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
              defaultValue={product?.p_stock ? product?.p_stock : ""}
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
                  <option
                    selected={
                      String(product?.productDescription?.p_category) ===
                      String(element?.data)
                    }
                    key={index}
                    value={element?.data}
                  >
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
                  <option
                    key={index}
                    selected={
                      String(product?.productDescription?.p_frameStyle) ===
                      String(element?.data)
                    }
                    value={element?.data}
                  >
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
              <option
                selected={
                  String(product?.productDescription?.p_frameSize) ===
                  String("Small")
                }
                value="Small"
              >
                Small
              </option>
              <option
                selected={
                  String(product?.productDescription?.p_frameSize) ===
                  String("Medium")
                }
                value="Medium"
              >
                Medium
              </option>
              <option
                selected={
                  String(product?.productDescription?.p_frameSize) ===
                  String("Large")
                }
                value="Large"
              >
                Large
              </option>
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
              <option
                selected={
                  String(product?.productDescription?.p_group).toLowerCase ===
                  String("male").toLowerCase
                }
                value="Male"
              >
                Male
              </option>
              <option
                selected={
                  String(product?.productDescription?.p_group).toLowerCase ===
                  String("female").toLowerCase
                }
                value="Female"
              >
                Female
              </option>
              <option
                selected={
                  String(product?.productDescription?.p_group).toLowerCase ===
                  String("kids").toLowerCase
                }
                value="Kids"
              >
                Kids
              </option>
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
                  <option
                    key={index}
                    selected={
                      String(product?.productDescription?.company_name) ===
                      String(element?.data)
                    }
                    value={element?.data}
                  >
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
              defaultValue={
                product?.productDescription?.warranty
                  ? product?.productDescription?.warranty
                  : ""
              }
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
              defaultValue={
                product?.productDescription?.guaranty
                  ? product?.productDescription?.guaranty
                  : ""
              }
            />
          </div>

          <div className="input-group mb-2 mr-sm-2">
            <img
              src={product?.bannerImage}
              alt=""
              style={{
                width: "50px",
                height: "inherit",
                objectFit: "contain",
                border: "1px solid #e0e0e0",
                borderRight: "none",
              }}
            />

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
          {uploadLoading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div className="d-flex">
            {Carousel &&
              typeof Carousel === "object" &&
              Carousel?.map((element, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      display: "flex",
                      margin: "10px",
                      borderRadius: "10px",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={element?.images}
                      key={index}
                      alt="#"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                        padding: "5px",
                        borderRadius: "4px",
                      }}
                    />
                    <i
                      className="material-icons"
                      style={{ fontSize: "16px" }}
                      onClick={async () => {
                        let arr = String(element?.images)?.split("/");
                        let filepath = arr[arr.length - 1];
                        let check = filepath.split(".");

                        if (check.length > 2) {
                          filepath = check[0] + "." + check[1];
                        }
                        let path = arr[arr.length - 2] + "/" + filepath;
                        //console.log(path);
                        let response = await deleteProductImage(
                          element?.id,
                          path
                        );
                        if (response.status === 200) {
                          let data = Carousel?.filter((ele, i) => {
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
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Product Carousel Images</div>
            </div>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              className="form-control"
              multiple
              name="productCarousel"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uploadCarousel}
          >
            Upload Carousel
          </button>
        </fieldset>

        <div className="form-check" style={{ textAlign: "left" }}>
          <label className="form-check-label" htmlFor="defaultCheck1">
            Add Product Sale
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            onClick={(e) => {
              setAddsale(e.target.checked);
            }}
          />
        </div>
        {addsale && (
          <fieldset>
            <legend>Product Sales</legend>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Off Amount</div>
              </div>
              <input
                type="Number"
                className="form-control"
                placeholder="Off Amount"
                required
                defaultValue={
                  product?.productSales?.saleOff
                    ? product?.productSales?.saleOff
                    : 0
                }
                name="saleOff"
              />
            </div>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Percentage</div>
              </div>
              <input
                type="Number"
                className="form-control"
                placeholder="Enter Percentage"
                required
                defaultValue={
                  product?.productSales?.salePercentage
                    ? product?.productSales?.salePercentage
                    : ""
                }
                name="salePercentage"
              />
            </div>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Starting Date</div>
              </div>
              <input
                type="date"
                className="form-control"
                required
                defaultValue={
                  product?.productSales?.sale_start
                    ? product?.productSales?.sale_start
                    : ""
                }
                name="sale_start"
              />
            </div>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Ending Date</div>
              </div>
              <input
                type="date"
                className="form-control"
                required
                defaultValue={
                  product?.productSales?.sale_end
                    ? product?.productSales?.sale_end
                    : ""
                }
                name="sale_end"
              />
            </div>
          </fieldset>
        )}
        <button type="submit" className="btn btn-success py-3 w-100 mb-4">
          Update
        </button>
      </form>
    </div>
  );
}

export default ProductCard;
