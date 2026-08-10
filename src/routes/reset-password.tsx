import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import logo from "@/assets/logo.png";

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
})

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    
    try {
      // O link de recuperação de e-mail do Supabase faz um login automático por trás dos panos.
      // Então tudo o que precisamos fazer é atualizar o usuário atual com a nova senha.
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });
      
      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess("Senha atualizada com sucesso! Entrando...");
        // Redireciona para a home após 2 segundos
        setTimeout(() => {
          navigate({ to: "/" });
        }, 2000);
      }
    } catch {
      setError("Erro ao tentar atualizar a senha. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-surface px-4 py-8 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary-hover/10 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border-border/50 bg-white/80 backdrop-blur-xl relative z-10">
        <CardHeader className="space-y-3 text-center pt-10 pb-2">
          <div className="mx-auto flex items-center justify-center mb-2">
            <img src={logo} alt="Multicopy" className="h-16 w-auto object-contain" />
          </div>
          <CardTitle className="text-3xl font-display font-bold text-primary-deep tracking-tight mt-4">
            Nova Senha
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground px-4 mt-2">
            Digite sua nova senha abaixo para recuperar o acesso à sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-8 px-8">
          <form onSubmit={handleReset} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-3 rounded-xl border border-green-200">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                {success}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-primary-deep ml-1">
                Nova Senha
              </Label>
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
              disabled={isLoading || success !== null}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Redefinir Senha"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
