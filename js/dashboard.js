document.addEventListener('DOMContentLoaded', () => {
    // 1. REFERENCIAS AL DOM
    const invoiceForm = document.getElementById('invoiceForm');
    const boletaRadio = document.getElementById('boleta');
    const facturaRadio = document.getElementById('factura');
    const rucGroup = document.getElementById('rucGroup');
    const docLabel = document.getElementById('docLabel');
    const docNumberInput = document.getElementById('docNumber');
    const companyNameInput = document.getElementById('companyName');
    const btnBuscar = document.getElementById('btnBuscar');

    // 2. LÓGICA DE INTERFAZ (UI) - BOLETA VS FACTURA
    function toggleDocType() {
        if (facturaRadio.checked) {
            // Modo Factura
            rucGroup.classList.remove('d-none');
            docLabel.textContent = "Número de RUC";
            docNumberInput.placeholder = "Ingrese RUC (11 dígitos)";
            companyNameInput.value = "MI EMPRESA S.A.C."; // Simulación de búsqueda
        } else {
            // Modo Boleta
            rucGroup.classList.add('d-none');
            docLabel.textContent = "Número de Documento (DNI)";
            docNumberInput.placeholder = "Ingrese DNI (8 dígitos)";
            companyNameInput.value = "";
        }
    }

    // Escuchar cambios en los radio buttons
    boletaRadio.addEventListener('change', toggleDocType);
    facturaRadio.addEventListener('change', toggleDocType);

    // Simular botón de búsqueda (opcional para el prototipo)
    if(btnBuscar){
        btnBuscar.addEventListener('click', () => {
            if(facturaRadio.checked) {
                companyNameInput.value = "EMPRESA EJEMPLO S.A.C.";
            } else {
                alert("Cliente encontrado: Juan Pérez (Simulado)");
            }
        });
    }

    // 3. LÓGICA DE GENERACIÓN DE PDF
    if (invoiceForm) {
        invoiceForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Validar campos básicos
            if(!docNumberInput.value) {
                alert("Por favor ingrese el número de documento.");
                return;
            }

            // Datos para el PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Determinar tipo de documento
            const esFactura = facturaRadio.checked;
            const tipoDocTexto = esFactura ? "FACTURA ELECTRÓNICA" : "BOLETA DE VENTA";
            const serie = esFactura ? "F001-0000123" : "B001-0000456";
            
            // --- DISEÑO DEL PDF ---

            // Cabecera
            doc.setFontSize(18);
            doc.text("FUENTE DE LA VIDA", 105, 20, null, null, "center");
            
            doc.setFontSize(10);
            doc.text("Dirección: Av. Universitaria 123, Lima", 105, 26, null, null, "center");
            doc.text("RUC: 20123456789", 105, 30, null, null, "center");

            // Cuadro del Tipo de Comprobante
            doc.setDrawColor(0);
            doc.setFillColor(240, 240, 240);
            doc.rect(140, 40, 60, 20, 'F');
            doc.setFontSize(12);
            doc.text(tipoDocTexto, 170, 48, null, null, "center");
            doc.text(serie, 170, 55, null, null, "center");

            // Datos del Cliente
            doc.setFontSize(10);
            doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 14, 50);
            
            if (esFactura) {
                doc.text(`Cliente (Razón Social): ${companyNameInput.value || 'No especificado'}`, 14, 58);
                doc.text(`RUC Cliente: ${docNumberInput.value}`, 14, 64);
            } else {
                doc.text(`Cliente (DNI): ${docNumberInput.value}`, 14, 58);
                doc.text(`Nombre: CLIENTE GENÉRICO`, 14, 64);
            }

            // Generar Tabla de Productos usando autoTable
            // Esto "raspa" los datos directamente de tu tabla HTML
            doc.autoTable({
                html: '#productsTable',
                startY: 75,
                theme: 'grid',
                headStyles: { fillColor: [66, 66, 66] }, // Color gris oscuro para cabecera
                styles: { halign: 'center' },
                columnStyles: {
                    0: { halign: 'left' }, // Alinear nombre de producto a la izquierda
                    2: { halign: 'right' } // Alinear precios a la derecha
                }
            });

            // Obtener posición final de la tabla para poner el total
            const finalY = doc.lastAutoTable.finalY;
            
            // Total
            const totalTexto = document.getElementById('totalAmount').textContent;
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text(`TOTAL A PAGAR: ${totalTexto}`, 195, finalY + 10, null, null, "right");

            // Pie de página
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text("Gracias por su compra. Representación impresa del comprobante electrónico.", 105, 280, null, null, "center");

            // Descargar el PDF
            doc.save(`Comprobante_${serie}.pdf`);
        });
    }
});
