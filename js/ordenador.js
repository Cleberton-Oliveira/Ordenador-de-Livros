document.querySelector("#adiconar_dados").addEventListener("click", adicionar_livros);
var titulo = document.querySelector("input[name='titulo']");
var autor = document.querySelector("input[name='autor']");
var ano = document.querySelector("input[name='ano']");
var ultima_coluna = -1;

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

function ordena(coluna, tipo){
	var coluna_selecionada = parseInt(coluna);
	var tabela = document.getElementById("tabela");
	var tbody = tabela.getElementsByTagName("tbody")[0];
	var rows = tbody.getElementsByTagName("tr");
	var linhas = new Array();
	for(var i=0, len=rows.length; i<len; i++) {
		linhas[i] = new Object;
		linhas[i].oldIndex = i;
		var celltext = rows[i].getElementsByTagName("td")[coluna_selecionada].innerHTML.replace(/<[^>]*>/g,"");
		var re = tipo.toUpperCase() == "N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
		linhas[i].value = celltext.replace(re,"").substr(0,25).toLowerCase();
		}
	if (coluna_selecionada == ultima_coluna) { linhas.reverse(); }
	else {
		ultima_coluna = coluna_selecionada;
		switch(tipo.toUpperCase()) {
			case "N" : linhas.sort(ComparaNumero); break;
			default  : linhas.sort(ComparaTexto);
			}
		}
	var newTableBody = document.createElement("tbody");
	for(var i=0, len=linhas.length; i<len; i++) {
		newTableBody.appendChild(rows[linhas[i].oldIndex].cloneNode(true));
		}
	tabela.replaceChild(newTableBody,tbody);
} 

function ComparaTexto(a,b) {
	var aval = a.value;
	var bval = b.value;
	return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} 

function ComparaNumero(a,b) {
	var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
	var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
	return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} 











