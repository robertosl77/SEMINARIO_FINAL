<h3>Pasos para Crear una Rama y Guardar el Estado del Proyecto</h3>

<ol>
  <li>
    <h4>Asegúrate de estar en la rama principal (<code>main</code> o <code>master</code>):</h4>
    <p>Primero, asegúrate de que estás en la rama principal, donde has estado haciendo tus commits.</p>
    <pre><code>git checkout main  # O "git checkout master" si tu rama principal se llama "master"</code></pre>
  </li>
  <li>
    <h4>Crear la Rama <code>entregable1</code>:</h4>
    <p>Crea una nueva rama llamada <code>entregable1</code> basada en el estado actual de tu rama principal:</p>
    <pre><code>git branch entregable1</code></pre>
  </li>
  <li>
    <h4>Cambiarte a la Nueva Rama <code>entregable1</code>:</h4>
    <p>Cambia a la nueva rama para confirmar que se ha creado correctamente y para trabajar en ella si es necesario:</p>
    <pre><code>git checkout entregable1</code></pre>
  </li>
  <li>
    <h4>Verificar el Estado:</h4>
    <p>Puedes verificar que estás en la rama correcta usando:</p>
    <pre><code>git branch</code></pre>
    <p>Esto mostrará una lista de todas las ramas y marcará la que tienes actualmente seleccionada con un asterisco (<code>*</code>).</p>
  </li>
  <li>
    <h4>Guardar Cambios en la Rama Principal:</h4>
    <p>Si planeas continuar desarrollando en la rama principal (por ejemplo, preparando el siguiente entregable), vuelve a la rama principal:</p>
    <pre><code>git checkout main</code></pre>
  </li>
</ol>

<h3>Confirmación y Push</h3>

<ol>
  <li>
    <h4>Subir la Nueva Rama a GitHub:</h4>
    <p>Sube la rama <code>entregable1</code> a GitHub para que esté disponible en el repositorio remoto:</p>
    <pre><code>git push origin entregable1</code></pre>
  </li>
  <li>
    <h4>Verificar en GitHub:</h4>
    <p>Ve a tu repositorio en GitHub y verifica que la nueva rama <code>entregable1</code> aparece en la lista de ramas.</p>
  </li>
</ol>

<h3>Resumen</h3>

<ul>
  <li><strong>Rama Principal (<code>main</code> o <code>master</code>)</strong>: Donde continuarás trabajando en el desarrollo.</li>
  <li><strong>Rama <code>entregable1</code></strong>: Captura el estado del proyecto hasta el primer entregable. Esta rama estará disponible tanto localmente como en el repositorio remoto en GitHub.</li>
</ul>
