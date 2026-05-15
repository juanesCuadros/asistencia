import React from "react";

export default function DataTable({ headers, data, renderRow }) {
    return (
    <div className="table-container" style={{ overflowX: 'auto', marginTop: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
            {headers.map((header, index) => (
              <th key={index} style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }} className="table-row-hover">
                {renderRow(item)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} style={{ padding: '20px', textAlign: 'center' }}>
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}