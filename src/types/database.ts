import type { TaskStatus, ThemePreference } from "@/lib/validations/enums";

export type Profile = {
  id: string;
  display_name: string;
  callsign: string | null;
  level: number;
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  name: string;
  trader: string;
  description: string | null;
  sort_order: number;
  created_at: string;
};

export type Map = {
  id: string;
  name: string;
  loot_focus: string | null;
  created_at: string;
};

export type Item = {
  id: string;
  name: string;
  category: string | null;
  created_at: string;
};

export type HideoutModule = {
  id: string;
  name: string;
  max_level: number;
  created_at: string;
};

export type UserTaskProgress = {
  id: string;
  user_id: string;
  task_id: string;
  status: TaskStatus;
  progress: number;
  created_at: string;
  updated_at: string;
};

export type UserHideoutProgress = {
  id: string;
  user_id: string;
  hideout_module_id: string;
  level: number;
  progress: number;
  created_at: string;
  updated_at: string;
};

export type UserSettings = {
  id: string;
  user_id: string;
  preferred_map_id: string | null;
  theme: ThemePreference;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          display_name?: string;
          callsign?: string | null;
          level?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string;
          callsign?: string | null;
          level?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: Task;
        Insert: {
          id: string;
          name: string;
          trader: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          trader?: string;
          description?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      maps: {
        Row: Map;
        Insert: {
          id: string;
          name: string;
          loot_focus?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          loot_focus?: string | null;
        };
        Relationships: [];
      };
      items: {
        Row: Item;
        Insert: {
          id: string;
          name: string;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          category?: string | null;
        };
        Relationships: [];
      };
      hideout_modules: {
        Row: HideoutModule;
        Insert: {
          id: string;
          name: string;
          max_level?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          max_level?: number;
        };
        Relationships: [];
      };
      user_task_progress: {
        Row: UserTaskProgress;
        Insert: {
          id?: string;
          user_id: string;
          task_id: string;
          status?: TaskStatus;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          task_id?: string;
          status?: TaskStatus;
          progress?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_hideout_progress: {
        Row: UserHideoutProgress;
        Insert: {
          id?: string;
          user_id: string;
          hideout_module_id: string;
          level?: number;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          hideout_module_id?: string;
          level?: number;
          progress?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_settings: {
        Row: UserSettings;
        Insert: {
          id?: string;
          user_id: string;
          preferred_map_id?: string | null;
          theme?: ThemePreference;
          notifications_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          preferred_map_id?: string | null;
          theme?: ThemePreference;
          notifications_enabled?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      task_status: TaskStatus;
      theme_preference: ThemePreference;
    };
    CompositeTypes: Record<string, never>;
  };
};
