function dragStart(event) {
	event.dataTransfer.setData("task", event.target.id);
}

function allowDrop(event) {
	event.preventDefault();
}

function drop(event) {
	event.preventDefault();
	const data = event.dataTransfer.getData("task");

	if (event.target.className == "area" && event.target.childElementCount < 5) {
		event.target.appendChild(document.getElementById(data));
	}
	if (event.target.id == "lixeira") {
		const taskAtual = document.getElementById(data);
		taskAtual.parentNode.removeChild(taskAtual);
	}
}

function submitAddTask() {
	const objAdd = {
		titulo: document.getElementById("tituloTarefa").value,
		descricao: document.getElementById("descricao").value,
		prioridade: document.getElementById("prioridade").value,
		status: document.getElementById("status").value
	};
	criarBoxTask(objAdd);
}

function validarTamanhoStatus(status) {
	let valido = true;
	const el = document.querySelector("#area_" + status);

	if (el.childElementCount == 5) {
		document.getElementById("obrigatorios").style.display = '';
		document.getElementById("obrigatorios").innerHTML = 'Esse status está cheio!';
		valido = false;
	}
	return valido;
}

function validarCamposObrigatorios(objAdd) {
	let valido = true;

	if (!objAdd.titulo || !objAdd.descricao) {
		document.getElementById("obrigatorios").style.display = '';
		document.getElementById("obrigatorios").innerHTML = 'Preencha todos os campos!';
		valido = false;
	}
	return valido;
}


function criarBoxTask(objAdd) {
	if (!validarCamposObrigatorios(objAdd))
		return;

	if (!validarTamanhoStatus(objAdd.status))
		return;

	const box = document.createElement("div");
	const areaAtual = document.getElementById("area_" + objAdd.status);

	box.className = "box box-" + objAdd.prioridade;
	box.draggable = true;
	box.id = Math.random();

	criarTituloBoxTask(box, objAdd.titulo);
	criarDescricaoBoxTask(box, objAdd.descricao);
	areaAtual.appendChild(box);

	voltar();
}

function criarTituloBoxTask(box, titulo) {
	const texto = document.createElement("span");

	texto.className = "titulo-box";
	texto.innerHTML = "Tarefa: " + titulo + "<br>";

	box.appendChild(texto);
}

function criarDescricaoBoxTask(box, descricao) {
	const texto = document.createElement("span");

	texto.className = "descricao-box";
	texto.innerHTML = "Descrição: " + descricao;

	box.appendChild(texto);
}

function addTask() {
	document.getElementById("descricao").value = '';
	document.getElementById("tituloTarefa").value = '';
	document.getElementById("obrigatorios").style.display = 'none';
	document.getElementById("cambao").style.display = 'none';
	document.getElementById("botoes-iniciais").style.display = 'none';
	document.getElementById("botao-voltar").style.display = '';
	document.getElementById("add-task").style.display = '';
}

function voltar() {
	document.getElementById("botao-voltar").style.display = 'none';
	document.getElementById("add-task").style.display = 'none';
	document.getElementById("cambao").style.display = '';
	document.getElementById("botoes-iniciais").style.display = '';
}