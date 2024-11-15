<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual de Ejecución de la Aplicación "seminario-final"</title>
</head>
<body>
    <h1>Manual de Ejecución de la Aplicación "seminario-final"</h1>

    <h2>Prerrequisitos</h2>
    <p>Antes de comenzar, asegúrate de tener instalados:</p>
    <ul>
        <li><a href="https://www.python.org/downloads/">Python 3.x</a></li>
        <li><a href="https://nodejs.org/">Node.js y npm (Node Package Manager)</a></li>
        <li><a href="https://code.visualstudio.com/">Visual Studio Code</a> (opcional, pero recomendado)</li>
    </ul>

    <hr>

    <h2>Verificación de Versiones de Prerrequisitos</h2>
    <p>Antes de proceder con la configuración del proyecto, verifica que tienes las versiones correctas de Python, Node.js y npm instaladas.</p>

    <h3>1. Verificar la versión de Python</h3>
    <p>Abre una terminal y ejecuta:</p>
    <pre><code>python --version</code></pre>
    <p>Asegúrate de tener instalada una versión compatible, como <code>Python 3.x</code>.</p>

    <h3>2. Verificar la versión de Node.js</h3>
    <p>En la misma terminal, ejecuta:</p>
    <pre><code>node -v</code></pre>
    <p>Confirma que tienes una versión compatible, por ejemplo, <code>v14.x.x</code> o superior.</p>

    <h3>3. Verificar la versión de npm</h3>
    <p>Ejecuta:</p>
    <pre><code>npm -v</code></pre>
    <p>Verifica que tengas una versión adecuada, como <code>6.x.x</code> o superior.</p>
    <p><strong>Nota:</strong> Si alguna de estas versiones no está instalada o no es la adecuada, sigue los pasos para instalar o actualizar <a href="https://www.python.org/downloads/">Python</a> y <a href="https://nodejs.org/">Node.js</a>.</p>

    <hr>

    <h2>1. Clonar el Repositorio</h2>
    <ol>
        <li>Clona el repositorio desde GitHub:
            <pre><code>git clone &lt;url_del_repositorio&gt;</code></pre>
        </li>
        <li>Navega a la carpeta raíz del proyecto:
            <pre><code>cd seminario-final</code></pre>
        </li>
    </ol>

    <hr>

    <h2>2. Configurar y Ejecutar el Backend</h2>

    <h3>Activar el Entorno Virtual</h3>
    <ol>
        <li>Navega a la carpeta del backend:
            <pre><code>cd Backend</code></pre>
        </li>
        <li>Activa el entorno virtual <code>venv</code> existente:
            <ul>
                <li>En sistemas Unix/Mac:
                    <pre><code>source venv/bin/activate</code></pre>
                </li>
                <li>En sistemas Windows (usando Bash):
                    <pre><code>source venv/Scripts/activate</code></pre>
                </li>
            </ul>
        </li>
        <li>Verifica que las dependencias necesarias ya estén instaladas (si no, usa el siguiente comando):
            <pre><code>pip install -r requirements.txt</code></pre>
        </li>
    </ol>

    <h3>Ejecutar el Servidor del Backend</h3>
    <ol>
        <li>Desde la carpeta <code>Backend</code>, ejecuta la aplicación:
            <pre><code>python app.py</code></pre>
        </li>
    </ol>

    <hr>

    <h2>3. Configurar y Ejecutar el Frontend</h2>

    <h3>Navegar a la Carpeta del Frontend</h3>
    <ol>
        <li>Abre una nueva terminal (manteniendo el backend corriendo) y navega a la carpeta del frontend:
            <pre><code>cd ../Frontend</code></pre>
        </li>
    </ol>

    <h3>Instalar Dependencias de React</h3>
    <ol>
        <li>Instala las dependencias usando npm:
            <pre><code>npm install</code></pre>
        </li>
    </ol>

    <h3>Ejecutar la Aplicación de React</h3>
    <ol>
        <li>Inicia el servidor de desarrollo:
            <pre><code>npm start</code></pre>
        </li>
    </ol>

    <hr>

    <h2>4. Acceso a la Aplicación</h2>
    <ul>
        <li>El backend debería estar corriendo en un puerto específico (por ejemplo, <code>http://localhost:5000</code>).</li>
        <li>El frontend normalmente correrá en <code>http://localhost:3000</code> (a menos que esté configurado de manera diferente).</li>
        <li>Asegúrate de que ambos servicios estén activos y que el frontend pueda comunicarse con el backend correctamente.</li>
    </ul>

    <hr>

    <h2>5. Consideraciones Adicionales</h2>
    <ul>
        <li>Si experimentas errores de conexión entre el frontend y el backend, asegúrate de que las URLs estén configuradas correctamente en las solicitudes API del frontend.</li>
        <li>Si surgen errores de dependencias en el backend, verifica que el entorno virtual <code>venv</code> esté correctamente activado y que las dependencias necesarias estén instaladas.</li>
    </ul>
</body>
</html>
