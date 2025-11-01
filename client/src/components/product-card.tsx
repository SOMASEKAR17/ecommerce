import { Link } from "wouter";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/product/${product.id}`}>
        <a data-testid={`link-product-${product.id}`}>
          <Card className="group h-full hover-elevate active-elevate-2 transition-all duration-200">
            <CardContent className="p-4">
              {/* Image */}
              <div className="aspect-square mb-4 bg-muted rounded-md overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.source === 'admin' && (
                  <Badge
                    variant="secondary"
                    className="absolute top-2 right-2"
                  >
                    New
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h3
                className="text-base font-medium line-clamp-2 mb-2 min-h-[3rem]"
                data-testid={`text-product-title-${product.id}`}
              >
                {product.title}
              </h3>

              {/* Category */}
              <p className="text-sm text-muted-foreground capitalize mb-2">
                {product.category}
              </p>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {product.rating.rate.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating.count})
                  </span>
                </div>
              )}

              {/* Price */}
              <p
                className="text-2xl font-bold"
                data-testid={`text-product-price-${product.id}`}
              >
                ${product.price.toFixed(2)}
              </p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full"
                onClick={handleAddToCart}
                data-testid={`button-add-to-cart-${product.id}`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </a>
      </Link>
    </motion.div>
  );
}
