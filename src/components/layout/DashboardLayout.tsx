import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, LogOut, Menu, ChevronDown, Home, ChevronRight } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BrandMark } from '@/components/common/BrandMark';
import { cn, getInitials } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import type { Role } from '@/types';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/stores/auth.store';

const navItems: Array<{
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: Role[];
}> = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard, roles: ['ADMIN', 'EMPLOYEE'] },
  { label: 'Complaints', href: ROUTES.COMPLAINTS.LIST, icon: FileText, roles: ['ADMIN', 'EMPLOYEE'] },
  { label: 'Users', href: ROUTES.USERS.LIST, icon: Users, roles: ['ADMIN'] },
];

interface BreadcrumbItem {
  label: string;
  href?: string;
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === ROUTES.DASHBOARD) return [];

  if (pathname === ROUTES.COMPLAINTS.LIST) {
    return [{ label: 'Complaints' }];
  }
  if (pathname === ROUTES.COMPLAINTS.CREATE) {
    return [
      { label: 'Complaints', href: ROUTES.COMPLAINTS.LIST },
      { label: 'Create Complaint' },
    ];
  }
  if (/^\/complaints\/[^/]+$/.test(pathname)) {
    return [
      { label: 'Complaints', href: ROUTES.COMPLAINTS.LIST },
      { label: 'Complaint Details' },
    ];
  }

  if (pathname === ROUTES.USERS.LIST) {
    return [{ label: 'Users' }];
  }
  if (pathname === ROUTES.USERS.CREATE) {
    return [
      { label: 'Users', href: ROUTES.USERS.LIST },
      { label: 'Create User' },
    ];
  }
  if (/^\/users\/[^/]+\/edit$/.test(pathname)) {
    return [
      { label: 'Users', href: ROUTES.USERS.LIST },
      { label: 'Edit User' },
    ];
  }

  return [];
}

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === ROUTES.DASHBOARD) {
    return pathname === ROUTES.DASHBOARD;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardLayout() {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const isHome = location.pathname === ROUTES.DASHBOARD;
  const user = useAuthStore((state) => state.user);
  const { logout, isLoggingOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredNav = navItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <div className="min-h-screen overflow-x-hidden bg-muted/40">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-rsp-navy text-white shadow-xl transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="tricolor-bar-thin shrink-0" />

        <div className="shrink-0 border-b border-white/10 px-4 py-4">
          <BrandMark variant="dark" size="lg" />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4 pt-4">
          {filteredNav.map((item) => {
            const Icon = item.icon;
            const isActive = isNavItemActive(location.pathname, item.href);
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === ROUTES.DASHBOARD}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-rsp-saffron text-white shadow-md'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden md:pl-64">
        <header className="sticky top-0 z-40 border-b border-border bg-white shadow-sm">
          <div className="tricolor-bar-thin" />
          <div className="flex h-13 items-center justify-between gap-3 px-3 md:px-5">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-rsp-navy md:hidden"
                onClick={() => setSidebarOpen((v) => !v)}
              >
                <Menu className="h-4 w-4" />
              </Button>

              <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5">
                <NavLink
                  to={ROUTES.DASHBOARD}
                  title="Home"
                  className={cn(
                    'flex shrink-0 items-center rounded-md p-1.5 transition-colors',
                    isHome
                      ? 'bg-rsp-saffron/10 text-rsp-saffron'
                      : 'text-muted-foreground hover:bg-muted hover:text-rsp-navy'
                  )}
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Home</span>
                </NavLink>

                {breadcrumbs.map((crumb, index) => (
                  <Fragment key={`${crumb.label}-${index}`}>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {crumb.href ? (
                      <NavLink
                        to={crumb.href}
                        className="truncate text-sm text-muted-foreground transition-colors hover:text-rsp-navy"
                      >
                        {crumb.label}
                      </NavLink>
                    ) : (
                      <span className="truncate text-sm font-medium text-rsp-navy">{crumb.label}</span>
                    )}
                  </Fragment>
                ))}
              </nav>
            </div>

            <div className="shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg px-1.5 py-1 outline-none transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                  <span className="hidden max-w-[120px] truncate text-xs font-medium text-rsp-navy sm:inline md:max-w-[160px]">
                    {user?.fullName}
                  </span>
                  <Avatar className="h-8 w-8 border-2 border-rsp-saffron/30">
                    <AvatarFallback className="bg-rsp-navy text-xs text-white">
                      {getInitials(user?.fullName ?? 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  disabled={isLoggingOut}
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-rsp-navy/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
