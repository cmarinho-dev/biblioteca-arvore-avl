import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          <strong>BookTree</strong>
          <span>Acervo simples, organizado e pronto para consulta.</span>
        </p>

        <nav aria-label="Links do rodapé">
          <Link href="/livros">Livros</Link>
          <Link href="/buscaAvancada">Busca Avançada</Link>
        </nav>
      </div>
    </footer>
  );
}
