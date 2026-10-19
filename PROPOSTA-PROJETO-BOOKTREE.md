# PUCPR

## PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ

### PROPOSTA DE PROJETO – PROTÓTIPO DE SOFTWARE COM ESTRUTURAS DE DADOS

**Curso:** Engenharia de Software  
**Disciplina:** Resolução de Problemas Estruturados em Computação (Turma 4º B)  
**Professor:** Jackson Luis Schirigatti  
**Data:** 19/10/2026

**Acadêmicos:**

- Alan Mendes Lopes Vareschini
- Carlos Henrique Viana Marinho
- Rafael Berton Martins
- Rafael Padilha de Lima Mattioli

<br>

# BookTree – Sistema de Gerenciamento e Busca de Livros

## Contexto desta entrega

Esta atividade dá continuidade ao projeto BookTree, que já está em desenvolvimento pela equipe. O protótipo já possui estrutura de aplicação web, modelo e repositório de livros, páginas de consulta do acervo e busca avançada. A árvore AVL apresentada a seguir faz parte dessa base existente: sua implementação está integrada ao repositório e é utilizada pela busca de títulos. Portanto, a proposta não descreve um sistema hipotético ou um exercício isolado; documenta a estrutura de dados aplicada ao projeto em andamento e detalha as operações de balanceamento solicitadas nesta atividade.

O acervo e a aplicação ainda são um protótipo, mas a AVL está implementada no código do projeto. A seção 7 apresenta os trechos centrais responsáveis pela inserção e pelos casos LL, RR, LR e RL; o arquivo completo está em `src/services/algorithms/arvoreAvl.ts`.

## 1. Resumo

O BookTree é um protótipo de aplicação web para consulta e organização de um acervo bibliográfico. O projeto utiliza uma árvore AVL como estrutura de busca ordenada por título. A árvore mantém o balanceamento após a inserção de cada chave por meio das rotações LL, RR, LR e RL. Na aplicação, o índice é usado pela busca avançada para localizar títulos e apresentar resultados em ordem alfabética, junto com filtros por autor, ISBN, categoria e disponibilidade.

**Palavras-chave:** árvore AVL; árvore binária de busca; balanceamento; busca de livros; estruturas de dados.

## 2. Introdução

Sistemas de biblioteca precisam organizar registros e permitir que usuários encontrem obras a partir de informações como título, autoria e categoria. Uma árvore binária de busca oferece uma forma de manter chaves ordenadas; entretanto, inserções em ordem desfavorável podem formar uma árvore inclinada e degradar a busca para O(n).

A árvore AVL resolve esse problema ao limitar a diferença de altura entre as subárvores de cada nó. Quando uma inserção causa desequilíbrio, a estrutura identifica o caminho percorrido e aplica uma rotação simples ou dupla. Este trabalho apresenta a implementação dessas operações e sua aplicação à busca por títulos no protótipo BookTree.

## 3. Objetivos

### 3.1 Objetivo geral

Implementar e aplicar uma árvore AVL ao índice de títulos do acervo do BookTree, incluindo a correção de todos os casos de desbalanceamento causados por inserção.

### 3.2 Objetivos específicos

- Armazenar títulos em uma árvore binária de busca balanceada.
- Atualizar a altura dos nós após cada inserção.
- Calcular o fator de balanceamento de cada nó ancestral.
- Implementar os casos LL, RR, LR e RL.
- Integrar o índice à busca avançada do protótipo.
- Descrever o funcionamento e a complexidade das operações.

## 4. Descrição do protótipo

O protótipo foi desenvolvido em TypeScript com Next.js e apresenta páginas de consulta do acervo e busca avançada. Os registros de livro contêm identificador, nome, autor, ISBN, categoria, ano de publicação e disponibilidade.

Na busca avançada, o usuário pode pesquisar por termo e combinar a consulta com filtros de categoria e disponibilidade. O termo é aplicado ao título, autor e ISBN. Os títulos são indexados pela árvore AVL e os resultados são exibidos em ordem alfabética. A normalização usada no índice ignora diferenças entre letras maiúsculas, minúsculas e acentos.

O repositório do protótipo mantém dados de exemplo em memória. A árvore é construída a partir dos livros armazenados no repositório durante a consulta; portanto, esta versão demonstra a aplicação da estrutura de dados e não representa uma persistência em banco de dados.

