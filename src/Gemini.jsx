import { useEffect, useState } from "react";
import { url } from "./Contant";
import FlashDropDonw from "./FlashDropDonw";
// import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "bootstrap/dist/css/bootstrap.css";

import "./Gemini.css";
import { GoPaperAirplane } from "react-icons/go";
import { TbCopyPlus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  FaBars,
  FaCaretDown,
  FaCog,
  FaEdit,
  FaGem,
  FaGlobeAsia,
  FaMicrophone,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

function Gemini() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isInputOn, setIsInputOn] = useState(true);
  const [qustion$Ans, setQustion$Ans] = useState([]);
  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };
  const askQuestuon = async () => {
    let response = await fetch(url, {
      method: "Post",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    console.log(response.candidates[0].content.parts[0].text);
    setResult(response.candidates[0].content.parts[0].text);
    let obj = {
      question: payload,
      answer: response.candidates[0].content.parts[0].text,
    };
    setQustion$Ans([...qustion$Ans, obj]);
    setQuestion("");
  };

  const handelInput = (e) => {
    // console.log(e);
    if (e) {
      setIsInputOn(false);
    } else {
      setIsInputOn(true);
    }
    setQuestion(e);
  };

  useEffect(() => {
    console.log(qustion$Ans);
    // console.log(qustion$Ans?.[0]?.answer)
  }, [qustion$Ans]);
  qustion$Ans.map((item, index) =>
    console.log(item.question.contents[0].parts[0].text)
  );

  return (
    <>
      <div className="hero">
        <div
          className="sidebar"
          style={isSidebarOpen ? sidebarManuFalse : sidebarManuTrue}
        >
          <div className="Manu-Search-Bar">
            <div>
              <FaBars
                size={20}
                onClick={() => setSidebarOpen((prev) => !prev)}
              />
            </div>
            <div>{isSidebarOpen && <FaSearch />}</div>
          </div>
          <div className="NewChat">
            <span>
              <FaEdit size={20} />
            </span>
            {isSidebarOpen && <span>New Chat</span>}
          </div>
          {isSidebarOpen ? (
            <div className="historyDiv">
              <div className="exploreGame">
                {/* <span> */}
                {/* <FaEdit size={20} /> */}
                <FaGem size={18}></FaGem>
                {/* </span> */}
                {isSidebarOpen && (
                  <span style={{ margin: "0px 20px 0px 20px" }}>
                    Explore Game
                  </span>
                )}
              </div>
              <div style={{ marginTop: "20px" }}>
                <span>Recent</span>
              </div>
              {qustion$Ans.map((item, index) => (
                <ul
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: " center",
                    padding: "0",
                  }}
                >
                  <li
                    style={{
                      display: "-webkit-box",
                      webkitLineClamp: "1",
                      webkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "150px",
                    }}
                  >
                    {item.question.contents[0].parts[0].text}
                  </li>
                  <BsThreeDotsVertical />
                </ul>
              ))}
            </div>
          ) : (
            ""
          )}
          <div className="setting">
            <span>
              <FaCog size={18}></FaCog>
            </span>
            {isSidebarOpen ? <span>Settings And Help</span> : ""}
          </div>
        </div>
        <div className="main-container mx-0">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "4px 0px 0px 8px", color: "#A2A9B0" }}>
              <div>
                <span className="fs-5 fw-medium">Gemini</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#282a2c",
                  width: "100px",
                  margin: "8px 0px",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  color: "#A2A9B0",
                }}
              >
                {/* <FlashDropDonw /> */}
                <span className="mx-0 fw-bolder" style={{ fontSize: "14px" }}>
                  2.5 Flash
                </span>
                <FaCaretDown></FaCaretDown>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  // border: "1px solid black",
                  width: "110px",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  backgroundColor: "#3d3f42",
                }}
              >
                {/* <FaStar size={18} className="mx-1"></FaStar> */}
                <img
                  style={{ width: "15px", height: "15px", margin: "0px 10px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Google-gemini-icon.svg"
                />
                <span
                  className=""
                  style={{ fontSize: "12px", fontWeight: "600" }}
                >
                  Upgrade
                </span>
              </div>
              <Tooltip title="Login your account">
                <IconButton>
                  <div
                    style={{
                      padding: "8px 12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      backgroundColor: "#3d3f42",
                      margin: "0px 10px",
                      color: "white",
                    }}
                  >
                    <span>Login</span>
                  </div>
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div
            style={{
              margin: "0px auto",
              width: "100%",
              // backgroundColor: "green",
            }}
          >
            <div
              style={{
                width: "64%",
                margin: "0px auto",
                height: "366px",
                overflow: "scroll",
                scrollbarWidth: "none",
                padding: "20px 0px",
              }}
            >
              {qustion$Ans?.map((item, index) => (
                <div key={index}>
                  <ul
                    style={{
                      margin: "10px 0px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "end",
                      padding: "0px 10px",
                    }}
                  >
                    <li
                      style={{
                        margin: "10px 0px",
                        width: "fit-content",
                        borderRadius: "24px  2px 24px 24px",
                        backgroundColor: "#333537",
                        padding: "20px ",
                        maxWidth: "60%",
                        listStyle:'none'
                      }}
                    >
                      {item.question.contents[0].parts[0].text}
                    </li>
                  </ul>

                  <ul style={{ margin: "10px 0px", width: "100%" }}>
                    <li>{qustion$Ans?.[index]?.answer}</li>
                  </ul>
                  <br></br>
                </div>
              ))}
            </div>
            <div
              style={{
                margin: "0px auto",
                width: "64%",
                // backgroundColor: "yellow",
                textAlign: "center",
                border: "1px solid #4a5050",
                height: "120px",
                borderRadius: "16px",
                padding: "10px",
              }}
              className="my-2"
            >
              {" "}
              <div className="mb-4 mt-1">
                <input
                  value={question}
                  onChange={(e) => handelInput(e.target.value)}
                  placeholder="Ask Gemini"
                  className="fw-medium w-100 border-0 px-4 "
                  style={{
                    backgroundColor: "transparent",
                    outline: "none",
                    color: "#d3c8c8",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="mx-3" style={{}}>
                    <Tooltip title="Add File">
                      <IconButton>
                        <FaPlus size={18} color="#a2a9b0"></FaPlus>
                      </IconButton>{" "}
                    </Tooltip>
                  </div>

                  <Tooltip title="Get in-depth answers">
                    <IconButton>
                      <div
                        className="mx-2"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#A2A9B0",
                          fontSize: "15px",
                        }}
                      >
                        <FaGlobeAsia size={18}></FaGlobeAsia>
                        <span className="mx-2">Deep Research</span>
                      </div>
                    </IconButton>{" "}
                  </Tooltip>
                  <Tooltip title="Create docs and apps">
                    <IconButton>
                      <div
                        style={{ color: "#4e8ff8", backgroundColor: "#262627" }}
                        className="mx-1  px-3 py-2  rounded-pill fs-6 d-flex align-items-center"
                      >
                        <TbCopyPlus size={18} />
                        <span
                          style={{
                            // color: "#A2A9D9",
                            margin: "0px 5px",
                          }}
                        >
                          Canvas
                        </span>
                      </div>
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  {/* <button >Ask</button> */}
                  {!isInputOn ? (
                    <GoPaperAirplane
                      color="#a2a9b0"
                      onClick={() => askQuestuon()}
                    />
                  ) : (
                    <Tooltip title="Use microphone">
                      <IconButton>
                        <FaMicrophone size={17} color="#a2a9b0"></FaMicrophone>
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#A2A9B0",
              }}
            >
              <span>Gemini can make mistakes, so double-check it</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gemini;

const sidebarManuFalse = {
  width: "395px",
  height: "100vh",
  backgroundColor: "#282a2c",
  // color: "white",
  color: "#A2A9B0",
  padding: "10px",
};

const sidebarManuTrue = {
  width: "75px",
  height: "100vh",
  backgroundColor: "#282a2c",
  // color: "white",
  color: "#A2A9B0",
  display: "block",
  justifyItems: "center",
};
