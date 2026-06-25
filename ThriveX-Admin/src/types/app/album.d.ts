export interface AlbumCate {
  id?: number;
  name: string;
  cover: string;
  images: string[];
  count: number;
}

export interface AlbumImage {
  id?: number;
  name: string;
  description: string;
  image: string;
  cateId: number;
  createTime: number;
}
