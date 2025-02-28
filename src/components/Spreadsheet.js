// src/components/Spreadsheet.js
import './Spreadsheet.css';
import React, { useState } from "react";
import { HyperFormula } from "hyperformula";

const Spreadsheet = () => {
  const [cells, setCells] = useState({});

  // Initialize HyperFormula instance
  const hfInstance = HyperFormula.buildEmpty();

  // Handle input change
  const handleChange = (cell, value) => {
    const updatedCells = { ...cells, [cell]: value };
    setCells(updatedCells);

    try {
      hfInstance.setCellContents({ sheet: 0, row: cell[1], col: cell[0] }, value);
    } catch (error) {
      console.error("Formula Error: ", error.message);
    }
  };

  // Render cells
  const renderCells = () => {
    const rows = [];
    for (let row = 0; row < 10; row++) {
      const cells = [];
      for (let col = 0; col < 10; col++) {
        const cellKey = `${col}-${row}`;
        cells.push(
          <td key={cellKey}>
            <input
              value={cells[cellKey] || ""}
              onChange={(e) => handleChange([col, row], e.target.value)}
              placeholder={`${col}:${row}`}
            />
          </td>
        );
      }
      rows.push(<tr key={row}>{cells}</tr>);
    }
    return rows;
  };

  return (
    <div>
      <h2>Simple Spreadsheet</h2>
      <table border="1">
        <tbody>{renderCells()}</tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
