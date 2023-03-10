import React, { useEffect } from "react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";

export default function ManualMenu({ setnamePriceList, namePriceList, setIsMenualMenuSelected, isMenualMenuSelected }) {
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isShow, setIsShow] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    if (isMenualMenuSelected) {
      setIsShow(true);
    }
  }, [isMenualMenuSelected]);

  const handleShow = (e) => {
    setIsShow(e.target.checked);
    setIsMenualMenuSelected(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      setNameError(true);
    }

    if (price.length === 0) {
      setPriceError(true);
    }
    if (name.length > 0 && price.length > 0) {
      setnamePriceList((prev) => {
        return [
          ...prev,
          {
            name,
            price,
          },
        ];
      });
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="menu-selection">
      <ul>
        <li>
          <input
            name="menuTypeList"
            type="checkbox"
            className="manualMenuInput"
            value="manualMenu"
            id="manualMenu"
            onChange={handleShow}
            checked={isShow}
          />
          <label className="checkbox" htmlFor="manualMenu">
            Manual Menu
          </label>
        </li>

        {isShow && (
          <>
            <div className="manualMenu">
              <form onSubmit={handleSubmit} id="myForm">
                <div className="form-group">
                  <label htmlFor="name"> Item Name </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    style={{ marginRight: "10px" }}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError(false);
                    }}
                  />

                  {nameError && (
                    <div
                      className="error"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {" "}
                      Name Can't Be Empty
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="price">Item Price</label>
                  <input
                    type="number"
                    id="price"
                    min={0}
                    className="form-control"
                    value={price}
                    style={{ marginLeft: "10px" }}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setPriceError(false);
                    }}
                  />
                  {priceError && (
                    <div
                      className="error"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {" "}
                      Price Can't Be Empty
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary add"
                >
                  + Add
                </button>
              </form>
            </div>
          </>
        )}

        {namePriceList && namePriceList.length > 0 && (
          <ol>
            {namePriceList?.map((item, index) => {
              return (
                <li key={index}>
                  {item.name} --- {item.price}
                  <button
                    style={{
                      position: "absolute",
                      borderRadius: "15px",
                      marginLeft: "10px",
                      border: "none",
                    }}
                    onClick={() => {
                      // console.log(index);
                      setnamePriceList((prev) => {
                        const newList = prev.slice();
                        newList.splice(index, 1);
                        return newList;
                      });
                    }}
                  >
                    <MdDeleteForever />
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </ul>
    </div>
  );
}
