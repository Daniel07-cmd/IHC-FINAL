// ... (Toda tu lógica anterior de products.js se queda igual) ...

// === NUEVA LÓGICA: GENERACIÓN DE BOLETA DE VENTA EN CHECKOUT ===
const checkoutForm = document.getElementById('checkoutForm');

if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que recargue la página inmediatamente

        // 1. Obtener valores de los inputs
        const nombre = document.getElementById('clientName').value;
        const email = document.getElementById('clientEmail').value;
        const direccion = document.getElementById('clientAddress').value;
        const ciudad = document.getElementById('clientCity').value;
        const telefono = document.getElementById('clientPhone').value;
        const metodoPago = document.getElementById('paymentMethod').options[document.getElementById('paymentMethod').selectedIndex].text;

        // 2. Obtener valores monetarios (del resumen en pantalla)
        // Usamos textContent porque estos valores pueden haber cambiado por tu lógica de carrito
        const subtotalTxt = document.getElementById('displaySubtotal') ? document.getElementById('displaySubtotal').textContent : "S/ 0.00";
        const envioTxt = document.getElementById('displayShipping') ? document.getElementById('displayShipping').textContent : "S/ 0.00";
        const totalTxt = document.getElementById('displayTotal') ? document.getElementById('displayTotal').textContent : "S/ 0.00";

        // 3. Generar PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // --- DISEÑO DEL PDF ---
        
        // Cabecera
        doc.setFontSize(20);
        doc.text("COMPROBANTE DE PAGO", 105, 20, null, null, "center");
        doc.setFontSize(10);
        doc.text("FUENTE DE LA VIDA - Libreria", 105, 26, null, null, "center");
        doc.text(`Fecha: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`, 105, 32, null, null, "center");

        // Línea divisoria
        doc.setLineWidth(0.5);
        doc.line(20, 38, 190, 38);

        // Datos del Cliente (Recuadro)
        doc.setFillColor(245, 245, 245);
        doc.rect(20, 45, 170, 45, 'F');
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text("INFORMACIÓN DE ENVÍO", 25, 55);
        
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.text(`Cliente: ${nombre}`, 25, 65);
        doc.text(`Email: ${email}`, 25, 71);
        doc.text(`Teléfono: ${telefono}`, 25, 77);
        doc.text(`Dirección: ${direccion} - ${ciudad}`, 25, 83);

        // Tabla de Detalle (Simulada con los totales)
        doc.autoTable({
            startY: 100,
            head: [['Descripción', 'Monto']],
            body: [
                ['Subtotal Productos', subtotalTxt],
                ['Costo de Envío', envioTxt],
                ['Método de Pago', metodoPago]
            ],
            theme: 'grid',
            headStyles: { fillColor: [44, 62, 80] },
            columnStyles: {
                0: { cellWidth: 120 },
                1: { halign: 'right', fontStyle: 'bold' }
            }
        });

        // Total Grande
        const finalY = doc.lastAutoTable.finalY;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`TOTAL PAGADO: ${totalTxt}`, 190, finalY + 15, null, null, "right");

        // Mensaje final
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100);
        doc.text("Gracias por su compra. Su pedido ha sido confirmado.", 105, finalY + 30, null, null, "center");

        // 4. Descargar PDF
        doc.save(`Pedido_${nombre.split(' ')[0]}_${Date.now()}.pdf`);

        // 5. Redirección (Simulada con un pequeño retraso para asegurar la descarga)
        setTimeout(() => {
            alert("¡Pago exitoso! Se ha descargado tu comprobante.");
            window.location.href = 'confirmation.html';
        }, 1500);
    });
}
