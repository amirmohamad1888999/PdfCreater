"use client";
import { useState } from "react";
import moment from "moment-jalaali";
// import html2pdf from "html2pdf.js";
import { useRouter } from "next/navigation";

moment.loadPersian({ dialect: "persian-modern" });

const materials = [
  "ذرت",
  "سویا",
  "گندم",
  "پودر صدف",
  "جوش شیرین",
  "روغن",
  "سوس",
  "قنات",
  "نمک",
  "استخوان",
  "مکمل",
  "متیونین",
  "لیزین",
  "مولتی آنزیم",
  "D3",
  "توکسین بایندر",
  "ترئونین",
  "بتائین",
  "کربنات",
  "کولین",
  "کلزا",
  "اسیدی فایر",
  "ویتامین C",
  "آمینو توتال",
  "کارتن",
  "شانه",
];

export default function MaterialReport() {
  const router = useRouter();
  const [DateTime, setDateTime] = useState("");
  const [data, setData] = useState(
    materials.map((name) => ({
      name,
      previous: "",
      input: "",
      added: "",
      output: "",
      daily: "",
      remaining: "",
    }))
  );

  const handleChange = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  const handleGeneratePDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const original = document.getElementById("report-content");
    const cloned = original.cloneNode(true);

    // ✅ Add paddingBottom to the title
    const title = cloned.querySelector("div.text-center.font-bold");
    if (title) {
      title.style.paddingBottom = "10px";
    }

    // ✅ Add paddingBottom to each <th>
    const headers = cloned.querySelectorAll("thead th");
    headers.forEach((th) => {
      th.style.paddingBottom = "10px";
    });

    // ✅ Make the first column values (e.g. ذرت, سویا) bold and padded
    const firstColumnCells = cloned.querySelectorAll("tbody tr td:first-child");
    firstColumnCells.forEach((td) => {
      td.style.fontWeight = "bold";
      td.style.paddingBottom = "10px";
      td.style.textAlign = "center";
    });

    // ✅ Replace inputs with readable spans
    const inputs = cloned.querySelectorAll("input");
    inputs.forEach((input) => {
      const value = input.value || "-";
      const span = document.createElement("div");
      span.innerText = value;
      span.style.display = "flex";
      span.style.alignItems = "center";
      span.style.justifyContent = "center";
      span.style.height = "100%";
      span.style.paddingBottom = "10px"; // padding for values
      span.style.fontSize = "11px";
      span.style.lineHeight = "1";
      span.style.fontFamily = "__myFont_13d9f2";
      input.parentNode.replaceChild(span, input);
    });

    // ✅ Create off-screen container for rendering
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.width = "794px";
    container.style.fontFamily = "__myFont_13d9f2";
    container.appendChild(cloned);
    document.body.appendChild(container);

    const opt = {
      margin: 0.2,
      filename: `گزارش مصرف مواد - ${moment().format(
        "jYYYY_jMM_jDD_HH_mm"
      )}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(opt)
      .from(cloned)
      .save()
      .then(() => {
        document.body.removeChild(container);
      });
  };

  return (
    <div className="p-4 space-y-4">
      <div
        id="report-content"
        dir="rtl"
        style={{
          fontFamily: "__myFont_13d9f2",
          fontSize: "12px",
          width: "794px", // A4 width at 96dpi
          lineHeight: "1.8",
        }}
        className="bg-white text-right p-4 mx-auto"
      >
        <div
          className="text-center font-bold"
          style={{
            fontSize: "16px",
            marginBottom: "24px",
          }}
        >
          گزارش مصرف مواد
        </div>

        <div className="mb-5 w-full flex justify-start text-right">
          <div> تاریخ: </div>
          <input
            className="border-[1px] border-gray-400 rounded-md"
            value={DateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          {/* {moment().format("jYYYY/jMM/jDD HH:mm")} */}
        </div>

        <table
          className="w-full border border-black"
          style={{
            tableLayout: "fixed",
            width: "100%",
            fontSize: "11px",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#e5e5e5" }}>
            <tr>
              {[
                "شرح",
                "موجودی روز قبل",
                "وارده",
                "مقدار اضافه شده",
                "خروجی",
                "مصرف روزانه",
                "موجودی پایان دوره",
              ].map((header, i) => (
                <th
                  key={i}
                  className="border border-black"
                  style={{
                    padding: "6px 4px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="border border-black px-1 py-1 text-right">
                  {item.name}
                </td>
                {[
                  "previous",
                  "input",
                  "added",
                  "output",
                  "daily",
                  "remaining",
                ].map((key) => (
                  <td
                    key={key}
                    className="border border-black px-1 py-1 text-right"
                  >
                    <input
                      type="text"
                      className="w-full text-right outline-none"
                      style={{
                        padding: "4px",
                        fontSize: "11px",
                      }}
                      value={item[key]}
                      onChange={(e) => handleChange(idx, key, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
