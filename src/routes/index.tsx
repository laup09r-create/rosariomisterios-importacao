import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Package,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Truck,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import correiosLogo from "@/assets/correios-logo.png.asset.json";

export const CHECKOUT_URL =
  "https://pay.pagamento-online.app/checkout/af011005-e9ee-44a9-9010-c44b31f8985b?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";

type StepState = "done" | "progress" | "pending";

const STEPS: {
  title: string;
  desc: string;
  state: StepState;
  date: string;
  location: string;
}[] = [
  {
    title: "Pagamento confirmado",
    desc: "Recebemos seu pagamento com sucesso. O pedido foi liberado para processamento.",
    state: "done",
    date: "02/09 · 14:21",
    location: "Sistema de pedidos",
  },
  {
    title: "Pedido em separação",
    desc: "Sua encomenda foi separada no centro de distribuição internacional e está pronta para envio.",
    state: "done",
    date: "02/09 · 16:08",
    location: "Centro de distribuição — Shenzhen",
  },
  {
    title: "Em trânsito internacional",
    desc: "O pacote está a caminho do Brasil via transporte internacional rastreado.",
    state: "done",
    date: "03/09 · 09:42",
    location: "Em trânsito — rota internacional",
  },
  {
    title: "Fiscalização aduaneira",
    desc: "Sua encomenda está sob análise da fiscalização aduaneira para liberação no país de destino.",
    state: "progress",
    date: "Em andamento",
    location: "Aduana — Brasil",
  },
  {
    title: "Pendência no seu pedido",
    desc: "Uma taxa obrigatória de importação precisa ser regularizada para liberar a entrega ao destinatário.",
    state: "pending",
    date: "Aguardando ação",
    location: "Retido na fiscalização",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Acompanhe seu pedido | Rosa Mistério Importação" },
      {
        name: "description",
        content:
          "Seu pagamento foi confirmado e o pedido está em processamento. Existe uma pendência que precisa ser regularizada para liberar a entrega.",
      },
      {
        property: "og:title",
        content: "Acompanhe seu pedido | Rosa Mistério Importação",
      },
      {
        property: "og:description",
        content:
          "Pagamento confirmado. Resolva a pendência da sua encomenda para liberar a entrega.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [visibleStep, setVisibleStep] = useState(0);
  const TOTAL_STEPS = STEPS.length;

  useEffect(() => {
    if (visibleStep >= TOTAL_STEPS) return;
    const timer = setTimeout(() => setVisibleStep((s) => s + 1), 1500);
    return () => clearTimeout(timer);
  }, [visibleStep]);

  const activeStep = visibleStep >= 1 ? STEPS[visibleStep - 1] : null;
  const progressPct =
    visibleStep <= 1 ? 0 : Math.round(((visibleStep - 1) / (TOTAL_STEPS - 1)) * 100);

  return (
    <div className="min-h-screen bg-muted/40 bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
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
          <img
            src={correiosLogo.url}
            alt="Correios"
            className="h-7 w-auto object-contain opacity-90"
          />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Status timeline */}
        <Card className="mt-4 shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Status do seu pedido
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Acompanhe cada etapa em tempo real.
                </p>
              </div>
              <Badge variant="outline" className="shrink-0 tabular-nums">
                {Math.min(visibleStep, TOTAL_STEPS)}/{TOTAL_STEPS} etapas
              </Badge>
            </div>

            {/* Horizontal stepper */}
            <div className="mt-8">
              <div className="relative">
                <span className="absolute left-4 right-4 top-3 h-0.5 rounded-full bg-border sm:left-[18px] sm:right-[18px] sm:top-[17px]" />
                <span
                  className="absolute left-4 top-3 h-0.5 rounded-full bg-primary transition-all duration-700 ease-out sm:left-[18px] sm:top-[17px]"
                  style={{
                    width: `calc(${(progressPct / 100).toFixed(2)} * (100% - 2rem))`,
                  }}
                />

                <ol className="relative flex items-start justify-between">
                  {STEPS.map((step, i) => {
                    const idx = i + 1;
                    const revealed = visibleStep >= idx;
                    return (
                      <li
                        key={idx}
                        className="flex w-10 shrink-0 flex-col items-center text-center sm:w-14"
                      >
                        <span
                          className={[
                            "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card transition-all duration-300 sm:h-9 sm:w-9",
                            revealed
                              ? step.state === "pending"
                                ? "border-destructive bg-destructive text-destructive-foreground shadow-sm shadow-destructive/30"
                                : step.state === "progress"
                                  ? "border-primary bg-card ring-4 ring-primary/15 shadow-sm shadow-primary/20"
                                  : "border-success bg-card shadow-sm shadow-success/20"
                              : "border-border bg-card",
                            revealed ? "animate-step-in" : "",
                          ].join(" ")}
                        >
                          {!revealed && (
                            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                          )}
                          {revealed && step.state === "done" && (
                            <CheckCircle2 className="h-[18px] w-[18px] text-success" />
                          )}
                          {revealed && step.state === "progress" && (
                            <Loader2 className="h-[18px] w-[18px] animate-spin text-primary" />
                          )}
                          {revealed && step.state === "pending" && (
                            <AlertTriangle className="h-[18px] w-[18px]" />
                          )}
                        </span>
                        <span
                          className={[
                            "mt-2 text-[9px] font-semibold leading-tight transition-colors sm:text-[11px]",
                            revealed
                              ? "text-foreground"
                              : "text-muted-foreground/50",
                          ].join(" ")}
                        >
                          {step.title}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* Active step detail */}
            <div className="mt-8 min-h-[110px] rounded-xl border bg-muted/30 p-5">
              {activeStep ? (
                <div className="animate-step-in">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {activeStep.state === "done" && (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      )}
                      {activeStep.state === "progress" && (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      )}
                      {activeStep.state === "pending" && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                      <p className="font-semibold text-foreground">
                        {activeStep.title}
                      </p>
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {activeStep.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {activeStep.desc}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {activeStep.location}
                  </p>
                </div>
              ) : (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verificando informações do pedido…
                </p>
              )}
            </div>

            {visibleStep < TOTAL_STEPS && visibleStep >= 1 && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verificando informações do pedido…
              </div>
            )}

            {visibleStep >= TOTAL_STEPS && (
              <>
                <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 animate-step-in">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Pendência que exige sua ação
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        Sua encomenda foi retida na fiscalização. Regularize a taxa
                        de importação para liberar a entrega.
                      </p>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="mt-4 w-full gap-2 animate-step-in">
                  <Link to="/pendencia">
                    Ver pendência do meu pedido
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Pagamento seguro · Ambiente criptografado
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Quanto antes a pendência for resolvida, mais rápido você recebe. A
          liberação é processada logo após a confirmação.
        </p>

        {/* Order summary at bottom */}
        <Card className="mt-6 shadow-elegant">
          <CardContent className="pt-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Pedido
                </p>
                <p className="font-mono text-sm font-semibold text-foreground">
                  #RMI-2841-0925
                </p>
              </div>
              <Badge variant="secondary" className="gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Em trânsito
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between gap-4">
              <div className="text-sm">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Truck className="h-3.5 w-3.5" /> Objeto
                </p>
                <p className="mt-0.5 font-mono font-medium text-foreground">
                  BR482193075PT
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Destino:</span>
                <span className="font-medium text-foreground">São Paulo · SP</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
