import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegação principal">
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark}>
            <Image src="/book-tree.jpg" alt="BookTree" width={40} height={40} />
          </span>
          <span>BookTree</span>
        </Link>

        <ul className={styles.links}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/livros">Livros</Link>
          </li>
          <li>
            <Link href="/buscaAvancada">Busca Avançada</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
