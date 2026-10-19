import Link from "next/link";
import { notFound } from "next/navigation";
import { livroRepository } from "@/services/repository/livroRepository";
import styles from "./page.module.scss";

interface LivroPageProps {
  params: Promise<{
    id: string;
  }>;
}

function getInitials(nome: string) {
  const allWords = nome.split(" ").filter(Boolean);
  const words = allWords.filter((word) => word.trim().length > 2);

  return (words.length > 0 ? words : allWords)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function generateStaticParams() {
  return livroRepository.findAll().map((livro) => ({
    id: String(livro.id),
  }));
}

export default async function LivroPage({ params }: LivroPageProps) {
  const { id } = await params;
  const livro = livroRepository.find(Number(id));

  if (!livro) {
    notFound();
  }

  const isAvailable = livro.disponibilidade.toLowerCase().includes("dispon");
  const statusClassName = `${styles.status} ${
    isAvailable ? styles.available : styles.unavailable
  }`;

  return (
    <main className={styles.detailPage}>
      <Link className={styles.backLink} href="/livros">
        Voltar para livros
      </Link>

      <section className={styles.hero}>
        <div className={styles.cover} aria-hidden="true">
          <span>{getInitials(livro.nome)}</span>
        </div>

        <div className={styles.summary}>
          <div className={styles.topLine}>
            <span className={styles.category}>{livro.categoria}</span>
            <span className={statusClassName}>{livro.disponibilidade}</span>
          </div>

          <div>
            <h1>{livro.nome}</h1>
            <p>{livro.autor}</p>
          </div>
        </div>
      </section>

      <section className={styles.details} aria-label="Detalhes do livro">
        <article>
          <span>Ano de publicação</span>
          <strong>{livro.anoPublicacao}</strong>
        </article>

        <article>
          <span>Categoria</span>
          <strong>{livro.categoria}</strong>
        </article>

        <article>
          <span>Disponibilidade</span>
          <strong>{livro.disponibilidade}</strong>
        </article>

        <article>
          <span>ISBN</span>
          <strong>{livro.isbn}</strong>
        </article>
      </section>
    </main>
  );
}
