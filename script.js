const boton = document.getElementById('boton-ubicacion');

const mensajeEstado = document.getElementById('mensaje-estado');

const numeroWhatsApp = '34641894688';

boton.addEventListener('click', function () {

  if (!navigator.geolocation) {

    alert('Este dispositivo no permite obtener la ubicación.');

    return;

  }

  boton.disabled = true;

  mensajeEstado.textContent = 'Obteniendo ubicación…';

  navigator.geolocation.getCurrentPosition(

    function (posicion) {

      const lat = posicion.coords.latitude;

      const lon = posicion.coords.longitude;

      const enlaceMaps = 'https://maps.google.com/?q=' + lat + ',' + lon;

      const mensaje =

        'Hola.\n' +

        'Esta es mi ubicación actual:\n' +

        enlaceMaps;

      const urlWhatsApp =

        'https://wa.me/' +

        numeroWhatsApp +

        '?text=' +

        encodeURIComponent(mensaje);

      mensajeEstado.textContent = 'Abriendo WhatsApp...';

      // Crear enlace invisible y simular click

      const a = document.createElement('a');

      a.href = urlWhatsApp;

      a.target = '_blank';

      a.rel = 'noopener noreferrer';

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      boton.disabled = false;

      mensajeEstado.textContent = '';

    },

    function (error) {

      boton.disabled = false;

      mensajeEstado.textContent = '';

      let mensajeError =

        'No se ha podido obtener la ubicación. Activa el GPS e inténtalo de nuevo.';

      if (error.code === 1) {

        mensajeError =

          'Debes permitir el acceso a la ubicación para continuar.';

      }

      alert(mensajeError);

    }

  );

});