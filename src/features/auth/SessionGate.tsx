import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { apiGet, setUnauthorizedHandler } from "../../api/client";
import { strings } from "./strings";
import { AuthProvider } from "./useAuth";
import type { AuthUser, MeResponse } from "./types";

const LoginScreen = lazy(() => import("./LoginScreen"));
const VerifyScreen = lazy(() => import("./VerifyScreen"));

type GatePhase =
  | { phase: "checking" }
  | { phase: "login" }
  | { phase: "verify"; token: string }
  | { phase: "authed" };

function Splash() {
  return (
    <main className="auth">
      <div className="auth__card auth__card--centered">
        <p className="auth__subtitle">{strings.auth.loading}</p>
      </div>
    </main>
  );
}

interface SessionGateProps {
  children: ReactNode;
}

export default function SessionGate({ children }: SessionGateProps) {
  const [gate, setGate] = useState<GatePhase>(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    return token ? { phase: "verify", token } : { phase: "checking" };
  });
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (gate.phase !== "checking") return;
    let cancelled = false;
    apiGet<MeResponse>("/auth/me")
      .then((res) => {
        if (cancelled) return;
        setUser(res.user);
        setGate({ phase: "authed" });
      })
      .catch(() => {
        if (!cancelled) setGate({ phase: "login" });
      });
    return () => {
      cancelled = true;
    };
  }, [gate.phase]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      setGate({ phase: "login" });
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  function handleAuthenticated(next: AuthUser): void {
    setUser(next);
    setGate({ phase: "authed" });
  }

  function handleClearAuth(): void {
    setUser(null);
    setGate({ phase: "login" });
  }

  return (
    <AuthProvider user={user} setAuth={handleAuthenticated} clearAuth={handleClearAuth}>
      {gate.phase === "authed" ? (
        children
      ) : (
        <Suspense fallback={<Splash />}>
          {gate.phase === "checking" && <Splash />}
          {gate.phase === "login" && <LoginScreen />}
          {gate.phase === "verify" && (
            <VerifyScreen
              token={gate.token}
              onAuthenticated={handleAuthenticated}
              onRequestNewLink={() => setGate({ phase: "login" })}
            />
          )}
        </Suspense>
      )}
    </AuthProvider>
  );
}
