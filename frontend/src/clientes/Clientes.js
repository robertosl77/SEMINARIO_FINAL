import React, { useEffect, useState } from 'react';
import Navbar from '../navegacion/Navbar';
import { useTable, useSortBy, usePagination } from 'react-table';
import './css/Clientes.css';

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/API/CL/ObtieneClientes');
        const data = await response.json();
        const clientesConCalleCompleta = data.map(cliente => ({
          ...cliente,
          direccion: `${cliente[2]} ${cliente[3]} ${cliente[4]}`,
        }));
        setClientes(clientesConCalleCompleta);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };
    obtenerClientes();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Cuenta', accessor: row => row[0] },
      { Header: 'Nombre Cliente', accessor: row => row[1] },
      { Header: 'Dirección', accessor: 'direccion' },
      { Header: 'Localidad', accessor: row => row[5] },
      { Header: 'Partido', accessor: row => row[6] },
      { Header: 'CT', accessor: row => row[7] },
      { Header: 'Alim', accessor: row => row[8] },
      { Header: 'SSEE', accessor: row => row[9] },
      { Header: 'Inicio Recs', accessor: row => row[14] },
      { Header: 'Fin Recs', accessor: row => row[15] },
      {
        Header: 'Vigencia',
        accessor: row => row[16],
        Cell: ({ value }) => {
          let percent = Math.min(100, Math.max(0, parseInt(value, 10) || 0));
          const hue = 120 - (percent * 1.2);
          const backgroundColor = `hsl(${hue}, 100%, 50%)`;
          return (
            <div style={{ position: 'relative' }}>
              <span
                className="vigencia"
                data-percent={percent}
                style={{ backgroundColor }}
              >
                {value}%
              </span>
            </div>
          );
        }
      },
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
      <div className="clientes-content">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={colIndex}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <td {...cell.getCellProps()} key={cellIndex}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
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
  );
}

export default Clientes;
