export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: string;
          enquiry_code: string;
          type: string;
          status: string;
          source: string;
          name: string;
          phone: string;
          email: string;
          consent: boolean;
          destination: string | null;
          destination_slug: string | null;
          departure_city: string | null;
          package_name: string | null;
          package_slug: string | null;
          travel_start: string | null;
          travel_end: string | null;
          travellers: number | null;
          adults: number | null;
          children: number | null;
          infants: number | null;
          days: number | null;
          preferences: string[];
          budget: string | null;
          message: string | null;
          page_path: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          enquiry_code: string;
          type: string;
          status?: string;
          source?: string;
          name: string;
          phone: string;
          email: string;
          consent?: boolean;
          destination?: string | null;
          destination_slug?: string | null;
          departure_city?: string | null;
          package_name?: string | null;
          package_slug?: string | null;
          travel_start?: string | null;
          travel_end?: string | null;
          travellers?: number | null;
          adults?: number | null;
          children?: number | null;
          infants?: number | null;
          days?: number | null;
          preferences?: string[];
          budget?: string | null;
          message?: string | null;
          page_path?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["enquiries"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
