import React, { useEffect, useState } from 'react';
import Navbar from '../navegacion/Navbar'; // Ajusta la ruta según la estructura de tu proyecto
import { useTable, useSortBy } from 'react-table'; // Importa useSortBy
import './css/Clientes.css'; // Asegúrate de que la ruta sea correcta según la ubicación del archivo CSS

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await fetch('http://localhost:5000/API/CL/ObtieneClientes');
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div>
      <Navbar />
      <div className="clientes-content">
        <h3>Clientes</h3>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    key={column.id} // Agrega key aquí
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}> {/* Agrega key aquí */}
                  {row.cells.map(cell => (
                    <td key={cell.column.id} {...cell.getCellProps()}> {/* Agrega key aquí */}
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
