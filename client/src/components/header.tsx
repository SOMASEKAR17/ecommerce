import { Link, useLocation } from "wouter";
import { ShoppingCart, Sun, Moon, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme-provider";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md -ml-2" data-testid="link-home">
              <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              <span className="font-heading text-xl sm:text-2xl font-bold">
                ShopHub
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.path} href={item.path}>
                <a>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    data-testid={`link-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Button>
                </a>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Link href="/products">
              <a>
                <Button variant="ghost" size="icon" data-testid="button-search">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search products</span>
                </Button>
              </a>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <a>
                <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1 text-xs"
                      data-testid="badge-cart-count"
                    >
                      {itemCount}
                    </Badge>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </Button>
              </a>
            </Link>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User menu */}
            {isAuthenticated ? (
              <Link href="/admin">
                <a>
                  <Button variant="ghost" size="icon" data-testid="button-admin">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Admin panel</span>
                  </Button>
                </a>
              </Link>
            ) : null}

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col gap-2 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <a onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant={location === item.path ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          data-testid={`link-mobile-${item.name.toLowerCase()}`}
                        >
                          {item.name}
                        </Button>
                      </a>
                    </Link>
                  ))}
                  {isAuthenticated && (
                    <Link href="/admin">
                      <a onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          data-testid="link-mobile-admin"
                        >
                          Admin Panel
                        </Button>
                      </a>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
