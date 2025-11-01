import { Link } from "wouter";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Add some products to get started
            </p>
            <Link href="/products">
              <a>
                <Button size="lg" data-testid="button-continue-shopping-empty">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">Shopping Cart</h1>
            <Button
              variant="outline"
              onClick={clearCart}
              data-testid="button-clear-cart"
            >
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Image */}
                        <Link href={`/product/${item.product.id}`}>
                          <a className="flex-shrink-0">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-md flex items-center justify-center hover-elevate">
                              <img
                                src={item.product.image}
                                alt={item.product.title}
                                className="max-w-full max-h-full object-contain p-2"
                              />
                            </div>
                          </a>
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.product.id}`}>
                            <a>
                              <h3
                                className="font-semibold text-base sm:text-lg mb-1 line-clamp-2 hover:text-primary"
                                data-testid={`text-cart-item-title-${item.product.id}`}
                              >
                                {item.product.title}
                              </h3>
                            </a>
                          </Link>
                          <p className="text-sm text-muted-foreground capitalize mb-3">
                            {item.product.category}
                          </p>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            {/* Quantity */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                data-testid={`button-decrease-${item.product.id}`}
                              >
                                -
                              </Button>
                              <span
                                className="text-base font-medium w-8 text-center"
                                data-testid={`text-quantity-${item.product.id}`}
                              >
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                data-testid={`button-increase-${item.product.id}`}
                              >
                                +
                              </Button>
                            </div>

                            {/* Price and Remove */}
                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <p
                                className="text-xl font-bold"
                                data-testid={`text-item-total-${item.product.id}`}
                              >
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.product.id)}
                                data-testid={`button-remove-${item.product.id}`}
                              >
                                <Trash2 className="h-5 w-5 text-destructive" />
                                <span className="sr-only">Remove item</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium" data-testid="text-subtotal">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-primary">
                        {total >= 50 ? "Free" : "$5.00"}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg mb-6">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-2xl" data-testid="text-total">
                      ${(total + (total >= 50 ? 0 : 5)).toFixed(2)}
                    </span>
                  </div>

                  <Button size="lg" className="w-full mb-4" data-testid="button-checkout">
                    Proceed to Checkout
                  </Button>

                  <Link href="/products">
                    <a>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        data-testid="button-continue-shopping"
                      >
                        Continue Shopping
                      </Button>
                    </a>
                  </Link>

                  {total < 50 && (
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Add ${(50 - total).toFixed(2)} more for free shipping
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