## 5. Árvore AVL

Uma AVL é uma árvore binária de busca em que, para cada nó, a diferença entre as alturas da subárvore esquerda e da subárvore direita é no máximo um em módulo.

O fator de balanceamento utilizado no código é:

```text
FB(nó) = altura(subárvore esquerda) − altura(subárvore direita)
```

Assim, os fatores válidos em uma árvore balanceada são −1, 0 e +1. Um fator maior que +1 indica excesso de altura à esquerda; um fator menor que −1 indica excesso à direita. O sentido da inserção determina qual rotação corrige o desequilíbrio.

## 6. Operações de balanceamento

| Caso | Caminho do desbalanceamento | Correção aplicada |
|---|---|---|
| LL | Esquerda → Esquerda | Rotação simples à direita no nó desbalanceado. |
| RR | Direita → Direita | Rotação simples à esquerda no nó desbalanceado. |
| LR | Esquerda → Direita | Rotação à esquerda no filho esquerdo, seguida de rotação à direita no nó desbalanceado. |
| RL | Direita → Esquerda | Rotação à direita no filho direito, seguida de rotação à esquerda no nó desbalanceado. |

### 6.1 Caso LL

O novo título é inserido na subárvore esquerda do filho esquerdo do nó desbalanceado. Aplica-se uma rotação à direita. Por exemplo, inserindo as chaves `C`, `B` e `A`, a rotação faz `B` assumir a raiz da subárvore, com `A` à esquerda e `C` à direita.

### 6.2 Caso RR

O novo título é inserido na subárvore direita do filho direito. Aplica-se uma rotação à esquerda. Com as chaves `A`, `B` e `C`, a nova raiz da subárvore passa a ser `B`, com `A` à esquerda e `C` à direita.

### 6.3 Caso LR

O novo título é inserido na subárvore direita do filho esquerdo. A correção ocorre em duas etapas: primeiro uma rotação à esquerda no filho esquerdo; depois uma rotação à direita no nó desbalanceado. Para `C`, `A` e `B`, a raiz resultante é `B`.

### 6.4 Caso RL

O novo título é inserido na subárvore esquerda do filho direito. Primeiro aplica-se uma rotação à direita no filho direito; em seguida, uma rotação à esquerda no nó desbalanceado. Para `A`, `C` e `B`, a raiz resultante também é `B`.

## 7. Aplicação e funcionamento do algoritmo

A classe `ArvoreAvlLivros`, implementada em `src/services/algorithms/arvoreAvl.ts`, representa cada chave com o título normalizado, a altura, referências para os filhos esquerdo e direito e uma lista de livros associados àquele título. Títulos iguais compartilham o mesmo nó.

O processo de inserção segue estas etapas:

1. Normaliza o título do livro.
2. Compara a chave com o nó atual e segue para a esquerda ou para a direita.
3. Cria um novo nó quando encontra uma posição vazia ou acrescenta o livro à lista quando o título já existe.
4. Ao retornar da recursão, recalcula a altura e o fator de balanceamento dos nós visitados.
5. Identifica o caso LL, RR, LR ou RL e executa a rotação correspondente.
6. Retorna a raiz atualizada da subárvore para preservar a árvore ordenada e balanceada.

As funções `rotacionarDireita` e `rotacionarEsquerda` reorganizam os ponteiros entre os nós e recalculam as alturas afetadas. Os casos duplos combinam essas duas operações.

### 7.1 Código da inserção e balanceamento

O trecho abaixo corresponde à implementação utilizada no projeto. Após inserir a chave recursivamente, o algoritmo atualiza a altura, calcula o fator de balanceamento e escolhe uma das quatro correções.

