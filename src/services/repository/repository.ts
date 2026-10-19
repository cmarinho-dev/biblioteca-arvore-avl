export interface Repository<T> {
  find(id: number): T | undefined;
  findAll(): T[];
  create(item: T): void;
  delete(id: number): void;
  update(item: T): T | undefined;
}
