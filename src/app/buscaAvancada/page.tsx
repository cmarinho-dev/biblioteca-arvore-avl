import Link from "next/link";
import LivroCard from "@/components/LivroCard/LivroCard";
import { livroRepository } from "@/services/repository/livroRepository";
import styles from "./page.module.scss";

type SearchParams = {
  categoria?: string | string[];
  disponibilidade?: string | string[];
  termo?: string | string[];
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function BuscaAvancada({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const termo = getParam(params.termo).trim();
  const categoria = getParam(params.categoria);
  const disponibilidade = getParam(params.disponibilidade);
  const livros = livroRepository.findAll();
  const categorias = Array.from(
    new Set(livros.map((livro) => livro.categoria)),
  );
  const disponibilidades = Array.from(
    new Set(livros.map((livro) => livro.disponibilidade)),
  );
  const termoNormalizado = normalize(termo);
  const hasFilters = Boolean(termo || categoria || disponibilidade);

  const resultadosPorNome = livroRepository.buscarPorNome(termo);
  const resultados = resultadosPorNome.filter((livro) => {
    const matchesTermo =
      !termoNormalizado ||
      normalize(livro.nome).includes(termoNormalizado) ||
      [livro.autor, livro.isbn].some((value) =>
        normalize(String(value)).includes(termoNormalizado),
      );
    const matchesCategoria = !categoria || livro.categoria === categoria;
    const matchesDisponibilidade =
      !disponibilidade || livro.disponibilidade === disponibilidade;

    return matchesTermo && matchesCategoria && matchesDisponibilidade;
  });

  return (
    <main className={styles.searchPage}>
      <section className={styles.pageHeader}>
        <p className={styles.kicker}>Busca Avançada</p>
        <h1>Filtre o acervo</h1>
        <p>
          Combine termo, categoria e disponibilidade para encontrar uma obra
          específica em poucos segundos.
        </p>
      </section>

      <p className={styles.avlLink}>
        <Link href="/avl">Como a árvore AVL organiza a busca?</Link>
      </p>

      <form className={styles.searchPanel}>
        <div className={styles.fields}>
          <label>
            <span>Termo</span>
            <input
              name="termo"
              type="search"
              defaultValue={termo}
              placeholder="Título, autor ou ISBN"
            />
          </label>

          <label>
            <span>Categoria</span>
            <select name="categoria" defaultValue={categoria}>
              <option value="">Todas</option>
              {categorias.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Disponibilidade</span>
            <select name="disponibilidade" defaultValue={disponibilidade}>
              <option value="">Todas</option>
              {disponibilidades.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.formActions}>
          <button type="submit">Buscar</button>
          {hasFilters ? (
            <Link href="/buscaAvancada">Limpar filtros</Link>
          ) : null}
        </div>
      </form>

      <section className={styles.results}>
        <div className={styles.resultsHeader}>
          <h2>Resultados</h2>
          <span>
            {resultados.length === 1
              ? "1 livro encontrado"
              : `${resultados.length} livros encontrados`}
          </span>
        </div>

        {resultados.length > 0 ? (
          <div className={styles.bookGrid}>
            {resultados.map((livro) => (
              <LivroCard key={livro.id} livro={livro} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>Nenhum livro encontrado</h3>
            <p>Revise os filtros ou limpe a busca para ver todo o acervo.</p>
            <Link href="/buscaAvancada">Ver todos os livros</Link>
          </div>
        )}
      </section>
    </main>
  );
}
