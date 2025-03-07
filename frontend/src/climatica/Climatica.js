import React, { useEffect, useState } from 'react';
import Navbar from '../navegacion/Navbar';
import { useTable, useSortBy } from 'react-table';
import './css/Climatica.css';

function Climatica() {
  const [clientes, setClientes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [riskValues, setRiskValues] = useState({
    precipprob: 20, // Por defecto: 20%
    windgust: 30,  // Por defecto: 30 km/h
    severerisk: 10 // Por defecto: 10
  });

  const handleRiskChange = (e) => {
    const { name, value } = e.target;
    setRiskValues((prev) => ({
      ...prev,
      [name]: parseInt(value) || prev[name] // Aseguramos que sea un número
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/API/ME/ProximasTormentas", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(riskValues) // Enviamos los valores de riesgo
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }

        const data = await response.json();

        if (data.error) {
          setErrorMessage(data.error);
          setClientes([]);
        } else {
          setClientes(data);
          setErrorMessage(null);
        }
      } catch (error) {
        setErrorMessage("No se pudo conectar al servidor. Verifica tu conexión.");
        setClientes([]);
        console.error("Error al obtener los datos climáticos", error);
      }
    };

    fetchData();
  }, [riskValues]); // Se ejecuta cuando cambian los valores de riesgo

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
              <td>
                <input
                  type="number"
                  name="precipprob"
                  value={riskValues.precipprob}
                  onChange={handleRiskChange}
                  min="5"
                  max="95"
                  step="5"
                />
              </td>
            </tr>
            <tr>
              <td>Viento máximo (km/h)</td>
              <td>30</td>
              <td>80</td>
              <td>
                <input
                  type="number"
                  name="windgust"
                  value={riskValues.windgust}
                  onChange={handleRiskChange}
                  min="30"
                  max="80"
                  step="5"
                />
              </td>
            </tr>
            <tr>
              <td>Riesgo severo</td>
              <td>3</td>
              <td>20</td>
              <td>
                <input
                  type="number"
                  name="severerisk"
                  value={riskValues.severerisk}
                  onChange={handleRiskChange}
                  min="1"
                  max="20"
                  step="1"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {errorMessage && (
          <div className="error-message">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <div className="table-container">
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
              {rows.length === 0 && !errorMessage ? (
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