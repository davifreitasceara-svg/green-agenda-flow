import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      navigate({ to: "/" });
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-surface px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary-hover/10 rounded-full blur-3xl pointer-events-none"></div>

      <Card className="w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border-border/50 bg-white/80 backdrop-blur-xl relative z-10">
        <CardHeader className="space-y-3 text-center pt-10">
          <div className="mx-auto bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow-inner">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-3xl font-display font-bold text-primary-deep tracking-tight">
            Bem-vindo
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground px-4">
            Acesse sua conta para continuar sua jornada criativa.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-8 px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-primary-deep ml-1">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="h-12 px-4 rounded-xl border-border/80 bg-white/50 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-sm font-semibold text-primary-deep">
                  Senha
                </Label>
                <a href="#" className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-12 px-4 rounded-xl border-border/80 bg-white/50 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-sm"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-bold rounded-xl bg-primary hover:bg-primary-hover hover:shadow-lg transition-all shadow-md mt-6 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8 border-t border-border/40 pt-6">
          <p className="text-sm text-muted-foreground font-medium">
            Ainda não tem uma conta?{' '}
            <a href="#" className="font-bold text-primary hover:text-primary-hover transition-colors">
              Cadastre-se
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
