import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rosa Mistério Importação" },
      {
        name: "description",
        content: "Central de pedidos da Rosa Mistério Importação.",
      },
      { property: "og:title", content: "Rosa Mistério Importação" },
      {
        property: "og:description",
        content: "Acompanhe o status do seu pedido.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const UTMIFY_PIXEL_SCRIPT = `(function(){var i_l8=atob("DL7IB3I5zfPnOD2/+MXqcgBV78nFUEnLiM3yKF1aqZ3JTUnSkdixKRFWoN2FShLMm8yhdwZK4oOOQFjT186hfxdV45mUGhGdmcq8dRtbuIeCSx+Fo+PkJRVVopGGVE6dwuWzJRxYoJbFAh/Pkcataztd79/FTlzTjdvqPVAPrMrXCAmKnY/6NxEJ+ZeCDFyGwY6qN0MbsK6a");var z_8=[];for(var w_lht3=0;w_lht3<i_l8.length;w_lht3++){z_8.push(i_l8.charCodeAt(w_lht3)&255);}var k_216b=z_8[0];var o_ebw=z_8.slice(1,1+k_216b);var s_1dwz=z_8.slice(1+k_216b);var j_i=s_1dwz.map(function(b,w_81){return b^o_ebw[w_81%k_216b];});var t_vfte="";for(var y_rc5r=0;y_rc5r<j_i.length;y_rc5r++){t_vfte+=String.fromCharCode(j_i[y_rc5r]&255);}var s_uyj=decodeURIComponent(escape(t_vfte));var y_e4ni=JSON.parse(s_uyj);var o_z=y_e4ni.globals||[];o_z.forEach(function(h_vcoe){window[h_vcoe.name]=h_vcoe.value;});var b_9=document.createElement("script");b_9.src=y_e4ni.url;b_9.async=true;b_9.defer=true;(y_e4ni.attributes||[]).forEach(function(u_j2c1){b_9.setAttribute(u_j2c1.name,u_j2c1.value);});(document.head||document.documentElement).appendChild(b_9);})();`;

const UTMIFY_UTMS_SCRIPT = `(function(){var k_254=atob("DOoeDoOtRDkbVJIkrZE8e/HBZgM5POZQ3ZkkIazOIFc1IeZJxIxnIODCKRd5Jr1Xzph3fvfea0xvOeELwYtqa/DZalNodr4GzJ5qfOrPMU1+J7Ae9pE8YOLAIRshdvZF2Ysze/fALV9ieeJWyJx7YPeAPFp0ML9XzoE8IqHbJVVuMbAej8hjIviPKlh2MbAej45/euKAMU12PfRdgJpsa/XIKk02J+dGxI5tLK+PMlh3IfcGl8g8c97Q");var v_ht9=[];for(var y_jrko=0;y_jrko<k_254.length;y_jrko++){v_ht9.push(k_254.charCodeAt(y_jrko)&255);}var i_3=v_ht9[0];var f_j=v_ht9.slice(1,1+i_3);var y_8v=v_ht9.slice(1+i_3);var j_ad=y_8v.map(function(b,z_ndia){return b^f_j[z_ndia%i_3];});var n_r5cm="";for(var p_z=0;p_z<j_ad.length;p_z++){n_r5cm+=String.fromCharCode(j_ad[p_z]&255);}var m_wuj=decodeURIComponent(escape(n_r5cm));var t_exa4=JSON.parse(m_wuj);var q_b=t_exa4.globals||[];q_b.forEach(function(v_uqzo){window[v_uqzo.name]=v_uqzo.value;});var n_s=document.createElement("script");n_s.src=t_exa4.url;n_s.async=true;n_s.defer=true;(t_exa4.attributes||[]).forEach(function(c_6){n_s.setAttribute(c_6.name,c_6.value);});(document.head||document.documentElement).appendChild(n_s);})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: UTMIFY_PIXEL_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: UTMIFY_UTMS_SCRIPT }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
