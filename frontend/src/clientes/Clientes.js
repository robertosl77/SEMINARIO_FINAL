import React, { useEffect, useState } from 'react';
import Navbar from '../navegacion/Navbar';  // Ajusta la ruta según la estructura de tu proyecto
import { useTable } from 'react-table';
import './Clientes.css';  // Asegúrate de que la ruta sea correcta según la ubicación del archivo CSS

function Clientes() {
  const [clientes, setClientes] = useState([]);

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    const obtenerClientes = async () => {
      const response = await fetch('http://localhost:5000/API/CL/ObtieneClientes');
      const data = await response.json();
      
      // Concatenamos Calle, Número y Piso/Dpto en un solo campo
      const clientesConCalleCompleta = data.map(cliente => ({
        ...cliente,
        direccion: `${cliente[2]} ${cliente[3]} ${cliente[4]}`, // Concatenamos los campos
      }));

      setClientes(clientesConCalleCompleta);
    };

    obtenerClientes();
  }, []);

  // Columnas para la tabla
  const columns = React.useMemo(
    () => [
      { Header: 'Cuenta', accessor: (row) => row[0] },
      { Header: 'Nombre Cliente', accessor: (row) => row[1] },
      { Header: 'Dirección', accessor: (row) => row.direccion }, // Nueva columna con la dirección concatenada
      { Header: 'Localidad', accessor: (row) => row[5] },
      { Header: 'Partido', accessor: (row) => row[6] },
      { Header: 'CT', accessor: (row) => row[7] },
      { Header: 'Alim', accessor: (row) => row[8] },
      { Header: 'SSEE', accessor: (row) => row[9] },
      { Header: 'Inicio Recs', accessor: (row) => row[14] },
      { Header: 'Fin Recs', accessor: (row) => row[15] },
      {
        Header: 'Vigencia',
        accessor: (row) => row[16],
        Cell: ({ value }) => {
          // Aseguramos que el valor esté dentro del rango 0-100
          let percent = Math.min(100, Math.max(0, parseInt(value, 10) || 0)); // Convertimos a entero y aseguramos que esté entre 0 y 100
        
          // Calcular el color en función del porcentaje (0 = verde, 100 = rojo)
          const hue = 120 - (percent * 1.2); // 120 (verde) a 0 (rojo)
          const backgroundColor = `hsl(${hue}, 100%, 50%)`;
        
          return (
            <div style={{ position: 'relative' }}>
              {/* Campo visible con estilo de semaforización */}
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: clientes,
  });

  return (
    <div>
      <Navbar />
      <div className="content">
        <h3>Clientes</h3>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
