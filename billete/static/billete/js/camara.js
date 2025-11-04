let stream = null;
let isProcessing = false;

// Esperar a que las traducciones estén disponibles
function waitForTranslations() {
    return new Promise((resolve) => {
        if (window.getTranslation) {
            resolve();
        } else {
            const checkInterval = setInterval(() => {
                if (window.getTranslation) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50);
        }
    });
}

// Detectar el tipo de detector según la URL actual
function getDetectorType() {
    const path = window.location.pathname;
    if (path.includes('/billetes/')) {
        return 'billetes';
    } else if (path.includes('/monedas/')) {
        return 'monedas';
    } else if (path.includes('/estado/')) {
        return 'estado';
    }
    return 'billetes'; // default
}

// Obtener el endpoint correcto según el tipo de detector
function getProcessEndpoint() {
    const type = getDetectorType();
    const endpoints = {
        'billetes': '/procesar-imagen/',
        'monedas': '/procesar-moneda/',
        'estado': '/procesar-estado/'
    };
    return endpoints[type];
}

// Obtener el mensaje de procesamiento según el tipo
function getProcessingMessage() {
    const type = getDetectorType();
    const messageKeys = {
        'billetes': 'processing_bill',
        'monedas': 'processing_coin',
        'estado': 'processing_state'
    };
    return window.getTranslation ? window.getTranslation(messageKeys[type]) : 'Procesando...';
}

// Obtener el mensaje de identificación según el tipo
function getIdentifyingMessage() {
    const type = getDetectorType();
    if (type === 'estado') {
        return window.getTranslation ? window.getTranslation('result_analyzing') : 'Analizando estado...';
    }
    return window.getTranslation ? window.getTranslation('result_identifying') : 'Identificando...';
}

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

        // Mensaje donde saldra si no tiene permiso a la camara
        let mensaje = '';
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            const title = window.getTranslation ? window.getTranslation('camera_permission_denied_title') : '⚠️ PERMISO DE CÁMARA DENEGADO';
            const message = window.getTranslation ? window.getTranslation('camera_permission_denied_message') : 
                'Para usar el detector necesitas activar los permisos de cámara:\n\n' +
                '1. Haz clic en el ícono de candado 🔒 en la barra de direcciones\n' +
                '2. Busca "Cámara" y selecciona "Permitir"\n' +
                '3. Recarga la página\n\n' +
                'Alternativamente, puedes usar el botón "Subir imagen" 📤';
            mensaje = title + '\n\n' + message;
        } 
        // si el dispositivo no tiene camara
        else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            const title = window.getTranslation ? window.getTranslation('camera_not_found_title') : '⚠️ NO SE ENCONTRÓ CÁMARA';
            const message = window.getTranslation ? window.getTranslation('camera_not_found_message') :
                'No se detectó ninguna cámara en tu dispositivo.\n' +
                'Puedes usar el botón "Subir imagen" 📤 para cargar una foto.';
            mensaje = title + '\n\n' + message;
        }
        // si hay error para acceder a la camara
        else {
            const title = window.getTranslation ? window.getTranslation('camera_error_title') : '⚠️ ERROR AL ACCEDER A LA CÁMARA';
            const message = window.getTranslation ? window.getTranslation('camera_error_message') :
                'No se pudo acceder a la cámara.\n' +
                'Por favor, verifica los permisos e intenta nuevamente.\n\n' +
                'Puedes usar el botón "Subir imagen" 📤 como alternativa.';
            mensaje = title + '\n\n' + message;
        }
        
        alert(mensaje);
        
        const resultText = document.querySelector('.result-text');
        if (resultText) {
            resultText.textContent = window.getTranslation ? 
                window.getTranslation('no_camera_access') : 
                'Sin acceso a cámara - Usa "Subir imagen"';
        }
        
        const btnScan = document.querySelector('.btn-scan');
        if (btnScan) {
            btnScan.disabled = true;
            btnScan.style.opacity = '0.5';
        }
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

    // Botón subir imagen
    const btnUpload = document.querySelector('.btn-upload');
    if (btnUpload) {
        btnUpload.addEventListener('click', function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('file-input');
            if (fileInput) {
                fileInput.click();
            } else {
                console.error('No se encontró el input file');
            }
        });
    }

    // Input file
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
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
            resultText.textContent = window.getTranslation ? 
                window.getTranslation('error_video_not_ready') : 
                'Error: Video no está listo';
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
        resultText.textContent = getProcessingMessage();
    }

    // Obtener el token CSRF
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value || '';

    // Obtener el endpoint correcto según la página
    const endpoint = getProcessEndpoint();

    // Enviar la imagen al backend
    fetch(endpoint, {
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
            const imgUrl = data.img_url.startsWith('/') ? data.img_url : '/' + data.img_url;
            img.src = imgUrl + '?t=' + new Date().getTime();
            img.style.display = 'block';
        }

        // Actualizar el texto del resultado
        if (resultText) {
            resultText.textContent = data.resultado || (window.getTranslation ? 
                window.getTranslation('processed_successfully') : 
                'Procesado correctamente');
        }
        
        // Habilitar botón de reinicio
        const btnReset = document.querySelector('.btn-reset');
        if (btnReset) btnReset.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        if (resultText) {
            resultText.textContent = window.getTranslation ? 
                window.getTranslation('error_processing_image') : 
                'Error al procesar la imagen';
        }
        if (btnScan) btnScan.disabled = false;
    })
    .finally(() => {
        isProcessing = false;
    });
}

