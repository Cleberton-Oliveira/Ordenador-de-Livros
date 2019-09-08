document.querySelector("#adiconar_dados").addEventListener("click", adicionar_livros);
var titulo = document.querySelector("input[name='titulo']");
var autor = document.querySelector("input[name='autor']");
var ano = document.querySelector("input[name='ano']");

function dados_livro(titulo, autor, ano){
	this.cria_linha_tabela = function () {
		var tempalte = document.querySelector("#nova_linha");
		linha_td = tempalte.content.querySelectorAll("td");
		linha_td[0].textContent = titulo;
		linha_td[1].textContent = autor;
		linha_td[2].textContent = ano;
		document.querySelector("tbody").appendChild(document.importNode(tempalte.content, true));
	}
};

function adicionar_livros(event){
	event.preventDefault();
	livros =  new dados_livro(titulo.value, autor.value, ano.value);
	livros.cria_linha_tabela();
};

function ordenar(valor) {
	linha_tr = document.querySelectorAll('tbody tr')
	var values = [].slice.call(linha_tr).map(function(el) {
	return '<tr>' + el.innerHTML + '</tr>';  
	});
	values = values.sort();
	if(document.getElementById('decrecente').checked){
	values = values.reverse();
	}
	document.querySelector('tbody').innerHTML = values.join('');
};