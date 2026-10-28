/**
 * main.js - Lógica interactiva para la web de José Ignacio Pino D.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------
    // 1. Inicialización de EmailJS con tus credenciales
    // -------------------------------------------------------------
    const EMAILJS_PUBLIC_KEY = "mBUxp58ezVo3wj1El";
    const EMAILJS_SERVICE_ID = "service_h3na3kl";
    const EMAILJS_TEMPLATE_ID = "template_aka2ehi";

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error("EmailJS SDK no ha sido cargado en el documento HTML.");
    }

    // -------------------------------------------------------------
    // 2. Control del Menú Desplegable Móvil
    // -------------------------------------------------------------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Cerrar menú al hacer clic en cualquier enlace
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // -------------------------------------------------------------
    // 3. Envío del Formulario de Contacto vía EmailJS
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!submitBtn || !formStatus) return;

            // Deshabilitar botón durante el proceso
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Enviando...</span> <i class="fa-solid fa-circle-notch fa-spin text-xs"></i>`;

            // Enviar formulario utilizando las variables correctas
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
                .then(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Solicitar Cita / Enviar Consulta</span> <i class="fa-solid fa-paper-plane text-xs"></i>`;
                    
                    formStatus.className = "text-center p-4 mt-4 rounded-lg text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                    formStatus.innerText = "¡Mensaje enviado con éxito! Nos pondremos en contacto a la brevedad.";
                    formStatus.classList.remove('hidden');
                    
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("Error EmailJS:", error);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Solicitar Cita / Enviar Consulta</span> <i class="fa-solid fa-paper-plane text-xs"></i>`;
                    
                    formStatus.className = "text-center p-4 mt-4 rounded-lg text-sm bg-red-500/10 text-red-400 border border-red-500/20";
                    formStatus.innerText = "Hubo un problema al enviar el mensaje. Inténtalo nuevamente o escríbenos a WhatsApp.";
                    formStatus.classList.remove('hidden');
                });
        });
    }

});

// -------------------------------------------------------------
// 4. Modales Informativos de Áreas de Práctica (Globales)
// -------------------------------------------------------------
const modalData = {
    familia: {
        title: 'Derecho de Familia',
        body: 'Comprende la atención personalizada en materias de divorcio, pensiones de alimentos, cumplimiento y cobro de deudas alimenticias, relación directa y regular (visitas), cuidado personal de NNA y otras controversias familiares. Acompañamiento en el análisis de antecedentes, preparación de escritos y seguimiento procesal.'
    },
    civil: {
        title: 'Derecho Civil & Patrimonial',
        body: 'Estudio, redacción y revisión de escrituras públicas/privadas y contratos. Materias de obligaciones, responsabilidad civil, derecho de propiedad, interposición de acciones judiciales y recursos de protección destinados al resguardo efectivo de su patrimonio.'
    },
    penal: {
        title: 'Derecho Penal',
        body: 'Defensa y representación jurídica en asuntos penales (delitos contra la propiedad y las personas). Representación de imputados, víctimas y querellantes desde las primeras diligencias de investigación hasta la sentencia definitiva.'
    }
};

function openModal(key) {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (modal && modalTitle && modalBody && modalData[key]) {
        modalTitle.textContent = modalData[key].title;
        modalBody.textContent = modalData[key].body;
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}