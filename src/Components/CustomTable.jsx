import { Switch } from "@mui/material";
import React from "react";

export const CustomTable = ({
  headers,
  data,
  openInPopup,
  ButtonText,
  ButtonText1,
  ButtonText2,
  openInPopup2,
  openInPopup3,
  openInPopup4,
}) => {
  return (
    <div
      style={{
        maxHeight: 400,
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: 15,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f2f2f2",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#aaa9ac",
        },
      }}
    >
      <div
        style={{
          display: "table",
          minWidth: 700,
          backgroundColor: "#f5f5f5",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "table-header-group",
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "#444444",
          }}
        >
          <div style={{ display: "table-row" }}>
            {headers.map((header, index) => (
              <div
                style={{
                  display: "table-cell",
                  textAlign: "center",
                  padding: "6px",
                  color: "white",
                  borderBottom: "1px solid rgba(224, 224, 224, 1)",
                  fontSize: "16px",
                }}
                key={index}
              >
                {header}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "table-row-group" }}>
          {data.map((row, index) => (
            <div
              style={{
                display: "table-row",
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
              }}
              key={index}
            >
              {Object.values(row).map((value, index) => (
                <div
                  style={{
                    display: "table-cell",
                    textAlign: "center",
                    // padding: "2px",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    fontSize: "14px",
                  }}
                  key={index}
                >
                  {typeof value === "boolean" ? (
                    <Switch
                      checked={value}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  ) : (
                    value
                  )}
                </div>
              ))}
              <div
                style={{
                  display: "table-cell",
                  textAlign: "center",
                  // padding: "5px",
                  borderBottom: "1px solid rgba(224, 224, 224, 1)",
                  zIndex: 0,
                }}
              >
                {openInPopup && (
                  <div
                    style={{
                      display: "inline-block",
                      // padding: "6px 12px",
                      // border: "1px solid #1976d2",
                      // borderRadius: "4px",
                      color: "#1976d2",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                    onClick={() => openInPopup(row)}
                  >
                    View
                  </div>
                )}
                {openInPopup2 && (
                  <div
                    style={{
                      display: "inline-block",
                      // padding: "px 6px",
                      // border: "1px solid #28a745",
                      // borderRadius: "4px",
                      color: "#28a745",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                    onClick={() => openInPopup2(row)}
                  >
                    {ButtonText}
                  </div>
                )}
                {openInPopup3 && (
                  <div
                    style={{
                      display: "inline-block",
                      // padding: "px 6px",
                      // border: "1px solid #28a745",
                      // borderRadius: "4px",
                      color: "#28a745",
                      cursor: "pointer",
                    }}
                    onClick={() => openInPopup3(row)}
                  >
                    {ButtonText1}
                  </div>
                )}
                {openInPopup4 && (
                  <div
                    style={{
                      display: "inline-block",
                      // padding: "px 6px",
                      // border: "1px solid #28a745",
                      // borderRadius: "4px",
                      color: "#28a745",
                      cursor: "pointer",
                    }}
                    onClick={() => openInPopup4(row)}
                  >
                    {ButtonText2}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
