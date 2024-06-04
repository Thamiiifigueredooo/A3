document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var name = document.getElementById("name").value;
    var cpf = document.getElementById("cpf").value;
    var address = document.getElementById("address").value;
    var donation = document.getElementById("donation").value;
  
    var data = {
      nome: name,
      cpf: cpf,
      endereco: address,
      valorDoado: donation
    };
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/doadores");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 201) {
          alert("Doação enviada com sucesso!");
          document.getElementById("myForm").reset();
        } else {
          alert("Ocorreu um erro ao enviar o formulário.");
        }
      }
    };
    xhr.send(JSON.stringify(data));
  });