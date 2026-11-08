import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ClassesView from "./ClassesView";

function selecionarCategoria(rotulo: RegExp) {
  fireEvent.click(screen.getByRole("button", { name: /Categoria/ }));
  fireEvent.click(screen.getByRole("option", { name: rotulo }));
}

describe("ClassesView — auto-open da Introdução", () => {
  it("abre a Introdução da classe ao selecionar Kowloon Fighters", () => {
    render(<ClassesView onBack={() => {}} />);
    expect(screen.getByText(/Selecione uma categoria e um item/)).toBeInTheDocument();
    selecionarCategoria(/Kowloon Fighters/);
    expect(screen.queryByText(/Selecione uma categoria e um item/)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Lutadores de Kowloon\. Fonte de poder: Qi\./),
    ).toBeInTheDocument();
    expect(screen.getByText(/Feitiçaria Tai Chi Kyūryū e Os Nove Dragões/)).toBeInTheDocument();
  });

  it("abre a Introdução dos arquétipos ao selecionar Arquétipos", () => {
    render(<ClassesView onBack={() => {}} />);
    selecionarCategoria(/Arquétipos/);
    expect(screen.getByText(/1\.1\. Escolha de Arquétipos/)).toBeInTheDocument();
  });

  it("mantém o placeholder em categoria sem Introdução", () => {
    render(<ClassesView onBack={() => {}} />);
    selecionarCategoria(/Glossário/);
    expect(screen.getByText(/Selecione uma categoria e um item/)).toBeInTheDocument();
  });
});
