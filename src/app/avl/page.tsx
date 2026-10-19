import Link from "next/link";
import { livroRepository } from "@/services/repository/livroRepository";
import styles from "./page.module.scss";

const casos = [
  {
    codigo: "LL",
    caminho: "Esquerda → Esquerda",
    operacao: "Rotação simples à direita",
    descricao:
      "A nova chave entra na subárvore esquerda do filho esquerdo. O filho esquerdo sobe e o nó desbalanceado desce para a direita.",
    exemplo:
      "Inserções: C, B, A. A rotação à direita deixa B como raiz, com A à esquerda e C à direita.",
  },
  {
    codigo: "RR",
    caminho: "Direita → Direita",
    operacao: "Rotação simples à esquerda",
    descricao:
      "A nova chave entra na subárvore direita do filho direito. O filho direito sobe e o nó desbalanceado desce para a esquerda.",
    exemplo:
      "Inserções: A, B, C. A rotação à esquerda deixa B como raiz, com A à esquerda e C à direita.",
  },
  {
    codigo: "LR",
    caminho: "Esquerda → Direita",
    operacao: "Rotação à esquerda no filho e à direita no nó",
    descricao:
      "A chave entra à direita do filho esquerdo. Primeiro o filho esquerdo gira à esquerda; depois o nó desbalanceado gira à direita.",
    exemplo:
      "Inserções: C, A, B. A rotação dupla deixa B como raiz, com A à esquerda e C à direita.",
  },
  {
    codigo: "RL",
    caminho: "Direita → Esquerda",
    operacao: "Rotação à direita no filho e à esquerda no nó",
    descricao:
      "A chave entra à esquerda do filho direito. Primeiro o filho direito gira à direita; depois o nó desbalanceado gira à esquerda.",
    exemplo:
      "Inserções: A, C, B. A rotação dupla deixa B como raiz, com A à esquerda e C à direita.",
  },
];

export default function DocumentacaoAvl() {
  const totalLivros = livroRepository.findAll().length;

  return (
    <main className={styles.document}>
      <nav className={styles.actions} aria-label="Ações do documento">
        <Link href="/buscaAvancada">Voltar à busca</Link>
        <button type="button" onClick={() => window.print()}>
          Imprimir / salvar PDF
        </button>
      </nav>

      <header className={styles.header}>
        <p className={styles.kicker}>Biblioteca digital · Estrutura de dados</p>
        <h1>Árvore AVL aplicada à busca de livros</h1>
        <p>
          Implementação de inserção balanceada e uso de uma árvore binária de
          busca para localizar títulos do acervo em ordem alfabética.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Aplicação no projeto</h2>
        <p>
          A classe <code>ArvoreAvlLivros</code> normaliza os títulos, removendo
          diferenças entre maiúsculas, minúsculas e acentos. Cada título ocupa
          um nó ordenado; livros com o mesmo título compartilham o nó. A busca
          avançada usa esse índice para apresentar títulos em ordem e localizar
          correspondências pelo nome, mantendo também os filtros por autor,
          ISBN, categoria e disponibilidade.
        </p>
        <p>
          O repositório tem {totalLivros} livros de exemplo. O índice é montado
          a partir do acervo no momento da consulta. Em uma inserção, a AVL
          atualiza alturas e fatores de balanceamento e corrige automaticamente
          os casos LL, RR, LR e RL.
        </p>
        <div className={styles.formula}>
          <strong>Fator de balanceamento</strong>
          <span>
            altura da subárvore esquerda − altura da subárvore direita
          </span>
          <small>Valores válidos em cada nó: −1, 0 ou +1.</small>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Operações de balanceamento</h2>
        <div className={styles.caseGrid}>
          {casos.map((caso) => (
            <article className={styles.caseCard} key={caso.codigo}>
              <div className={styles.caseTitle}>
                <span>{caso.codigo}</span>
                <h3>{caso.caminho}</h3>
              </div>
              <p>
                <strong>Correção:</strong> {caso.operacao}.
              </p>
              <p>{caso.descricao}</p>
              <small>{caso.exemplo}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Como o código opera</h2>
        <ol className={styles.steps}>
          <li>
            Compara o título novo com a chave do nó e insere à esquerda ou à
            direita.
          </li>
          <li>Atualiza a altura dos nós percorridos no retorno da recursão.</li>
          <li>Calcula o fator de balanceamento em cada nó ancestral.</li>
          <li>
            Identifica o caminho da inserção e aplica uma rotação simples ou
            dupla.
          </li>
          <li>
            Retorna a nova raiz da subárvore, mantendo a árvore ordenada e
            balanceada.
          </li>
        </ol>
        <p>
          Inserir e localizar uma chave exata em uma AVL leva O(log n). A busca
          parcial por trecho do título percorre os títulos ordenados, pois
          correspondências por substring não são uma consulta de chave exata.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Onde está no código</h2>
        <ul className={styles.files}>
          <li>
            <code>src/services/algorithms/arvoreAvl.ts</code> — nó, inserção,
            alturas e quatro rotações.
          </li>
          <li>
            <code>src/services/repository/livroRepository.ts</code> — integração
            da AVL ao repositório.
          </li>
          <li>
            <code>src/app/buscaAvancada/page.tsx</code> — aplicação do índice na
            tela de busca.
          </li>
        </ul>
      </section>

      <footer className={styles.footer}>
        Material de apoio: “Inteligência nos Dados”, p. 52–59. Documento
        explicativo da implementação aplicada ao projeto Biblioteca.
      </footer>
    </main>
  );
}
