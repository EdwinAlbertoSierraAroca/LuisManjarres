// Tipos del sistema de galería / proyectos JD Group Solar.
// Mapeo 1:1 con el modelo MySQL propuesto (users, categories,
// subcategories, projects, project_images, tags, project_tags).
// Hoy persiste en data/db.json; mañana puede cambiar el adaptador
// a MySQL sin tocar las rutas ni las páginas.

export type Role = 'ADMIN' | 'EDITOR';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  role: Role;
  active: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  active: boolean;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  subcategory: string;
  location: string;
  year: number;
  powerKwp: number;
  solutionType: string;
  description: string;
  coverImage: string;
  images: ProjectImage[];
  tagIds: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DbShape {
  users: User[];
  categories: Category[];
  subcategories: Subcategory[];
  tags: Tag[];
  projects: Project[];
}

export interface PublicProject extends Project {
  categoryName: string;
  categorySlug: string;
}