function handleFileUpload(event) {
    if (isProcessing) return;
    
    const file = event.target.files[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
        const resultText = document.querySelector('.result-text');
        if (resultText) {
            resultText.textContent = window.getTranslation ? 
                window.getTranslation('error_invalid_image') : 
                'Por favor selecciona una imagen válida';
        }
        return;
    }

    isProcessing = true;
    const btnUpload = document.querySelector('.btn-upload');
    if (btnUpload) btnUpload.disabled = true;

    const resultText = document.querySelector('.result-text');
    if (resultText) {
        resultText.textContent = getProcessingMessage();
    }

    // Leer el archivo y convertir a base64
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const dataURL = e.target.result;

        // Obtener el token CSRF
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value || '';

        // Obtener el endpoint correcto según la página
        const endpoint = getProcessEndpoint();

        // Enviar la imagen al backend
        fetch(endpoint, {
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
            const video = document.getElementById('video');
            
            // Ocultar el video
            if (video) video.style.display = 'none';
            
            // Detener la cámara si está activa
            stopCamera();

            // Mostrar la imagen procesada
            const img = document.getElementById('img-resultado');
            if (img) {
                const imgUrl = data.img_url.startsWith('/') ? data.img_url : '/' + data.img_url;
                img.src = imgUrl + '?t=' + new Date().getTime();
                img.style.display = 'block';
            }

            // Actualizar el texto del resultado
            if (resultText) {
                resultText.textContent = data.resultado || (window.getTranslation ? 
                    window.getTranslation('processed_successfully') : 
                    'Procesado correctamente');
            }
            
            // Habilitar botón de reinicio
            const btnReset = document.querySelector('.btn-reset');
            if (btnReset) btnReset.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            if (resultText) {
                resultText.textContent = window.getTranslation ? 
                    window.getTranslation('error_processing_image') : 
                    'Error al procesar la imagen';
            }
            if (btnUpload) btnUpload.disabled = false;
        })
        .finally(() => {
            isProcessing = false;
        });
    };

    reader.onerror = () => {
        if (resultText) {
            resultText.textContent = window.getTranslation ? 
                window.getTranslation('error_reading_file') : 
                'Error al leer el archivo';
        }
        if (btnUpload) btnUpload.disabled = false;
        isProcessing = false;
    };

    reader.readAsDataURL(file);
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
    const btnUpload = document.querySelector('.btn-upload');
    const fileInput = document.getElementById('file-input');
    
    // Deshabilitar botones mientras reinicia
    if (btnReset) btnReset.disabled = true;
    if (btnScan) btnScan.disabled = true;
    if (btnUpload) btnUpload.disabled = true;
    
    // Limpiar input file
    if (fileInput) fileInput.value = '';
    
    // Ocultar imagen y mostrar video
    if (img) img.style.display = 'none';
    if (video) video.style.display = 'block';
    
    // Resetear el texto según el tipo de detector
    if (resultText) {
        resultText.textContent = getIdentifyingMessage();
    }
    
    // Reiniciar la cámara
    const constraints = {
        video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'environment'
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
                if (btnUpload) btnUpload.disabled = false;
            }, { once: true });
        }
    })
    .catch(err => {
        console.error("No se pudo acceder a la cámara:", err);
        if (resultText) {
            resultText.textContent = window.getTranslation ? 
                window.getTranslation('error_restart_camera') : 
                'Error al reiniciar la cámara';
        }
    });
}

// Limpiar al cerrar la página
window.addEventListener('beforeunload', () => {
    stopCamera();
});