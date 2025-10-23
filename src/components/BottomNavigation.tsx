import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Screen } from '../App';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface BottomNavigationProps {
  items: NavItem[];
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({ items, currentScreen, onNavigate }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-border">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`flex flex-col items-center p-2 min-w-0 flex-1 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}