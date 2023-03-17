export interface ProductListReq {
  prodName: string;
}

export interface ProductListItem {
  a: string;
  b: string;
}

export interface ResponseTpl<T = any> {
  content: T;
  total?: number;
}
