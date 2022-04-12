import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  countProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
} from "../../API/Product";
import ProductAddCard from "../../Components/ProductAddCard";
import ProductCard from "../../Components/ProductCard";
import "../../Css/main.css";

function Product() {
  const [{ limit, offset }, setPagination] = useState({ limit: 10, offset: 0 });
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [totalProducts, setTotalProduct] = useState(0);
  const [p_id, setProductId] = useState(null);
  const [hide, setHide] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const navigation = useNavigate();

  document.addEventListener("mouseup", (e) => {
    let box = document.getElementById("productForm");
    if (box && !box.contains(e.target)) {
      setProductId(null);
      setHide(true);
    }
    let addForm = document.getElementById("productAddForm");
    if (addForm && !addForm.contains(e.target)) {
      setAddProduct(false);
    }
  });

  const countProducts = async () => {
    let response = await countProduct();
    if (response.status === 200) {
      let result = await response.json();
      setTotalProduct(result);
    }
  };

  const getProducts = async () => {
    let response = await getAllProduct(limit, offset);
    if (response.status === 200) {
      let result = await response.json();
      console.log(result);
      setProducts(result);
    }
  };

  const _deleteProduct = async (p_id) => {
    let response = await deleteProduct(p_id);
    if (response.status === 200) {
      let updatedProduct = products?.filter((element, index) => {
        return element?.id !== p_id;
      });
      setProducts(updatedProduct);
    }
  };

  const pagination = () => {
    let _pages = 0;
    if (totalProducts <= limit) {
      _pages = 0;
    } else {
      _pages = Math.floor(
        totalProducts / limit + (totalProducts % limit !== 0 ? 1 : 0)
      );
    }
    let arr = Array.from({ length: _pages }, (n, i) => {
      return i + 1;
    });
    setPages(arr);
  };

  useEffect(() => {
    if (totalProducts !== 0) pagination();
    return () => {
      setPages([]);
    };
  }, [totalProducts]);
  useEffect(() => {
    getProducts();
    return () => {
      setProducts([]);
    };
  }, [limit, offset]);
  useLayoutEffect(() => {
    countProducts();
    return () => {
      setTotalProduct(0);
    };
  }, []);

  return (
    <div className="container mt-2">
      {products && (
        <div className="table-responsive">
          <table className="table  ">
            <thead
              style={{
                background: "#f3f6f9",
              }}
            >
              <tr>
                <th style={{ color: "rgba(0,0,0,.55)" }} scope="col">
                  #
                </th>
                <th style={{ color: "rgba(0,0,0,.55)" }} scope="col">
                  Image
                </th>
                <th style={{ color: "rgba(0,0,0,.55)" }} scope="col">
                  Product
                </th>
                <th style={{ color: "rgba(0,0,0,.55)" }} scope="col">
                  Price
                </th>
                <th style={{ color: "rgba(0,0,0,.55)" }} scope="col">
                  Stock
                </th>
                <th style={{ color: "rgba(0,0,0,.55)" }} scope="col">
                  TotalSales
                </th>
                <th style={{ color: "rgba(0,0,0,.55)" }} scope="col"></th>
                <th style={{ color: "rgba(0,0,0,.55)" }} scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((element, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      navigation(`/product/${element?.id}`);
                    }}
                  >
                    <th scope="row">{index}</th>
                    <td>
                      <img
                        src={element?.bannerImage}
                        alt="img"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {element?.p_name}
                      <br />
                      <small id="description">
                        {element?.productDescription?.p_description?.length >=
                        100
                          ? String(
                              element?.productDescription?.p_description
                            ).substring(0, 100) + "..."
                          : element?.productDescription?.p_description}
                      </small>
                    </td>
                    <td>{element?.p_price}</td>
                    <td>{element?.p_stock}</td>
                    <td>{element?.totalSales}</td>
                    <td>
                      <i
                        className="fa fa-edit"
                        style={{ fontSize: "20px", color: "blue" }}
                        onClick={() => {
                          setProductId(element?.id);
                          setHide(false);
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa fa-trash"
                        style={{ fontSize: "20px", color: "red" }}
                        onClick={() => {
                          _deleteProduct(element?.id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={8}>
                  <span
                    className="btn material-icons-outlined w-100"
                    style={{ background: "navy", color: "white" }}
                    onClick={() => {
                      setAddProduct(true);
                    }}
                  >
                    add
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {pages.length > 0 && (
        <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-center"
        >
          <ul className="pagination">
            <li className="page-item">
              <span
                className="page-link"
                role="button"
                onClick={() => {
                  setPagination((pre) => {
                    return { limit: pre.limit, offset: pre.offset - limit };
                  });
                }}
              >
                Previous
              </span>
            </li>
            {pages?.length > 0 &&
              pages?.map((element, index) => {
                return (
                  <li className="page-item" key={index}>
                    <span
                      className="page-link"
                      role="button"
                      onClick={() => {
                        setPagination((pre) => {
                          return {
                            limit: pre.limit,
                            offset: index * limit,
                          };
                        });
                      }}
                    >
                      {element}
                    </span>
                  </li>
                );
              })}
            <li className="page-item">
              <span
                className="page-link"
                role="button"
                onClick={() => {
                  setPagination((pre) => {
                    return { limit: pre.limit, offset: pre.offset + limit };
                  });
                }}
              >
                Next
              </span>
            </li>
          </ul>
        </nav>
      )}
      {!hide && (
        <div className="d-flex justify-content-center">
          <ProductCard productId={p_id} />
        </div>
      )}
      {addProduct && (
        <div className="d-flex justify-content-center">
          <ProductAddCard />
        </div>
      )}
    </div>
  );
}

export default Product;
