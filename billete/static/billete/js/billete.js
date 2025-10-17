let stream = null;
let isProcessing = false;

// Iniciar la cámara al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initCamera();
    setupEventListeners();
});

function initCamera() {
    const constraints = {
        video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'environment' // Siempre cámara trasera
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(videoStream => {
        stream = videoStream;
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.style.display = 'block';
        
        // Habilitar botón cuando el video esté listo
        video.addEventListener('loadedmetadata', () => {
            const btnScan = document.querySelector('.btn-scan');
            if (btnScan) btnScan.disabled = false;
        });
    })
    .catch(err => {
        console.error("No se pudo acceder a la cámara:", err);
        const resultText = document.querySelector('.result-text');
        if (resultText) {
            resultText.textContent = 'Error al acceder a la cámara';
        }
        const btnScan = document.querySelector('.btn-scan');
        if (btnScan) btnScan.disabled = true;
    });
}

function setupEventListeners() {
    // Botón escanear
    const btnScan = document.querySelector('.btn-scan');
    if (btnScan) {
        btnScan.addEventListener('click', scanBill);
    }
    
    // Botón reiniciar
    const btnReset = document.querySelector('.btn-reset');
    if (btnReset) {
        btnReset.addEventListener('click', resetCamera);
    }
}

function scanBill() {
    // Evitar múltiples clics
    if (isProcessing) return;
    
    const video = document.getElementById('video');
    
    // Validar que el video tenga dimensiones
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
        const resultText = document.querySelector('.result-text');
        if (resultText) {
            resultText.textContent = 'Error: Video no está listo';
        }
        return;
    }

    isProcessing = true;
    const btnScan = document.querySelector('.btn-scan');
    if (btnScan) btnScan.disabled = true;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Mejorar calidad de captura
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Obtener la imagen en base64 con buena calidad
    const dataURL = canvas.toDataURL('image/jpeg', 0.92);

    // Actualizar texto mientras procesa
    const resultText = document.querySelector('.result-text');
    if (resultText) {
        resultText.textContent = 'Procesando imagen...';
    }

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
        if (img) {
            // Manejar URL con o sin barra inicial
            const imgUrl = data.img_url.startsWith('/') ? data.img_url : '/' + data.img_url;
            img.src = imgUrl + '?t=' + new Date().getTime();
            img.style.display = 'block';
        }

        // Actualizar el texto del resultado
        if (resultText) {
            resultText.textContent = data.resultado || 'Procesado correctamente';
        }
        
        // Habilitar botón de reinicio
        const btnReset = document.querySelector('.btn-reset');
        if (btnReset) btnReset.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        if (resultText) {
            resultText.textContent = 'Error al procesar la imagen';
        }
        if (btnScan) btnScan.disabled = false;
    })
    .finally(() => {
        isProcessing = false;
    });
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}

function resetCamera() {
    const video = document.getElementById('video');
    const img = document.getElementById('img-resultado');
    const resultText = document.querySelector('.result-text');
    const btnReset = document.querySelector('.btn-reset');
    const btnScan = document.querySelector('.btn-scan');
    
    // Deshabilitar botones mientras reinicia
    if (btnReset) btnReset.disabled = true;
    if (btnScan) btnScan.disabled = true;
    
    // Ocultar imagen y mostrar video
    if (img) img.style.display = 'none';
    if (video) video.style.display = 'block';
    
    // Resetear el texto
    if (resultText) {
        resultText.textContent = 'Identificando...';
    }
    
    // Reiniciar la cámara
    const constraints = {
        video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'environment' // Siempre cámara trasera
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(videoStream => {
        stream = videoStream;
        if (video) {
            video.srcObject = stream;
            
            // Habilitar botones cuando esté listo
            video.addEventListener('loadedmetadata', () => {
                if (btnScan) btnScan.disabled = false;
            }, { once: true });
        }
    })
    .catch(err => {
        console.error("No se pudo acceder a la cámara:", err);
        if (resultText) {
            resultText.textContent = 'Error al reiniciar la cámara';
        }
    });
}

// Limpiar al cerrar la página
window.addEventListener('beforeunload', () => {
    stopCamera();
});