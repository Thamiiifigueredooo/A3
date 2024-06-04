window.addEventListener('DOMContentLoaded', function() {
    var table = document.getElementById('doadorTable');
    var tbody = table.getElementsByTagName('tbody')[0];
  
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/doadores');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var doadores = JSON.parse(xhr.responseText);
          populateTable(doadores);
        } else {
          console.error('Ocorreu um erro ao obter os doadores.');
        }
      }
    };
    xhr.send();
  
    function populateTable(doadores) {
      for (var i = 0; i < doadores.length; i++) {
        var doador = doadores[i];
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + doador.nome + '</td>' +
                        '<td>' + doador.cpf + '</td>' +
                        '<td>' + doador.endereco + '</td>' +
                        '<td>' + doador.valorDoado + '</td>';
        tbody.appendChild(row);
      }
    }
  });