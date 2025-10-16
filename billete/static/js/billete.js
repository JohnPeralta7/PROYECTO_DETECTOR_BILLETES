 let stream = null;
let isProcessing = false;
let currentFacingMode = 'environment'; // Empezar con cámara trasera

// Iniciar la cámara al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initCamera();
    setupEventListeners();
});

function initCamera() {
    // Configuración mejorada para la cámara con MEJOR CALIDAD
    const constraints = {
        video: {
            width: { ideal: 1920 }, // Full HD para mejor nitidez
            height: { ideal: 1080 },
            facingMode: currentFacingMode,
            // Configuraciones adicionales para mejor calidad
            focusMode: 'continuous', // Enfoque continuo
            exposureMode: 'continuous' // Exposición automática
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(videoStream => {
        stream = videoStream;
        const video = document.getElementById('video');
        video.srcObject = stream;
        
        // Asegurar que el video se muestre
        video.style.display = 'block';
        
        // Habilitar botones cuando el video esté listo
        video.addEventListener('loadedmetadata', () => {
            document.querySelector('.btn-scan').disabled = false;
            document.querySelector('.btn-switch-camera').disabled = false;
        });
    })
    .catch(err => {
        console.error("No se pudo acceder a la cámara:", err);
        document.querySelector('.result-text').textContent = 'Error: No se pudo acceder a la cámara';
        document.querySelector('.btn-scan').disabled = true;
        document.querySelector('.btn-switch-camera').disabled = true;
    });
}

function setupEventListeners() {
    // Botón escanear
    document.querySelector('.btn-scan').addEventListener('click', scanBill);
    
    // Botón reiniciar
    document.querySelector('.btn-reset').addEventListener('click', resetCamera);
    
    // Botón cambiar cámara
    document.querySelector('.btn-switch-camera').addEventListener('click', switchCamera);
}

function switchCamera() {
    // Cambiar entre cámara trasera y frontal
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    
    // Detener cámara actual
    stopCamera();
    
    // Deshabilitar botones mientras cambia
    document.querySelector('.btn-scan').disabled = true;
    document.querySelector('.btn-switch-camera').disabled = true;
    
    // Actualizar texto
    const cameraType = currentFacingMode === 'environment' ? 'trasera' : 'frontal';
    document.querySelector('.result-text').textContent = `Cambiando a cámara ${cameraType}...`;
    
    // Reiniciar con nueva cámara
    setTimeout(() => {
        initCamera();
    }, 300); // Pequeña pausa para asegurar que la cámara se liberó
}

function scanBill() {
    // Evitar múltiples clics mientras procesa
    if (isProcessing) {
        return;
    }

    const video = document.getElementById('video');
    
    // Validar que el video tenga dimensiones válidas
    if (video.videoWidth === 0 || video.videoHeight === 0) {
        document.querySelector('.result-text').textContent = 'Error: Video no está listo';
        return;
    }

    isProcessing = true;
    document.querySelector('.btn-scan').disabled = true;
    document.querySelector('.btn-switch-camera').disabled = true;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Dibujar la imagen con mejor calidad
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Obtener la imagen en base64 con ALTA CALIDAD
    const dataURL = canvas.toDataURL('image/jpeg', 0.95); // Calidad 95%

    // Actualizar texto mientras procesa
    document.querySelector('.result-text').textContent = 'Procesando imagen...';

    // Obtener el token CSRF
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value || '';

    // Enviar la imagen al backend
    fetch('/procesar-imagen/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ image: dataURL })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Ocultar el video
        video.style.display = 'none';
        
        // Detener la cámara
        stopCamera();

        // Mostrar la imagen procesada
        const img = document.getElementById('img-resultado');
        // Manejar diferentes formatos de URL
        const imgUrl = data.img_url.startsWith('/') ? data.img_url : '/' + data.img_url;
        img.src = imgUrl + '?t=' + new Date().getTime();
        img.style.display = 'block';

        // Actualizar el texto del resultado
        document.querySelector('.result-text').textContent = data.resultado || 'Procesado correctamente';
        
        // Habilitar botón de reinicio
        document.querySelector('.btn-reset').disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        document.querySelector('.result-text').textContent = 'Error al procesar la imagen';
        document.querySelector('.btn-scan').disabled = false;
        document.querySelector('.btn-switch-camera').disabled = false;
    })
    .finally(() => {
        isProcessing = false;
    });
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => {
            track.stop();
            console.log('Track detenido:', track.kind);
        });
        stream = null;
    }
}

function resetCamera() {
    const video = document.getElementById('video');
    const img = document.getElementById('img-resultado');
    
    // Deshabilitar botones mientras reinicia
    document.querySelector('.btn-reset').disabled = true;
    document.querySelector('.btn-scan').disabled = true;
    document.querySelector('.btn-switch-camera').disabled = true;
    
    // Ocultar imagen y mostrar video
    img.style.display = 'none';
    video.style.display = 'block';
    
    // Resetear el texto
    document.querySelector('.result-text').textContent = 'Identificando...';
    
    // Reiniciar la cámara con la configuración actual
    const constraints = {
        video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: currentFacingMode,
            focusMode: 'continuous',
            exposureMode: 'continuous'
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(videoStream => {
        stream = videoStream;
        video.srcObject = stream;
        
        // Habilitar botones cuando esté listo
        video.addEventListener('loadedmetadata', () => {
            document.querySelector('.btn-scan').disabled = false;
            document.querySelector('.btn-switch-camera').disabled = false;
        }, { once: true });
    })
    .catch(err => {
        console.error("No se pudo acceder a la cámara:", err);
        document.querySelector('.result-text').textContent = 'Error al reiniciar la cámara';
    });
}

// Limpiar al cerrar la página
window.addEventListener('beforeunload', () => {
    stopCamera();
});