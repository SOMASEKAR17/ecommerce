import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, Github, Chrome } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLogin() {
  const { loginWithGoogle, loginWithGithub, loading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl">Admin Access</CardTitle>
              <CardDescription className="text-base mt-2">
                Sign in to manage products and inventory
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Button
              size="lg"
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={loginWithGoogle}
              disabled={loading}
            >
              <Chrome className="h-5 w-5 mr-2" />
              Sign in with Google
            </Button>

            <Button
              size="lg"
              className="w-full bg-gray-800 hover:bg-gray-900"
              onClick={loginWithGithub}
              disabled={loading}
            >
              <Github className="h-5 w-5 mr-2" />
              Sign in with GitHub
            </Button>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secure authentication</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Only authorized administrators can access this area
        </p>
      </motion.div>
    </div>
  );
}
