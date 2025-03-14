// 📌 Función reutilizable para calcular la duración
export const calcularDuracion = (inicio, restitucion) => {
    const fechaInicio = new Date(inicio);
    const fechaRestitucion = restitucion ? new Date(restitucion) : new Date();
    const diferenciaMs = fechaRestitucion - fechaInicio; // Diferencia en milisegundos
  
    // Convertir diferencias de tiempo
    const segundos = Math.floor(diferenciaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30); // Aproximado
  
    // Devolver en el formato correcto
    if (segundos < 60) return `${segundos} seg`;
    if (minutos < 60) return `${minutos} min`;
    if (horas < 24) return `${horas} hs`;
    if (dias < 7) return `${dias} días`;
    if (dias < 30) return `${semanas} semanas`;
    return `${meses} meses`;
  };

export const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);

    // Obtener día de la semana, día, mes y año en formato largo
    const opcionesFecha = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opcionesFecha);

    // Obtener hora en formato 24h
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const horaFormateada = fechaObj.toLocaleTimeString('es-ES', opcionesHora);

    return `${fechaFormateada} a las ${horaFormateada}`;
  };