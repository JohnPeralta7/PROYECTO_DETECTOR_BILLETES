// Sistema de traducciones
const translations = {
    es: {
        // Página de inicio
        'home_title': 'Detecta billetes falsos y monedas no locales 💵',
        'home_subtitle': 'Usa la cámara para escanear. Obtén un análisis rápido y sencillo.',
        'btn_scan_bills': 'Escanear billetes',
        'btn_scan_coins': 'Escanear monedas',
        'btn_scan_state': 'Escanear estado',
        'step1_text': 'Toma o sube la foto.',
        'step2_text': 'La app analiza características.',
        'step3_text': 'Recibe el resultado al instante.',
        'phone_header': 'ESCANEAR BILLETES O MONEDAS',
        'result_title': 'RESULTADO',
        'result_status': '✓ Billete auténtico detectado',

        // Página de billetes
        'bills_page_title': '¡Detector de billetes falsos! 💵',
        'bills_instruction': 'Acerca tus billetes a la cámara',
        'btn_scan_bill': 'Escanea tu<br>billete',
        'btn_upload': 'Subir<br>imagen',
        'btn_reset': 'Reiniciar',
        'result_identifying': 'Identificando...',

        // Página de monedas
        'coins_page_title': '¡Detector de monedas no locales! 🪙',
        'coins_instruction': 'Acerca tus monedas a la cámara',
        'btn_scan_coin': 'Escanea tus<br>monedas',

        // Página de estado
        'state_page_title': '¡Detector de estado de billetes! 📊',
        'state_instruction': 'Acerca tus billetes a la cámara',
        'btn_analyze_state': 'Analizar<br>estado',
        'result_analyzing': 'Analizando estado...',

        // Menú lateral
        'menu_title': 'Billete Detector',
        'menu_home': 'Inicio',
        'menu_bills': 'Billetes',
        'menu_coins': 'Monedas',
        'menu_state': 'Estado',

        // Selector de idioma
        'lang_spanish': 'Español',
        'lang_english': 'English',

        // Mensajes de error y alertas de cámara
        'error_camera_access': 'Error al acceder a la cámara',
        'error_video_not_ready': 'Error: Video no está listo',
        'error_processing_image': 'Error al procesar la imagen',
        'error_invalid_image': 'Por favor selecciona una imagen válida',
        'error_reading_file': 'Error al leer el archivo',
        'error_restart_camera': 'Error al reiniciar la cámara',
        'processing_bill': 'Procesando billete...',
        'processing_coin': 'Procesando moneda...',
        'processing_state': 'Analizando estado...',
        'processed_successfully': 'Procesado correctamente',
        'no_camera_access': 'Sin acceso a cámara - Usa "Subir imagen"',
        
        // Mensajes detallados de error de cámara
        'camera_permission_denied_title': '⚠️ PERMISO DE CÁMARA DENEGADO',
        'camera_permission_denied_message': 'Para usar el detector necesitas activar los permisos de cámara:\n\n' +
            '1. Haz clic en el ícono de candado 🔒 en la barra de direcciones\n' +
            '2. Busca "Cámara" y selecciona "Permitir"\n' +
            '3. Recarga la página\n\n' +
            'Alternativamente, puedes usar el botón "Subir imagen" 📤',
        
        'camera_not_found_title': '⚠️ NO SE ENCONTRÓ CÁMARA',
        'camera_not_found_message': 'No se detectó ninguna cámara en tu dispositivo.\n' +
            'Puedes usar el botón "Subir imagen" 📤 para cargar una foto.',
        
        'camera_error_title': '⚠️ ERROR AL ACCEDER A LA CÁMARA',
        'camera_error_message': 'No se pudo acceder a la cámara.\n' +
            'Por favor, verifica los permisos e intenta nuevamente.\n\n' +
            'Puedes usar el botón "Subir imagen" 📤 como alternativa.'
    },
    en: {
        // Home page
        'home_title': 'Detect counterfeit bills and foreign coins 💵',
        'home_subtitle': 'Use the camera to scan. Get a quick and simple analysis.',
        'btn_scan_bills': 'Scan bills',
        'btn_scan_coins': 'Scan coins',
        'btn_scan_state': 'Scan condition',
        'step1_text': 'Take or upload the photo.',
        'step2_text': 'The app analyzes features.',
        'step3_text': 'Get instant results.',
        'phone_header': 'SCAN BILLS OR COINS',
        'result_title': 'RESULT',
        'result_status': '✓ Authentic bill detected',

        // Bills page
        'bills_page_title': 'Counterfeit Bill Detector! 💵',
        'bills_instruction': 'Bring your bills close to the camera',
        'btn_scan_bill': 'Scan your<br>bill',
        'btn_upload': 'Upload<br>image',
        'btn_reset': 'Reset',
        'result_identifying': 'Identifying...',

        // Coins page
        'coins_page_title': 'Foreign Coin Detector! 🪙',
        'coins_instruction': 'Bring your coins close to the camera',
        'btn_scan_coin': 'Scan your<br>coins',

        // State page
        'state_page_title': 'Bill Condition Detector! 📊',
        'state_instruction': 'Bring your bills close to the camera',
        'btn_analyze_state': 'Analyze<br>condition',
        'result_analyzing': 'Analyzing condition...',

        // Sidebar menu
        'menu_title': 'Bill Detector',
        'menu_home': 'Home',
        'menu_bills': 'Bills',
        'menu_coins': 'Coins',
        'menu_state': 'Condition',

        // Language selector
        'lang_spanish': 'Español',
        'lang_english': 'English',

        // Camera error messages and alerts
        'error_camera_access': 'Error accessing camera',
        'error_video_not_ready': 'Error: Video is not ready',
        'error_processing_image': 'Error processing image',
        'error_invalid_image': 'Please select a valid image',
        'error_reading_file': 'Error reading file',
        'error_restart_camera': 'Error restarting camera',
        'processing_bill': 'Processing bill...',
        'processing_coin': 'Processing coin...',
        'processing_state': 'Analyzing condition...',
        'processed_successfully': 'Processed successfully',
        'no_camera_access': 'No camera access - Use "Upload image"'
    }
};

