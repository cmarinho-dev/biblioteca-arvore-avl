import { ArvoreAvlLivros } from "../algorithms/arvoreAvl";
import type { Livro } from "../model/livro";
import type { Repository } from "./repository";

class LivroRepository implements Repository<Livro> {
  private livrosStorage: Livro[];

  constructor(livrosStorage: Livro[] = []) {
    this.livrosStorage = livrosStorage;
  }

  find(id: number): Livro | undefined {
    return this.livrosStorage.find((l) => l.id === id);
  }

  findAll(): Livro[] {
    return this.livrosStorage;
  }

  buscarPorNome(termo: string): Livro[] {
    return new ArvoreAvlLivros(this.livrosStorage).buscarPorNome(termo);
  }

  create(item: Livro): void {
    this.livrosStorage.push(item);
  }

  delete(id: number): void {
    const index = this.livrosStorage.findIndex((l) => l.id === id);

    if (index > -1) {
      this.livrosStorage.splice(index, 1);
    }
  }

  update(item: Livro): Livro | undefined {
    const index = this.livrosStorage.findIndex((l) => l.id === item.id);

    if (index > -1) {
      this.livrosStorage[index] = item;
      return item;
    }

    return undefined;
  }
}

export const livroRepository = new LivroRepository([
  {
    id: 1,
    nome: "Esaú e Jacó",
    anoPublicacao: 1904,
    autor: "Machado de Assis",
    categoria: "Romance",
    disponibilidade: "Disponível",
    isbn: "978-85-359-0277-0",
  },
  {
    id: 2,
    nome: "Dom Casmurro",
    anoPublicacao: 1899,
    autor: "Machado de Assis",
    categoria: "Romance",
    disponibilidade: "Disponível",
    isbn: "978-85-359-0277-0",
  },
  {
    id: 3,
    nome: "Memórias Póstumas de Brás Cubas",
    anoPublicacao: 1881,
    autor: "Machado de Assis",
    categoria: "Romance",
    disponibilidade: "Disponível",
    isbn: "978-85-359-0277-0",
  },
  {
    id: 4,
    nome: "Iracema",
    anoPublicacao: 1865,
    autor: "José Saramago",
    categoria: "Romance",
    disponibilidade: "Disponível",
    isbn: "978-85-359-0277-0",
  },
  {
    id: 5,
    nome: "O Cortiço",
    anoPublicacao: 1890,
    autor: "Aluísio Azevedo",
    categoria: "Romance",
    disponibilidade: "Disponível",
    isbn: "978-85-359-0277-0",
  },
]);
