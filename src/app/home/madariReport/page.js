"use client";
import { useState } from "react";
import moment from "moment-jalaali";
// import html2pdf from "html2pdf.js";
import { useRouter } from "next/navigation";

moment.loadPersian({ dialect: "persian-modern" });

export default function WarehouseLog() {
  const router = useRouter();

  const totalRows = 11; // number of data rows in each section

  // ورودی کالا initial empty rows
  const [inputRows, setInputRows] = useState(
    Array(totalRows).fill({
      type: "",
      sender: "",
      senderWeight: "",
      receivedWeight: "",
      vehicleNo: "",
      cost: "",
      notes: "",
    })
  );

  // خروجی کالا initial empty rows
  const [outputRows, setOutputRows] = useState(
    Array(totalRows).fill({
      type: "",
      weight: "",
      count: "",
      unitPrice: "",
      vehicleNo: "",
      buyer: "",
      notes: "",
    })
  );

  // Handlers for input and output tables
  const handleInputChange = (idx, key, val) => {
    const newRows = [...inputRows];
    newRows[idx] = { ...newRows[idx], [key]: val };
    setInputRows(newRows);
  };

  const handleOutputChange = (idx, key, val) => {
    const newRows = [...outputRows];
    newRows[idx] = { ...newRows[idx], [key]: val };
    setOutputRows(newRows);
  };

  const handleGeneratePDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const original = document.getElementById("report-content");
    const cloned = original.cloneNode(true);

    // Replace inputs with spans for PDF output
    cloned.querySelectorAll("input").forEach((input) => {
      const span = document.createElement("div");
      span.innerText = input.value || " "; // show input value or space
      span.style.height = "100%";
      span.style.fontSize = "11px";
      span.style.fontFamily = "__myFont_13d9f2";
      span.style.textAlign = "center";
      span.style.padding = "6px 4px"; // padding inside replaced span for spacing
      span.style.border = "none";
      input.parentNode.replaceChild(span, input);
    });

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.width = "794px"; // A4 width approx in px
    container.style.padding = "24px"; // padding around the whole content
    container.style.backgroundColor = "white";
    container.appendChild(cloned);
    document.body.appendChild(container);

    const opt = {
      margin: 0.2,
      filename: ` ورود خروج - گزارش ${moment().format(
        "jYYYY_jMM_jDD_HH_mm"
      )}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(cloned)
      .save()
      .then(() => {
        document.body.removeChild(container);
      });
  };

  // common styles for table cells
  const cellStyle = {
    border: "1px solid black",
    padding: "6px 4px", // increased padding for breathing room
    fontSize: "11px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const inputCellStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "11px",
    textAlign: "center",
    padding: "6px 4px", // added padding inside input for better look
    boxSizing: "border-box",
  };

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "__myFont_13d9f2",
        fontSize: "12px",
        width: "794px",
        margin: "24px auto", // margin around the whole page
        padding: "24px", // padding inside container
        backgroundColor: "white",
        boxSizing: "border-box",
      }}
    >
      <table
        id="report-content"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          tableLayout: "fixed",
          border: "1px solid black",
        }}
      >
        <tbody>
          {/* Title row with date */}
          <tr>
            <td
              colSpan={7}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "6px 0",
                paddingBottom: "10px", // add bottom padding here
              }}
            >
              مرغداری مداری
            </td>
            <td
              contentEditable={true}
              style={{
                border: "1px solid black",
                width: "130px",
                textAlign: "right",
                padding: "6px 6px",
                fontSize: "12px",
                paddingBottom: "10px", // add bottom padding here
              }}
            >
              {/* تاریخ : {moment().format("jYYYY/jMM/jDD")} */}
            </td>
          </tr>

          {/* ورودی کالا title row spanning all columns */}
          <tr>
            <td
              colSpan={8}
              style={{
                border: "1px solid black",
                fontWeight: "bold",
                padding: "4px",
                textAlign: "center",
                paddingBottom: "10px", // add bottom padding here
              }}
            >
              ورودی کالا
            </td>
          </tr>

          {/* ورودی کالا headers */}
          <tr>
            <td style={cellStyle}>نوع کالا</td>
            <td style={cellStyle}>فرستنده</td>
            <td style={cellStyle}>وزن بار فرستنده</td>
            <td style={cellStyle}>وزن بار تحویلی</td>
            <td style={cellStyle}>شماره ماشین</td>
            <td style={cellStyle}>مبلغ کرایه و باسکول</td>
            <td style={cellStyle} colSpan={2}>
              توضیحات
            </td>
          </tr>

          {/* ورودی کالا rows */}
          {inputRows.map((row, idx) => (
            <tr key={"input-" + idx}>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.type}
                  onChange={(e) =>
                    handleInputChange(idx, "type", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.sender}
                  onChange={(e) =>
                    handleInputChange(idx, "sender", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.senderWeight}
                  onChange={(e) =>
                    handleInputChange(idx, "senderWeight", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.receivedWeight}
                  onChange={(e) =>
                    handleInputChange(idx, "receivedWeight", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.vehicleNo}
                  onChange={(e) =>
                    handleInputChange(idx, "vehicleNo", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.cost}
                  onChange={(e) =>
                    handleInputChange(idx, "cost", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle} colSpan={2}>
                <input
                  type="text"
                  value={row.notes}
                  onChange={(e) =>
                    handleInputChange(idx, "notes", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
            </tr>
          ))}

          {/* blank row separating two parts */}
          <tr>
            <td colSpan={8} style={{ border: "none", padding: "12px" }}>
              &nbsp;
            </td>
          </tr>

          {/* خروجی کالا title row */}
          <tr>
            <td
              colSpan={8}
              style={{
                border: "1px solid black",
                fontWeight: "bold",
                padding: "4px",
                textAlign: "center",
                paddingBottom: "10px", // add bottom padding here
              }}
            >
              خروجی کالا
            </td>
          </tr>

          {/* خروجی کالا headers */}
          <tr>
            <td style={cellStyle}>نوع کالا</td>
            <td style={cellStyle}>وزن</td>
            <td style={cellStyle}>تعداد</td>
            <td style={cellStyle}>فی</td>
            <td style={cellStyle}>شماره ماشین</td>
            <td style={cellStyle}>خریدار</td>
            <td style={cellStyle} colSpan={2}>
              توضیحات
            </td>
          </tr>

          {/* خروجی کالا rows */}
          {outputRows.map((row, idx) => (
            <tr key={"output-" + idx}>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.type}
                  onChange={(e) =>
                    handleOutputChange(idx, "type", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.weight}
                  onChange={(e) =>
                    handleOutputChange(idx, "weight", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.count}
                  onChange={(e) =>
                    handleOutputChange(idx, "count", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.unitPrice}
                  onChange={(e) =>
                    handleOutputChange(idx, "unitPrice", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.vehicleNo}
                  onChange={(e) =>
                    handleOutputChange(idx, "vehicleNo", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="text"
                  value={row.buyer}
                  onChange={(e) =>
                    handleOutputChange(idx, "buyer", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
              <td style={cellStyle} colSpan={2}>
                <input
                  type="text"
                  value={row.notes}
                  onChange={(e) =>
                    handleOutputChange(idx, "notes", e.target.value)
                  }
                  style={inputCellStyle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-start w-full">
        <button
          onClick={handleGeneratePDF}
          style={{
            marginTop: "12px",
            backgroundColor: "#1e40af",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          دانلود PDF
        </button>

        <button
          onClick={() => router.push("/home")}
          style={{
            marginTop: "12px",
            marginRight: "20px",
            backgroundColor: "orange",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}
