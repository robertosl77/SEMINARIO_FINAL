import React, { useEffect, useState } from 'react';
import Navbar from '../navegacion/Navbar';
import { useTable, useSortBy, usePagination } from 'react-table';
import './css/Climatica.css';

function Climatica() {
  const rol = sessionStorage.getItem('rol');
  const [clientes, setClientes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [riskValues, setRiskValues] = useState({
    precipprob: 70,
    windgust: 60,
    severerisk: 40
  });
  const [isLoading, setIsLoading] = useState(false); 

  const handleRiskChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value) || 0;
    if (name === "precipprob" && (parsedValue < 0 || parsedValue > 100)) return;
    if (name === "windgust" && (parsedValue < 0 || parsedValue > 150)) return;
    if (name === "severerisk" && (parsedValue < 0 || parsedValue > 100)) return;

    setRiskValues((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/API/ME/ProximasTormentas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(riskValues)
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [riskValues]);

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 30 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <Navbar />
      <div className="content">
        <div className="reference-table-container">
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
                <td>30</td>
                <td>100</td>
                <td>
                  {['admin'].includes(rol) ? (
                    <input
                      type="number"
                      name="precipprob"
                      value={riskValues.precipprob}
                      onChange={handleRiskChange}
                      min="0"
                      max="100"
                      step="5"
                    />
                  ) : (
                    <span>{riskValues.precipprob}</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>Viento máximo (km/h)</td>
                <td>40</td>
                <td>150</td>
                <td>
                {['admin'].includes(rol) ? (
                  <input
                    type="number"
                    name="windgust"
                    value={riskValues.windgust}
                    onChange={handleRiskChange}
                    min="0"
                    max="150"
                    step="10"
                  />
                ) : (
                  <span>{riskValues.windgust}</span>
                )}
                </td>
              </tr>
              <tr>
                <td>Riesgo severo</td>
                <td>30</td>
                <td>100</td>
                <td>
                  {['admin'].includes(rol) ? (
                    <input
                      type="number"
                      name="severerisk"
                      value={riskValues.severerisk}
                      onChange={handleRiskChange}
                      min="0"
                      max="100"
                      step="5"
                    />
                  ) : (
                    <span>{riskValues.severerisk}</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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
              {isLoading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>
                    <div className="spinner">Cargando...</div>
                  </td>
                </tr>
              ) : page.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    {errorMessage || "No hay datos climáticos disponibles"}
                  </td>
                </tr>
              ) : (
                page.map((row, rowIndex) => {
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

          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>{' '}
            <span>
              Página{' '}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Total de registros: <strong>{data.length}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Climatica;