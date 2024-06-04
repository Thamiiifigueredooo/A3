import * as qrcode from "../easyqrcodejs-4.6.1/package/src/easy.qrcode";

function onlyNumberKey(evt) {
    // Garante que apenas números sejam digitados nos campos de CPF e Valor da doação
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function formatarMoeda(element) {
    var valor = element.value.replace(/\D/g, '');
    valor = (valor/100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    element.value = 'R$ ' + valor;

    // Atualiza o QR Code quando o valor da doação é alterado
    atualizarQRCode();
}

function validarNome() {
    var nome = document.getElementById("name").value;
    if (/\d/.test(nome)) {
        document.getElementById("nameError").innerText = "Por favor, insira apenas letras no nome.";
    } else {
        document.getElementById("nameError").innerText = "";
    }
}

function validarCPF() {
    var cpf = document.getElementById("cpf").value;
    if (cpf.length !== 11) {
        document.getElementById("cpfError").innerText = "Por favor, insira um CPF válido.";
        return false;
    } else {
        document.getElementById("cpfError").innerText = "";
    }

    if (!/^\d+$/.test(cpf)) {
        document.getElementById("cpfError").innerText = "Por favor, insira apenas números no CPF.";
        return false;
    } else {
        document.getElementById("cpfError").innerText = "";
    }

    return true;
}

function atualizarQRCode() {
  var valorDoado = document.getElementById("donation").value.replace(/\D/g, '');
  var qrCodeTexto = "https://sua-pagina-de-pagamento.com/?valor=" + valorDoado;
  var qrCode = qrcode(0, 'H');
  qrCode.addData(qrCodeTexto);
  qrCode.make();
  document.getElementById("qrcodeImage").src = qrCode.createDataURL();
  document.getElementById("paymentLink").href = qrCodeTexto;
  document.getElementById("qrcodeImage").style.display = "block";
}

function validarFormulario() {
    if (!validarCPF()) {
        return false;
    }

    if (!validarNome()) {
        return false;
    }

    return true;
}

// Atualiza o QR Code quando a página é carregada
window.onload = atualizarQRCode;