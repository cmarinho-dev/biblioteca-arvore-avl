import type { Livro } from "../model/livro";

type NoAvl = {
  chave: string;
  livros: Livro[];
  altura: number;
  esquerda: NoAvl | null;
  direita: NoAvl | null;
};

function normalizar(valor: string) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function altura(no: NoAvl | null) {
  return no?.altura ?? 0;
}

function atualizarAltura(no: NoAvl) {
  no.altura = 1 + Math.max(altura(no.esquerda), altura(no.direita));
}

function fatorBalanceamento(no: NoAvl) {
  return altura(no.esquerda) - altura(no.direita);
}

function rotacionarDireita(pivo: NoAvl): NoAvl {
  const novaRaiz = pivo.esquerda;
  if (!novaRaiz) return pivo;

  pivo.esquerda = novaRaiz.direita;
  novaRaiz.direita = pivo;
  atualizarAltura(pivo);
  atualizarAltura(novaRaiz);
  return novaRaiz;
}

function rotacionarEsquerda(pivo: NoAvl): NoAvl {
  const novaRaiz = pivo.direita;
  if (!novaRaiz) return pivo;

  pivo.direita = novaRaiz.esquerda;
  novaRaiz.esquerda = pivo;
  atualizarAltura(pivo);
  atualizarAltura(novaRaiz);
  return novaRaiz;
}

function inserir(no: NoAvl | null, livro: Livro): NoAvl {
  const chave = normalizar(livro.nome);
  if (!no) {
    return { chave, livros: [livro], altura: 1, esquerda: null, direita: null };
  }

  if (chave < no.chave) {
    no.esquerda = inserir(no.esquerda, livro);
  } else if (chave > no.chave) {
    no.direita = inserir(no.direita, livro);
  } else {
    no.livros.push(livro);
    return no;
  }

  atualizarAltura(no);
  const balanceamento = fatorBalanceamento(no);

  if (balanceamento > 1 && chave < (no.esquerda?.chave ?? "")) {
    return rotacionarDireita(no);
  }
  if (balanceamento < -1 && chave > (no.direita?.chave ?? "")) {
    return rotacionarEsquerda(no);
  }
  if (balanceamento > 1 && chave > (no.esquerda?.chave ?? "")) {
    no.esquerda = rotacionarEsquerda(no.esquerda as NoAvl);
    return rotacionarDireita(no);
  }
  if (balanceamento < -1 && chave < (no.direita?.chave ?? "")) {
    no.direita = rotacionarDireita(no.direita as NoAvl);
    return rotacionarEsquerda(no);
  }

  return no;
}

function percorrerEmOrdem(no: NoAvl | null, resultado: Livro[]) {
  if (!no) return;
  percorrerEmOrdem(no.esquerda, resultado);
  resultado.push(...no.livros);
  percorrerEmOrdem(no.direita, resultado);
}

export class ArvoreAvlLivros {
  private raiz: NoAvl | null = null;

  constructor(livros: Livro[] = []) {
    for (const livro of livros) this.inserir(livro);
  }

  inserir(livro: Livro) {
    this.raiz = inserir(this.raiz, livro);
  }

  buscarPorNome(termo: string) {
    const prefixo = normalizar(termo.trim());
    const ordenados: Livro[] = [];
    percorrerEmOrdem(this.raiz, ordenados);
    return prefixo
      ? ordenados.filter((livro) => normalizar(livro.nome).includes(prefixo))
      : ordenados;
  }
}
