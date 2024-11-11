<h3>Pasos para Pasar Todos los Cambios de una Rama de Desarrollo a <code>main</code></h3>

<ol>
  <li>
    <h4>Cambiar a la Rama <code>main</code>:</h4>
    <p>Primero, asegúrate de estar en la rama <code>main</code>, que es donde quieres fusionar los cambios.</p>
    <pre><code>git checkout main</code></pre>
  </li>
  <li>
    <h4>Actualizar la Rama <code>main</code>:</h4>
    <p>Antes de fusionar, es una buena práctica asegurarte de que tu rama <code>main</code> está actualizada con el repositorio remoto.</p>
    <pre><code>git pull origin main</code></pre>
  </li>
  <li>
    <h4>Fusionar la Rama de Desarrollo en <code>main</code>:</h4>
    <p>Ahora, fusiona los cambios de la rama de desarrollo (supongamos que se llama <code>desarrollo</code>) en <code>main</code>.</p>
    <pre><code>git merge desarrollo</code></pre>
  </li>
  <li>
    <h4>Resolver Conflictos (si los hay):</h4>
    <p>Si hay conflictos entre las ramas, Git te avisará y tendrás que resolverlos manualmente. Una vez resueltos, puedes continuar el merge:</p>
    <ul>
      <li><p>Edita los archivos en conflicto para resolverlos.</p></li>
      <li><p>Marca los archivos como resueltos:</p>
      <pre><code>git add <archivo-en-conflicto></code></pre></li>
      <li><p>Completa el merge:</p>
      <pre><code>git commit</code></pre></li>
    </ul>
  </li>
  <li>
    <h4>Push a <code>main</code>:</h4>
    <p>Finalmente, sube los cambios fusionados a la rama <code>main</code> en GitHub:</p>
    <pre><code>git push origin main</code></pre>
  </li>
</ol>
