export interface User {
  id: string;
  email: string;
  alter_ego?: string;
  age?: number;
  zodiac_sign?: string;
  ethnicity?: string;
  characteristics_to_change?: string[];
  insecurities?: string[];
  emotional_pain?: string;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface OnboardingResponse {
  question: string;
  answer: string;
  score?: number;
}

export interface DashboardPanel {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  component: string;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user: {
    alter_ego: string;
    avatar_url?: string;
  };
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    alter_ego: string;
    avatar_url?: string;
  };
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface HealthData {
  height?: number;
  weight?: number;
  water_intake?: number;
  daily_calories?: number;
  bmi?: number;
}

export interface MenstrualCycle {
  last_period: Date;
  cycle_length: number;
  period_length: number;
  next_period?: Date;
  ovulation_date?: Date;
}

export interface GlowUpItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Donation {
  id: string;
  user_id?: string;
  email: string;
  amount: number;
  message?: string;
  donated_at: string;
}

export interface PainelConteudo {
  id: string; // UUID
  user_id: string; // UUID
  painel_nome: string;
  conteudo: any; // JSON
  atualizado_em: string; // timestamp
}