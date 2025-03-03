import React, { useEffect, useState } from 'react';
import Navbar from '../navegacion/Navbar';
import { useTable, useSortBy } from 'react-table';
import './css/Climatica.css';

function Climatica() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/API/ME/ProximasTormentas", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error("Error al obtener los datos climáticos", error));
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Cuenta', accessor: 'cuenta' },
      { Header: 'Cliente', accessor: 'nombre_cliente' },
      { Header: 'Localidad', accessor: 'localidad' },
      { Header: 'Partido', accessor: 'partido' },
      { Header: 'Condición', accessor: 'condicion' },
      { Header: 'Probabilidad de Lluvia', accessor: 'probabilidad_lluvia' },
      { Header: 'Ráfaga de Viento', accessor: 'viento_max' },
      { Header: 'Riesgo Severo', accessor: 'riesgo_severo' },
      { Header: 'Fecha Pronóstico', accessor: 'fecha_pronostico' }
    ],
    []
  );

  const data = React.useMemo(() => clientes, [clientes]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>Condiciones Climáticas</h1>
        
        <table className="reference-table">
          <thead>
            <tr>
              <th>Parámetro</th>
              <th>Mínimo</th>
              <th>Máximo</th>
              <th>Riesgo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Probabilidad de lluvia (%)</td>
              <td>5</td>
              <td>95</td>
              <td>80</td>
            </tr>
            <tr>
              <td>Viento máximo (km/h)</td>
              <td>30</td>
              <td>80</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Riesgo severo</td>
              <td>3</td>
              <td>20</td>
              <td>15</td>
            </tr>
          </tbody>
        </table>
        
        <div style={{ marginTop: '20px' }}>
          <table {...getTableProps()} className="climatica-table">
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, colIndex) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={colIndex}>
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.length === 0 ? (
                <tr><td colSpan="9">No hay datos climáticos disponibles</td></tr>
              ) : (
                rows.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={rowIndex}>
                      {row.cells.map(cell => {
                        const { key, ...restCellProps } = cell.getCellProps();
                        return (
                          <td key={key} {...restCellProps}>{cell.render('Cell')}</td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Climatica;
