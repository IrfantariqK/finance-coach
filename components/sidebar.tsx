'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Settings, 
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const authenticatedNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: Receipt },
    { name: 'Insights', href: '/insights', icon: PieChart },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const publicNavigation = [
    { name: 'Sign In', href: '/login', icon: LogIn },
    { name: 'Sign Up', href: '/signup', icon: UserPlus },
  ];

  const navigation = session ? authenticatedNavigation : publicNavigation;

  return (
    <div className="flex flex-col w-64 h-full bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="flex items-center h-16 px-4 border-b border-blue-800">
        <h1 className="text-xl font-bold text-white">Finance Coach</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                pathname === item.href
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      {session && (
        <div className="px-2 py-4 border-t border-blue-800">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-blue-100 transition-colors rounded-lg group hover:bg-blue-800/50 hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
} 