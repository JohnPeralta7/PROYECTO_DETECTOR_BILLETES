// Url.js - manejador de redirecciones de botones

document.addEventListener('DOMContentLoaded', function() {
    // Redirigir a la página de billetes
    const scanBillBtn = document.getElementById('scanBillBtn');
    if (scanBillBtn) {
        scanBillBtn.addEventListener('click', function() {
            const url = scanBillBtn.getAttribute('data-url') || 'billetes.html';
            window.location.href = url;
        });
    }

    // Redirigir a la página de monedas
    const scanCoinBtn = document.getElementById('scanCoinBtn');

// Fallback: forzar ocultado de .phone-container en móviles (si el CSS no se aplica por cache o prioridad)
(function enforceHidePhoneOnMobile(){
    function applyRule() {
        const phone = document.querySelector('.phone-container');
        if (!phone) return;
        const mq = window.matchMedia('(max-width: 767px)');
        const setHidden = (hide) => {
            if (hide) {
                // usar inline style con important para asegurarnos
                phone.style.setProperty('display', 'none', 'important');
                phone.style.setProperty('visibility', 'hidden', 'important');
                phone.style.setProperty('height', '0', 'important');
                phone.style.setProperty('overflow', 'hidden', 'important');
            } else {
                phone.style.removeProperty('display');
                phone.style.removeProperty('visibility');
                phone.style.removeProperty('height');
                phone.style.removeProperty('overflow');
            }
        };

        // aplicar inmediatamente
        setHidden(mq.matches);

        // escuchar cambios de tamaño (soporta addEventListener en modernos y addListener en antiguos)
        if (typeof mq.addEventListener === 'function') {
            mq.addEventListener('change', (e) => setHidden(e.matches));
        } else if (typeof mq.addListener === 'function') {
            mq.addListener((e) => setHidden(e.matches));
        }
    }

    // Ejecutar cuando DOM ya está cargado (si no lo estaba)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyRule);
    } else {
        applyRule();
    }
})();
    if (scanCoinBtn) {
        scanCoinBtn.addEventListener('click', function() {
            const url = scanCoinBtn.getAttribute('data-url') || 'monedas.html';
            window.location.href = url;
        });
    }

    // Redirigir a la página de estado
    const scanStateBtn = document.getElementById('scanStateBtn');
    if (scanStateBtn) {
        scanStateBtn.addEventListener('click', function() {
            const url = scanStateBtn.getAttribute('data-url') || 'estado/';
            window.location.href = url;
        });
    }

    
});










