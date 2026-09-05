import { createFileRoute, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  Package,
  ShieldCheck,
  FileText,
  ArrowRight,
  ArrowLeft,
  Clock,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CHECKOUT_URL } from "./index";

export const Route = createFileRoute("/pendencia")({
  head: () => ({
    meta: [
      { title: "Pendência do seu pedido | Rosa Mistério Importação" },
      {
        name: "description",
        content:
          "Entenda por que a taxa de importação é cobrada e regularize para liberar a entrega.",
      },
      {
        property: "og:title",
        content: "Pendência do seu pedido | Rosa Mistério Importação",
      },
      {
        property: "og:description",
        content: "Regularize a taxa de importação para liberar a entrega.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PendenciaPage,
});

const REASONS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: FileText,
    title: "Taxa de importação",
    desc: "Tributo aduaneiro cobrado pela fiscalização no destino. Regularizar libera o pacote para entrega.",
  },
];

function PendenciaPage() {
  return (
    <div className="min-h-screen bg-muted/40 bg-gradient-subtle">
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/30">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-base font-bold leading-tight tracking-tight text-foreground">
              Rosa Mistério Importação
            </p>
            <p className="text-xs text-muted-foreground">Central de pedidos</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </span>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Pendência no seu pedido
                </h1>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Sua encomenda foi retida na fiscalização aduaneira. Para liberar
                  a entrega, é necessário regularizar a taxa de importação.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {REASONS.map((r) => (
                <li
                  key={r.title}
                  className="flex gap-3 rounded-xl border bg-muted/30 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <r.icon className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{r.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {r.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Deadline countdown-style box */}
            <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-destructive" />
                <p className="text-sm font-semibold text-foreground">
                  Prazo: até 5 minutos
                </p>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Você tem até 5 minutos para pagar a taxa. Se o prazo expirar, o
                pedido será cancelado e o valor não será reembolsado.
              </p>
            </div>

            <Separator className="my-5" />

            {/* Amount */}
            <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-4">
              <span className="text-sm text-muted-foreground">
                Valor da taxa
              </span>
              <span className="text-lg font-bold tabular-nums text-foreground">
                R$ 14,90
              </span>
            </div>

            <Button asChild size="lg" className="mt-5 w-full gap-2 shadow-sm">
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Lock className="h-4 w-4" />
                Pagar taxa e liberar entrega
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Pagamento seguro · Ambiente criptografado
            </div>

            <Button asChild variant="ghost" className="mt-3 w-full gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Voltar para o status do pedido
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
