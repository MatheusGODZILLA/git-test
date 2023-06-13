const fs = require('fs');

const filename = 'biblioteca.txt';
let biblioteca = [];

function cadastrarLivro() {
  console.log('======== Cadastro de Livro =======');
  const titulo = prompt('Digite o título do livro:');
  const autor = prompt('Digite o autor do livro:');
  const data = prompt('Digite a data de publicação do livro (formato: DD/MM/AAAA):');

  const livro = { titulo, autor, data };
  biblioteca.push(livro);

  salvarBiblioteca();

  console.log('Livro cadastrado com sucesso!');
  console.log('================================\n');
}

function listarLivros() {
  if (biblioteca.length === 0) {
    console.log('A biblioteca está vazia.');
    return;
  }

  const ordenacao = prompt('Ordenar por título (T) ou por data de publicação (D)?');

  let livrosOrdenados;
  if (ordenacao.toUpperCase() === 'T') {
    livrosOrdenados = biblioteca.slice().sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (ordenacao.toUpperCase() === 'D') {
    livrosOrdenados = biblioteca.slice().sort((a, b) => new Date(a.data) - new Date(b.data));
  } else {
    console.log('Opção inválida.');
    return;
  }

  console.log('======== Livros na biblioteca =======');
  for (const livro of livrosOrdenados) {
    console.log(`Título: ${livro.titulo}`);
    console.log(`Autor: ${livro.autor}`);
    console.log(`Data de publicação: ${livro.data}`);
    console.log('---');
  }
}

function removerLivro() {
  console.log('======== Remoção de Livro =======');
  const titulo = prompt('Digite o título do livro que deseja remover:');
  const index = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (index === -1) {
    console.log('Livro não encontrado na biblioteca.');
    return;
  }

  biblioteca.splice(index, 1);
  salvarBiblioteca();

  console.log('Livro removido com sucesso!');
  console.log('=================================\n');
}

function alterarDetalhesLivro() {
  console.log('======== Alteração de Detalhes do Livro =======');
  const titulo = prompt('Digite o título do livro que deseja alterar:');
  const index = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (index === -1) {
    console.log('Livro não encontrado na biblioteca.');
    return;
  }

  const livro = biblioteca[index];

  const novoTitulo = prompt('Digite o novo título do livro (ou deixe em branco para manter o título atual):');
  const novoAutor = prompt('Digite o novo autor do livro (ou deixe em branco para manter o autor atual):');
  const novaData = prompt('Digite a nova data de publicação do livro (formato: DD/MM/AAAA) (ou deixe em branco para manter a data atual):');

  if (novoTitulo.trim() !== '') {
    livro.titulo = novoTitulo;
  }

  if (novoAutor.trim() !== '') {
    livro.autor = novoAutor;
  }

  if (novaData.trim() !== '') {
    livro.data = novaData;
  }

  salvarBiblioteca();

  console.log('Detalhes do livro alterados com sucesso!');
  console.log('=========================================\n');
}

function salvarBiblioteca() {
  const conteudo = biblioteca.map(livro => `${livro.titulo};${livro.autor};${livro.data}`).join('\n');
  fs.writeFileSync(filename, conteudo);
}

function carregarBiblioteca() {
  if (fs.existsSync(filename)) {
    const conteudo = fs.readFileSync(filename, 'utf-8');
    const linhas = conteudo.split('\n');

    for (const linha of linhas) {
      const [titulo, autor, data] = linha.split(';');
      biblioteca.push({ titulo, autor, data });
    }
  }
}

function exibirMenu() {
  console.log('======== Gerenciador de livros =======');
  console.log('1. Cadastrar livro');
  console.log('2. Listar livros');
  console.log('3. Remover livro');
  console.log('4. Alterar detalhes do livro');
  console.log('5. Sair');
  console.log('===========================\n');
}

function iniciar() {
  carregarBiblioteca();

  let executando = true;
  while (executando) {
    exibirMenu();
    const opcao = prompt('Digite uma opção:');
    console.log();

    switch (opcao) {
      case '1':
        cadastrarLivro();
        break;
      case '2':
        listarLivros();
        break;
      case '3':
        removerLivro();
        break;
      case '4':
        alterarDetalhesLivro();
        break;
      case '5':
        executando = false;
        break;
      default:
        console.log('Opção inválida.');
        break;
    }

    console.log();
  }
}

iniciar();