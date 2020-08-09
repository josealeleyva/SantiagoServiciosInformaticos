var checkbox = document.getElementById('seleccionarFormaRegistro');
checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        document.getElementById('seccionFormularioCompleto').style.display='none'
        document.getElementById('seccionFormularioConPresupuesto').style.display='block'
    }else {
        document.getElementById('seccionFormularioCompleto').style.display='block'
        document.getElementById('seccionFormularioConPresupuesto').style.display='none'
    }
})