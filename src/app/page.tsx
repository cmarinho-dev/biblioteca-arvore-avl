import Link from "next/link";
import { livroRepository } from "@/services/repository/livroRepository";
import styles from "./page.module.scss";

export default function Home() {
  const livros = livroRepository.findAll();
  const categorias = new Set(livros.map((livro) => livro.categoria));
  const disponiveis = livros.filter((livro) =>
    livro.disponibilidade.toLowerCase().includes("dispon"),
  );

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Biblioteca digital</p>
          <h1>Encontre o próximo livro com menos atrito.</h1>

          <p>
            Consulte obras, autores, categorias e disponibilidade em uma
            interface mais limpa para explorar o acervo.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/livros">
              Ver livros
            </Link>
            <Link className={styles.secondaryAction} href="/buscaAvancada">
              Busca avançada
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.bookStack}>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className={styles.stats} aria-label="Resumo do acervo">
        <article>
          <strong>{livros.length}</strong>
          <span>livros cadastrados</span>
        </article>

        <article>
          <strong>{categorias.size}</strong>
          <span>categorias no acervo</span>
        </article>

        <article>
          <strong>{disponiveis.length}</strong>
          <span>disponíveis para consulta</span>
        </article>
      </section>

      <section className={styles.cards} aria-label="Atalhos da aplicação">
        <Link className={styles.card} href="/livros">
          <span>01</span>
          <h2>Livros</h2>
          <p>Consulte os títulos disponíveis no acervo.</p>
        </Link>

        <Link className={styles.card} href="/buscaAvancada">
          <span>02</span>
          <h2>Busca Avançada</h2>
          <p>Encontre livros por termo, categoria e disponibilidade.</p>
        </Link>

        <article className={styles.card}>
          <span>03</span>
          <h2>Acervo</h2>
          <p>Visualize informações essenciais de cada obra.</p>
        </article>
      </section>
    </main>
  );
}
