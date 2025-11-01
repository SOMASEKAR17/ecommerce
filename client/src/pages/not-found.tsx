import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <a>
              <Button size="lg" data-testid="button-home">
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Button>
            </a>
          </Link>
          <Link href="/products">
            <a>
              <Button size="lg" variant="outline" data-testid="button-products">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Browse Products
              </Button>
            </a>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
