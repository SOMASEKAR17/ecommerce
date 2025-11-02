import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="E-commerce_hero_lifestyle_image_739c85ad.png"
          alt="Curated collection of premium products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-md bg-white/10 rounded-lg p-8 sm:p-12 max-w-3xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
              Discover Your Style
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
              Shop our curated collection of premium products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <a>
                  <Button
                    size="lg"
                    className="min-h-12 text-lg backdrop-blur-sm bg-white/20 border-2 border-white/30 text-white hover:bg-white/30"
                    data-testid="button-hero-shop-now"
                  >
                    Shop Now
                  </Button>
                </a>
              </Link>
              <Link href="/products">
                <a>
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-h-12 text-lg backdrop-blur-sm bg-white/10 border-2 border-white/30 text-white hover:bg-white/20"
                    data-testid="button-hero-explore"
                  >
                    Explore Collection
                  </Button>
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
