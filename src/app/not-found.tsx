import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main className={styles.notFoundPage}>
      <section className={styles.pageHeader}>
        <p className={styles.kicker}>404</p>
        <h1>Página não encontrada</h1>
        <p>A página que você está procurando não existe ou foi removida.</p>
      </section>
      <Link className={styles.backLink} href="/livros">
        Voltar para livros
      </Link>
    </main>
  );
}
