"use client";
import { useState } from "react";
import moment from "moment-jalaali";
import { useRouter } from "next/navigation";

moment.loadPersian({ dialect: "persian-modern" });

export default function ChickenFarmReport() {
  const router = useRouter();

  const handleGeneratePDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const original = document.getElementById("report-content");
    const cloned = original.cloneNode(true);

    // ✅ Add paddingBottom to the title
    const title = cloned.querySelector("div.text-center.font-bold");
    if (title) {
      title.style.paddingBottom = "15px";
    }

    // ✅ Add paddingBottom to each <th>
    const headers = cloned.querySelectorAll("thead th");
    headers.forEach((th) => {
      th.style.paddingBottom = "15px";
    });

    // ✅ Make the first column values (e.g. ذرت, سویا) bold and padded
    const firstColumnCells = cloned.querySelectorAll("tbody tr td:first-child");
    firstColumnCells.forEach((td) => {
      td.style.fontWeight = "bold";
      td.style.paddingBottom = "15px";
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
      span.style.paddingBottom = "15px"; // padding for values
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
      filename: `گزارش مصرف روزانه - ${moment().format(
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

  const cellStyle = {
    border: "1px solid black",
    padding: "6px 4px",
    fontSize: "11px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "__myFont_13d9f2",
        fontSize: "12px",
        width: "794px",
        margin: "24px auto",
        padding: "24px",
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
          {/* Header */}
          <tr>
            <td
              colSpan={11}
              style={{ ...cellStyle, fontWeight: "bold", fontSize: "16px" }}
            >
              گزارش تولید و تلفات روزانه
            </td>
            <td
              contentEditable={true}
              colSpan={5}
              style={{ ...cellStyle, width: 130, fontSize: "12px" }}
            >
              {/* تاریخ : {moment().format("jYYYY/jMM/jDD")} */}
            </td>
          </tr>

          {/* نام سالن */}
          <tr>
            <td colSpan={5} style={cellStyle}>
              نام سالن
            </td>
            <td colSpan={1} style={cellStyle}>
              1 سالن
            </td>
            <td colSpan={1} style={cellStyle}>
              2 سالن
            </td>
            <td colSpan={1} style={cellStyle}>
              3 سالن
            </td>
            <td colSpan={1} style={cellStyle}>
              4 سالن
            </td>
            <td colSpan={1} style={cellStyle}>
              5 سالن
            </td>
            <td colSpan={1} style={cellStyle}>
              6 سالن
            </td>
            <td colSpan={2} style={cellStyle}>
              جمع کل
            </td>
            <td colSpan={3} style={cellStyle}>
              دارو
            </td>
          </tr>

          <tr>
            <td style={cellStyle} colSpan={2} rowSpan={2}>
              سن مرغ
            </td>
            <td style={cellStyle} colSpan={3}>
              سن عادی
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle}>نام</td>
            <td style={cellStyle}>مقدار</td>
            <td style={cellStyle}>سالن</td>
          </tr>

          <tr>
            <td style={cellStyle} colSpan={3}>
              سن تولکی
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>

          <tr>
            <td style={cellStyle} colSpan={5}>
              موجودی اول وقت (مرغ)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>

          <tr>
            <td style={cellStyle} colSpan={2} rowSpan={4}>
              تلفات مرغ
            </td>
            <td style={cellStyle} colSpan={3}>
              تلفات عادی
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>

          <tr>
            <td style={cellStyle} colSpan={3}>
              تلفات وارده
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              تلفات بیماری
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              کل تلفات
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>

          <tr>
            <td style={cellStyle} colSpan={5}>
              موجودی اول وقت (مرغ)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td colSpan={3} style={cellStyle}>
              واکسن‌ها
            </td>
          </tr>

          <tr>
            <td style={cellStyle} colSpan={2} rowSpan={16}>
              تولید تخم مرغ
            </td>
            <td style={cellStyle} colSpan={3}>
              سالم (کارتن)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle}>نام</td>
            <td style={cellStyle}>مقدار</td>
            <td style={cellStyle}>سالن</td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              سالم (شانه)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              شکسته (کارتن)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              شکسته (شانه)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              کودی (کارتن)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              کودی (شانه)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              دو زرده (کارتن)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              دو زرده (شانه)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              لنبه (کارتن)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              لنبه (شانه)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td colSpan={3} style={cellStyle}>
              توضیحات
            </td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              کل تولید (کارتن)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              کل تولید (شانه)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              درصد تولید
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              وزن یک کارتن (کیلوگرم)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              موجودی کل انبار تخم مرغ سالم و دو زرده (کارتن)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              موجودی کل انبار تخم مرغ کودی و شکسته (کارتن)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
            <td contentEditable={true}></td>
          </tr>

          <tr>
            <td style={cellStyle} colSpan={2} rowSpan={5}>
              دان
            </td>
            <td style={cellStyle} colSpan={3}>
              دان اول وقت
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              دان مصرفی
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              سرانه دان مصرفی (گرم)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              دان آخر وقت
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              فرمول دان (شماره)
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={2} rowSpan={2}>
              دما
            </td>
            <td style={cellStyle} colSpan={3}>
              حدقل دما
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={3}>
              حداکثر دما
            </td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td colSpan={2} style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
            <td style={cellStyle} contentEditable={true}></td>
          </tr>
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
