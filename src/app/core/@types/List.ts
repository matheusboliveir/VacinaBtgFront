export type ColumnConfig<T, K extends keyof T = keyof T> = {
  key: K;
  label: string;
  formatter?: (value: T[K]) => string;
};

export type TableProps<T> = {
  title: string;
  columns: ColumnConfig<T>[];
  items: T[];
  actions?: TableAction[];
};

export type TableAction = {
  name: string;
  color: TableActionColors;
  link: string;
};

export type TableActionColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
