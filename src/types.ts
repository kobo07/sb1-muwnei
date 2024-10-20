export interface Todo {
  id: string;
  title: string;
  description?: string;
  importance: 'low' | 'medium' | 'high';
  image?: File;
  imageUrl?: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}