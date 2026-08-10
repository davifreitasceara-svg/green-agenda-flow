import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message === "Invalid login credentials") {
          setError("E-mail ou senha incorretos. Tente novamente.");
        } else if (authError.message === "Email not confirmed") {
          setError("Confirme seu e-mail antes de entrar.");
        } else {
          setError(authError.message);
        }
        setIsLoading(false);
        return;
      }

      navigate({ to: "/" });
    } catch {
      setError("Erro ao conectar. Verifique sua conexão e tente novamente.");
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Preencha o e-mail e a senha para se cadastrar.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      setError(null);
      setIsLoading(false);
      alert("Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.");
    } catch {
      setError("Erro ao criar conta. Tente novamente.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (googleError) {
      setError("Erro ao conectar com o Google. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-surface px-4 py-8 sm:px-6 lg:px-8 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary-hover/10 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border-border/50 bg-white/80 backdrop-blur-xl relative z-10">
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
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-primary-deep ml-1">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border/60"></div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ou</span>
            <div className="flex-1 h-px bg-border/60"></div>
          </div>

          {/* Google Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full h-12 text-sm font-semibold rounded-xl border-border/80 bg-white hover:bg-gray-50 hover:shadow-md transition-all shadow-sm gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar com Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center pb-8 border-t border-border/40 pt-6">
          <p className="text-sm text-muted-foreground font-medium">
            Ainda não tem uma conta?{' '}
            <button 
              onClick={handleSignUp} 
              className="font-bold text-primary hover:text-primary-hover transition-colors"
              type="button"
            >
              Cadastre-se
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
