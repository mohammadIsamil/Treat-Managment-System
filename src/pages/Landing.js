import { Button, Modal } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { userContext } from "../App";
// import { getAuth, signOut } from "firebase/auth";
// import OrderedList from "../Menu/OrderedList";

export default function Landing() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState();

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const context = useContext(userContext);
  // console.log(context);

  //Get
  useEffect(() => {
    fetch(
      "https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats.json"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Before", data);
        // const filteredData = Object.values(data)
        //   .filter((treat, key) => treat.userEmail === context.userEmail);
        const filteredData = Object.entries(data)
          .filter(([key, treat]) => treat.userEmail === context.userEmail)
          .map(([key, treat]) => [key, treat]);
        // console.log("filtered ", Object.fromEntries(filteredData));
        setData(Object.fromEntries(filteredData));
      });
  }, []);

  //Delete
  const handleDelete = (id) => {
    fetch(
      `https://treat-management-system-691e2-default-rtdb.firebaseio.com/treats/${id}.json`,
      {
        method: "DELETE",
      }
    ).then(() => {
      const newData = { ...data };
      delete newData[id];
      console.log(newData);
      setData(newData);
    });
  };

  function handleOnHome() {
    navigate("/Home");
  }

  const [isCopied, setIsCopied] = useState(null);

  const handleCopyClick = (id) => {
    const url = `${window.location.origin}/order/${id}`;
    navigator.clipboard.writeText(url);
    setIsCopied(id);

    setTimeout(() => {
      setIsCopied(null);
    }, 3000);
  };
  // const auth = getAuth();

  // let handleLogOut = () => {
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     navigate("/");
  //   });
  // };

  return (
    <>
      <div
        className="plus"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <button onClick={handleOnHome}> + </button>
        {/* <button onClick={handleLogOut}>Log Out</button> */}
      </div>
      <h2 style={{fontSize : "23px"}}> Previous Treats</h2>
      <div>
        {Object.entries(data).map(([key, value], index) => (
          <li
            key={index}
            style={{
              border: "1px solid grey",
              borderRadius: "12px",
              padding: "2em",
              margin: "2em",
              background: "aliceblue",
              position: "relative",
            }}
          >
            <button
              type="button"
              className="close"
              aria-label="Delete"
              variant="primary"
              onClick={() => handleShow(key)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5em",
                borderRadius: "10px",
                border: "none",
              }}
            >
              <MdDeleteForever />
            </button>
            <button
              type="button"
              className="copy"
              aria-label="Copy"
              variant="primary"
              onClick={() => handleCopyClick(key)}
              style={{
                position: "absolute",
                top: "5px",
                right: "1em",
                borderRadius: "10px",
                border: "none",
                height: "0",
              }}
            >
              <BiCopy />
              {isCopied === key && (
                <p className="success-message">
                  <TiTick />
                </p>
              )}
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>Are You Sure You Want To Delete It..!!!</Modal.Body>

              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleDelete(id);
                    handleClose();
                  }}
                >
                  Ok
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            Budget: {value.budgetLimitPerPerson} ----- Time:{value.timeLimit}
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Orderd By</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {value.manualMenuList?.map((item, index) => {
                  const selectedCount = item.selectedBy?.length || 0;
                  return (
                    <tr key={index}>
                      <td>{item?.name}</td>
                      <td>{item?.price}</td>
                      <td>
                        {item?.selectedBy
                          ?.map((person) => person.name)
                          .join(", ")}
                      </td>
                      <td>{selectedCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </li>
        ))}
      </div>
      {/* <OrderedList/> */}
    </>
  );
}
