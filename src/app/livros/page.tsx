import Link from "next/link";
import LivroCard from "@/components/LivroCard/LivroCard";
import { livroRepository } from "@/services/repository/livroRepository";
import styles from "./page.module.scss";

export default function Livros() {
  const livros = livroRepository.findAll();
  const categorias = Array.from(
    new Set(livros.map((livro) => livro.categoria)),
  );
  const disponiveis = livros.filter((livro) =>
    livro.disponibilidade.toLowerCase().includes("dispon"),
  ).length;

  return (
    <main className={styles.livrosPage}>
      <section className={styles.pageHeader}>
        <div>
          <p className={styles.kicker}>Acervo</p>
          <h1>Livros disponíveis</h1>
          <p>
            Explore o catálogo da biblioteca com informações rápidas sobre
            autoria, ano, categoria e disponibilidade.
          </p>
        </div>

        <div className={styles.summary}>
          <span>
            <strong>{livros.length}</strong>
            livros
          </span>
          <span>
            <strong>{disponiveis}</strong>
            disponíveis
          </span>
          <span>
            <strong>{categorias.length}</strong>
            categorias
          </span>
        </div>
      </section>

      <section className={styles.collection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Catálogo</h2>
            <p>{categorias.join(", ")}</p>
          </div>

          <Link href="/buscaAvancada">Filtrar acervo</Link>
        </div>

        <div className={styles.bookGrid}>
          {livros.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
          ))}
        </div>
      </section>
    </main>
  );
}
