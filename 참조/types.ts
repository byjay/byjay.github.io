
export type EntryType = 'command' | 'sysvar';
export type CADGrade = 'Standard' | 'Pro' | 'All';

export interface CADEntry {
  id: string;
  name: string;
  description: string;
  type: EntryType;
  grade: 'Standard' | 'Pro';
  functionGroup: string;
  alphabet: string;
  imageUrl?: string; // URL for help diagrams
}

export interface DetailedGuide {
  usage: string;
  examples: string[];
  tips: string[];
  related: string[];
  visualDescription: string; // Description of what the help image should show
}
