import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ComponentProps } from "react";
import HubScreen from "./HubScreen";
// [PAUSADO — Character Sheet] import { AuthProvider } from "../../features/auth/useAuth";

function renderHub(props: Partial<ComponentProps<typeof HubScreen>> = {}) {
  return render(<HubScreen onSelectClasses={() => {}} {...props} />);
}

describe("HubScreen (smoke — comportamento existente preservado)", () => {
  it("renderiza título e card do Compêndio", () => {
    renderHub();
    expect(screen.getByText("AS SEIS HARMONIAS")).toBeInTheDocument();
    expect(screen.getByText("Compêndio")).toBeInTheDocument();
  });

  it("sem sheetEntry não mostra o card de criador (flag off)", () => {
    renderHub();
    expect(screen.queryByText("Criador de Personagem")).not.toBeInTheDocument();
  });

  // [PAUSADO — Character Sheet]
  // it("com sheetEntry mostra o card e chama onSelect ao clicar", () => {
  //   const onSelect = vi.fn();
  //   renderHub({ sheetEntry: { onSelect } });
  //   expect(screen.getByText("Criador de Personagem")).toBeInTheDocument();
  //   fireEvent.click(screen.getByText("Criador de Personagem"));
  //   expect(onSelect).toHaveBeenCalledTimes(1);
  // });

  it("clique no Compêndio chama onSelectClasses", () => {
    const onSelectClasses = vi.fn();
    renderHub({ onSelectClasses });
    fireEvent.click(screen.getByText("Compêndio"));
    expect(onSelectClasses).toHaveBeenCalledTimes(1);
  });

  it("sem sessão não mostra o botão Sair", () => {
    renderHub();
    expect(screen.queryByText("Sair")).not.toBeInTheDocument();
  });

  // [PAUSADO — Character Sheet]
  // it("com sessão mostra Sair e desloga mesmo sem rede", async () => {
  //   const clearAuth = vi.fn();
  //   render(
  //     <AuthProvider
  //       user={{ id: "u1", email: "kaito@exemplo.com", role: "player" }}
  //       setAuth={() => {}}
  //       clearAuth={clearAuth}
  //     >
  //       <HubScreen onSelectClasses={() => {}} />
  //     </AuthProvider>,
  //   );
  //   expect(screen.getByText("Sair")).toBeInTheDocument();
  //   fireEvent.click(screen.getByText("Sair"));
  //   await vi.waitFor(() => expect(clearAuth).toHaveBeenCalledTimes(1));
  // });
});
