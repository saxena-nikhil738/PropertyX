import React, { useEffect } from "react";
import { useState } from "react";
import "./complaint.css";
import Chat from "../Chats/chat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import Base_URL from "../../config/Config";
import * as Cookies from "es-cookie";

const OneRecord = ({ e }) => {
  const [detail, setDetail] = useState(false);
  const [wsize, setWsize] = useState(window.innerWidth <= 664);
  const [state, setState] = useState();
  const [newNote, setNewNote] = useState();
  const [updated, setUpdated] = useState(false);
  const [auth, setAuth] = useAuth();
  const [modify, setModify] = useState(false);
  const [propertyname, setPropertyname] = useState(e.propertyname);
  const [place, setPlace] = useState(e.place);
  const [bedrooms, setBedrooms] = useState(e.bedrooms);
  const [bathrooms, setBathrooms] = useState(e.bathrooms);
  const [hospital, setHospital] = useState(e.hospital);
  const [colleges, setColleges] = useState(e.colleges);
  const [area, setArea] = useState(e.area);

  const token = Cookies.get("token");

  const makeChanges = () => {
    setDetail(!detail);
    setModify(true);
    setNewNote(e.note);
    setState(e.status);
  };

  const DeleteProperty = async (id) => {
    try {
      const res = await axios.delete(`${Base_URL}/deleteproperty`, {
        data: { id },
        headers: {
          Authorization: token,
        },
      });
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the property.", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {}, [updated]);

  const updateFunction = async (id) => {
    await axios
      .put(
        `${Base_URL}/update`,
        {
          id,
          propertyname,
          place,
          area,
          bedrooms,
          bathrooms,
          hospital,
          colleges,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success("Record updated!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
          autoClose: 2000,
        });
        setUpdated(true);
        setModify(false);
      })
      .catch((err) => console.log(err));
  };

  const Interested = async () => {
    console.log(auth);
    try {
      const user = await axios.post(
        `${Base_URL}/getUser`,
        {
          email: auth.email,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(user);
      if (user) {
        const res = await axios.post(
          `${Base_URL}/interested`,
          { email: user.email, name: user.name, phone: user.phone },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      toast.success("Done", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="card-content">
          {auth.enum === 0 ? (
            !modify ? (
              <div className="data">
                <div className="back-appid d-flex justify-content-between">
                  <div className="ele-size-mb">
                    <span className="ele-weight">Property name: </span>{" "}
                    {e.propertyname}
                  </div>
                  {auth.enum === 0 ? (
                    <div className="update-btns">
                      <button
                        className="modify"
                        onClick={() => {
                          setModify(true);
                        }}
                      >
                        Modify
                      </button>
                      <button
                        className="modify"
                        onClick={() => {
                          DeleteProperty(e._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="ele-size-mb">
                  <span className="ele-weight">Place: </span>
                  {e.place}
                </div>
                <div className="ele-size-mb">
                  <span className="ele-weight">Area: </span>
                  {e.area}
                </div>
                <div className="ele-size-mb">
                  <span className="ele-weight">Email: </span>
                  {e.email}
                </div>
                <div className="ele-size-mb">
                  <span className="ele-weight">Number of bedrooms: </span>
                  {e.bedrooms}
                </div>
                <div className="ele-size-mb">
                  <span className="ele-weight">Number of bathrooms: </span>
                  {e.bathrooms}
                </div>
                <div className="ele-size-mb">
                  <span className="ele-weight">Nearest hospital: </span>{" "}
                  {e.hospital}
                </div>
                <div className="ele-size-mb">
                  <span className="ele-weight">Nearest colleges: </span>{" "}
                  {e.colleges}
                </div>
              </div>
            ) : (
              <div className="data">
                <div className="back-appid d-flex justify-content-between">
                  <div className="ele-size-mb mod">
                    <span className="ele-weight ">Property name: </span>
                    <input
                      type="text"
                      className="mod-inp"
                      value={propertyname}
                      onChange={(k) => setPropertyname(k.target.value)}
                    />
                  </div>
                  {auth.enum === 0 ? (
                    <div className="update-btns">
                      <button
                        className="modify"
                        onClick={() => updateFunction(e._id)}
                      >
                        Update
                      </button>
                      <button
                        className="cancel"
                        onClick={() => {
                          setModify(false);
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="ele-size-mb mod">
                  <span className="ele-weight ">Place: </span>
                  <input
                    type="text"
                    className="mod-inp"
                    value={place}
                    onChange={(k) => setPlace(k.target.value)}
                  />
                </div>
                <div className="ele-size-mb mod">
                  <span className="ele-weight">Area: </span>
                  <input
                    type="text"
                    className="mod-inp"
                    value={area}
                    onChange={(k) => setArea(k.target.value)}
                  />
                </div>
                <div className="ele-size-mb mod">
                  <span className="ele-weight">Email: </span>
                  <input type="text" className="mod-inp" value={e.email} />
                </div>
                <div className="ele-size-mb mod">
                  <span className="ele-weight">Number of bedrooms: </span>
                  <input
                    type="number"
                    className="mod-inp"
                    value={bedrooms}
                    onChange={(k) => setBedrooms(k.target.value)}
                  />
                </div>
                <div className="ele-size-mb mod">
                  <span className="ele-weight">Number of bathrooms: </span>
                  <input
                    type="number"
                    className="mod-inp"
                    value={bathrooms}
                    onChange={(k) => setBathrooms(k.target.value)}
                  />
                </div>
                <div className="ele-size-mb mod">
                  <span className="ele-weight">Nearest hospital: </span>{" "}
                  <input
                    type="text"
                    className="mod-inp"
                    value={hospital}
                    onChange={(k) => setHospital(k.target.value)}
                  />
                </div>
                <div className="ele-size-mb mod">
                  <span className="ele-weight">Nearest colleges: </span>{" "}
                  <input
                    type="text"
                    className="mod-inp"
                    value={colleges}
                    onChange={(k) => setColleges(k.target.value)}
                  />
                </div>
              </div>
            )
          ) : (
            <div className="data">
              <div className="back-appid d-flex justify-content-between">
                <div className="ele-size-mb">
                  <span className="ele-weight">Property name: </span>{" "}
                  {e.propertyname}
                </div>
                <div className="update-btns">
                  <button className="interested" onClick={Interested}>
                    I'm interested
                  </button>
                </div>
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Place: </span>
                {e.place}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Area: </span>
                {e.area}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Email: </span>
                {e.email}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Number of bedrooms: </span>
                {e.bedrooms}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Number of bathrooms: </span>
                {e.bathrooms}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Nearest hospital: </span>{" "}
                {e.hospital}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Nearest colleges: </span>{" "}
                {e.colleges}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OneRecord;
