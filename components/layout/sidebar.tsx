'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  LayoutDashboard, 
  Settings, 
  Users, 
  BarChart,
  FileText,
  ChevronRight
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg md:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 pt-10">
          <MobileSidebarContent pathname={pathname} onItemClick={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="h-screen w-64 py-6">
        <ScrollArea className="h-full px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                pathname={pathname}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function MobileSidebarContent({ pathname, onItemClick }: { pathname: string, onItemClick: () => void }) {
  return (
    <ScrollArea className="h-full px-3 py-2">
      <div className="space-y-1 py-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}

interface SidebarItemProps {
  item: SidebarItem;
  pathname: string;
}

function SidebarItem({ item, pathname }: SidebarItemProps) {
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      <item.icon className={cn("h-5 w-5", isActive ? "text-foreground" : "text-muted-foreground")} />
      {item.title}
    </Link>
  );
}