// Obtener idioma guardado o usar español por defecto
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'es';
}

// Guardar idioma seleccionado
function setCurrentLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
}

// Traducir todos los elementos con data-translate
function translatePage() {
    const currentLang = getCurrentLanguage();
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang] && translations[currentLang][key]) {
            const translation = translations[currentLang][key];
            
            // Si el elemento es un botón que contiene un ícono (.btn-icon)
            const parentBtn = element.closest('.btn');
            if (parentBtn && parentBtn.querySelector('.btn-icon')) {
                // Solo actualizar el texto dentro del span data-translate
                element.innerHTML = translation;
            }
            // Para botones con innerHTML que contiene <br>, usar innerHTML
            else if (element.querySelector('br') || translation.includes('<br>')) {
                element.innerHTML = translation;
            } 
            // Para texto simple, usar textContent
            else {
                element.textContent = translation;
            }
        }
    });

    // Actualizar el botón de idioma
    updateLanguageButton();
}

// Actualizar el botón de idioma con la bandera correcta
function updateLanguageButton() {
    const currentLang = getCurrentLanguage();
    const langButton = document.querySelector('.language-button');
    const langText = langButton?.querySelector('.language-text');
    const langFlag = langButton?.querySelector('.language-flag');
    
    if (langButton && langText && langFlag) {
        if (currentLang === 'es') {
            langFlag.textContent = '🇪🇸';
            langText.textContent = 'ES';
        } else {
            langFlag.textContent = '🇬🇧';
            langText.textContent = 'EN';
        }
    }

    // Marcar la opción activa en el dropdown
    const options = document.querySelectorAll('.language-option');
    options.forEach(option => {
        if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Cambiar idioma
function changeLanguage(lang) {
    setCurrentLanguage(lang);
    translatePage();
    closeLanguageDropdown();
}

// Abrir/cerrar dropdown de idiomas
function toggleLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function closeLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(event) {
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector && !languageSelector.contains(event.target)) {
        closeLanguageDropdown();
    }
});

// Inicializar el sistema de idiomas cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    translatePage();
    
    // Event listeners para las opciones de idioma
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Event listener para el botón de idioma
    const languageButton = document.querySelector('.language-button');
    if (languageButton) {
        languageButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLanguageDropdown();
        });
    }
});

// Función auxiliar para obtener una traducción específica
function getTranslation(key) {
    const currentLang = getCurrentLanguage();
    return translations[currentLang]?.[key] || translations['es'][key] || key;
}

// Hacer la función accesible globalmente para camara.js
window.getTranslation = getTranslation;