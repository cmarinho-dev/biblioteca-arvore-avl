import Link from "next/link";
import type { Livro } from "@/services/model/livro";
import styles from "./LivroCard.module.scss";

interface LivroCardProps {
  livro: Livro;
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

export default function LivroCard({ livro }: LivroCardProps) {
  const isAvailable = livro.disponibilidade.toLowerCase().includes("dispon");
  const statusClassName = `${styles.status} ${
    isAvailable ? styles.available : styles.unavailable
  }`;

  return (
    <article className={styles.livroCard}>
      <Link
        className={styles.coverLink}
        href={`/livros/${livro.id}`}
        aria-label={`Ver detalhes de ${livro.nome}`}
      >
        <div className={styles.cover} aria-hidden="true">
          <span>{getInitials(livro.nome)}</span>
        </div>
      </Link>

      <div className={styles.livroCardBody}>
        <div className={styles.topLine}>
          <span className={styles.category}>{livro.categoria}</span>
          <span className={statusClassName}>{livro.disponibilidade}</span>
        </div>

        <div className={styles.titleGroup}>
          <h2>
            <Link href={`/livros/${livro.id}`}>{livro.nome}</Link>
          </h2>
          <p>{livro.autor}</p>
        </div>

        <dl className={styles.meta}>
          <div>
            <dt>Ano</dt>
            <dd>{livro.anoPublicacao}</dd>
          </div>
          <div>
            <dt>ISBN</dt>
            <dd>{livro.isbn}</dd>
          </div>
        </dl>

        <Link className={styles.detailsLink} href={`/livros/${livro.id}`}>
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