```typescript
function inserir(no: NoAvl | null, livro: Livro): NoAvl {
  const chave = normalizar(livro.nome);

  if (!no) {
    return {
      chave,
      livros: [livro],
      altura: 1,
      esquerda: null,
      direita: null,
    };
  }

  if (chave < no.chave) {
    no.esquerda = inserir(no.esquerda, livro);
  } else if (chave > no.chave) {
    no.direita = inserir(no.direita, livro);
  } else {
    no.livros.push(livro);
    return no;
  }

  atualizarAltura(no);
  const balanceamento = fatorBalanceamento(no);

  if (balanceamento > 1 && chave < (no.esquerda?.chave ?? "")) {
    return rotacionarDireita(no); // LL
  }

  if (balanceamento < -1 && chave > (no.direita?.chave ?? "")) {
    return rotacionarEsquerda(no); // RR
  }

  if (balanceamento > 1 && chave > (no.esquerda?.chave ?? "")) {
    no.esquerda = rotacionarEsquerda(no.esquerda as NoAvl); // LR: primeira etapa
    return rotacionarDireita(no); // LR: segunda etapa
  }

  if (balanceamento < -1 && chave < (no.direita?.chave ?? "")) {
    no.direita = rotacionarDireita(no.direita as NoAvl); // RL: primeira etapa
    return rotacionarEsquerda(no); // RL: segunda etapa
  }

  return no;
}
```

As rotações simples usadas pelo balanceamento são:

```typescript
function rotacionarDireita(pivo: NoAvl): NoAvl {
  const novaRaiz = pivo.esquerda;
  if (!novaRaiz) return pivo;

  pivo.esquerda = novaRaiz.direita;
  novaRaiz.direita = pivo;
  atualizarAltura(pivo);
  atualizarAltura(novaRaiz);
  return novaRaiz;
}

function rotacionarEsquerda(pivo: NoAvl): NoAvl {
  const novaRaiz = pivo.direita;
  if (!novaRaiz) return pivo;

  pivo.direita = novaRaiz.esquerda;
  novaRaiz.esquerda = pivo;
  atualizarAltura(pivo);
  atualizarAltura(novaRaiz);
  return novaRaiz;
}
```

`atualizarAltura` calcula `1 + max(altura(esquerda), altura(direita))`. A função `fatorBalanceamento` subtrai a altura direita da altura esquerda. Assim, após cada inserção, o código verifica os fatores e os sentidos da chave inserida para identificar a rotação adequada.

O método `buscarPorNome` percorre os nós em ordem, o que produz os títulos em ordem alfabética, e seleciona os livros cujo título contém o termo normalizado. O repositório expõe a operação por meio de `buscarPorNome`, e a página `src/app/buscaAvancada/page.tsx` utiliza esses resultados antes de aplicar os filtros adicionais.

### 7.2 Complexidade

Em uma AVL, a altura permanece O(log n). Por isso, a inserção e a busca de uma chave exata têm complexidade O(log n), desconsiderando o custo de comparação das strings. A travessia em ordem custa O(n). Na implementação atual, a busca por trecho percorre os títulos ordenados e filtra as correspondências, portanto custa O(n) após a construção do índice. A construção da árvore por inserções sucessivas custa O(n log n) no caso geral.

## 8. Organização dos arquivos

- `src/services/algorithms/arvoreAvl.ts`: nó AVL, normalização, inserção, atualização de alturas, rotações e busca ordenada por título.
- `src/services/repository/livroRepository.ts`: repositório de livros e integração com a árvore AVL.
- `src/app/buscaAvancada/page.tsx`: interface que consulta o índice e aplica os filtros do acervo.
- `src/app/avl/page.tsx`: página do protótipo que apresenta a estrutura e os casos de balanceamento.

## 9. Como acessar a demonstração

Com as dependências do projeto instaladas, inicie a aplicação na pasta do projeto:

```bash
npm run dev
```

Abra `http://localhost:3000/buscaAvancada` para usar a busca. A página `/avl` apresenta o material explicativo e permite imprimir ou salvar a página em PDF pelo navegador.

## 10. Considerações finais

A implementação da AVL demonstra como manter uma árvore binária de busca balanceada após inserções e como usar essa estrutura em uma funcionalidade concreta do BookTree. As rotações LL e RR corrigem desequilíbrios em linha; as rotações LR e RL corrigem desequilíbrios em zigue-zague. Com o índice integrado à busca avançada, o protótipo apresenta os títulos ordenados e permite localizar obras junto com outros filtros bibliográficos.

Como evolução, a estrutura pode ser mantida incrementalmente quando livros forem cadastrados, alterados ou removidos, em vez de ser reconstruída para cada consulta. O armazenamento também pode ser substituído por um banco de dados quando o protótipo passar a persistir registros.

## 11. Referência

INTELIGÊNCIA NOS DADOS. Material de consulta indicado na atividade, p. 52–59. Dados editoriais não informados no enunciado recebido.
