window.addEventListener('load', function(){

    //referenciar elementos de la pagina
    const msgSuccess = this.document.getElementById('msgSuccess');
    const btnLogOut = this.document.getElementById('btnLogOut')
    
    // recuperar nombre del usuario del localStorage
    const result = JSON.parse(this.localStorage.getItem('result'));
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    //implementar listener
    btnLogOut.addEventListener('click', function(){
        logOut(btnLogOut);
    });
    
});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
  }
  
  function ocultarAlerta() {
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
  }

  async function logOut() {
    const url = 'http://localhost:8081/login/logout-async';
    const data = {
      tipoDocumento: localStorage.getItem('tipoDocumento'),
      numeroDocumento: localStorage.getItem('numeroDocumento'),
    };
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

      });
  
      if (!response.ok) {
        mostrarAlerta('Error: No se pudo cerrar la sesión');
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Respuesta del servidor', result);

      if (result.codigo === '00') {

        localStorage.removeItem('result'); 
        localStorage.removeItem('tipoDocumento');
        localStorage.removeItem('numeroDocumento');
        window.location.replace('index.html'); 
        
      } else {
        alert(result.mensaje);
      }
  
    } catch(error){

      console.error('Error: No se pudo cerrar la sesión', error);
      alert('Error: No se pudo cerrar la sesión');

    }
  }