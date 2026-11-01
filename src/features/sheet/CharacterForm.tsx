import { useState, type FormEvent } from "react";
import {
  DIE_STEPS,
  ESTILOS,
  FAJIN_DIE_STEPS,
  MANOBRAS_ESPECIAIS,
  MANOBRAS_ESTILO,
  MANOBRA_DIE_STEPS,
  POSTURAS,
} from "../../../shared/schemas/options";
import type {
  FaJinDieStep,
  ManobraDieStep,
  ManobraEspecial,
} from "../../../shared/schemas/options";
import {
  characterDataSchema,
  type CharacterData,
} from "../../../shared/schemas/character";
import { sheetStrings } from "./strings";

const AUTH_KEYS = [
  "velocidade",
  "forca",
  "resistencia",
  "reflexo",
  "movimento",
  "yin",
  "yang",
] as const;
type AuthKey = (typeof AUTH_KEYS)[number];

interface FormState {
  name: string;
  imageUrl: string;
  autoridades: Record<AuthKey, string>;
  chiCurrent: string;
  chiMax: string;
  pranaCurrent: string;
  pranaMax: string;
  vidaCurrent: string;
  vidaMax: string;
  postura: string;
  estilo: string;
  manobraEstilo: string;
  manobrasEspeciais: ManobraEspecial[];
  manobraEstiloDie: string;
  manobraEspecialDie: string;
  faJinDie: string;
  notes: string;
}

function toFormState(data?: CharacterData): FormState {
  return {
    name: data?.name ?? "",
    imageUrl: data?.imageUrl ?? "",
    autoridades: {
      velocidade: data?.autoridades.velocidade ?? "1d6",
      forca: data?.autoridades.forca ?? "1d6",
      resistencia: data?.autoridades.resistencia ?? "1d6",
      reflexo: data?.autoridades.reflexo ?? "1d6",
      movimento: data?.autoridades.movimento ?? "1d6",
      yin: data?.autoridades.yin ?? "1d6",
      yang: data?.autoridades.yang ?? "1d6",
    },
    chiCurrent: String(data?.resources.chi.current ?? 0),
    chiMax: String(data?.resources.chi.max ?? 0),
    pranaCurrent: String(data?.resources.prana.current ?? 0),
    pranaMax: String(data?.resources.prana.max ?? 0),
    vidaCurrent: String(data?.resources.vida.current ?? 0),
    vidaMax: String(data?.resources.vida.max ?? 0),
    postura: data?.selections.postura ?? "falcao",
    estilo: data?.selections.estilo ?? "tempestade",
    manobraEstilo: data?.selections.manobraEstilo ?? "pular",
    manobrasEspeciais: [...(data?.selections.manobrasEspeciais ?? [])],
    manobraEstiloDie: data?.diceProgression.manobraEstilo ?? "1d4",
    manobraEspecialDie: data?.diceProgression.manobraEspecial ?? "1d4",
    faJinDie: data?.diceProgression.faJin ?? "1d4",
    notes: data?.notes ?? "",
  };
}

function toCharacterData(state: FormState): CharacterData {
  return {
    schemaVersion: 1,
    name: state.name.trim(),
    imageUrl: state.imageUrl.trim(),
    autoridades: state.autoridades as unknown as CharacterData["autoridades"],
    resources: {
      chi: { current: Number(state.chiCurrent), max: Number(state.chiMax) },
      prana: {
        current: Number(state.pranaCurrent),
        max: Number(state.pranaMax),
      },
      vida: {
        current: Number(state.vidaCurrent),
        max: Number(state.vidaMax),
      },
    },
    selections: {
      postura: state.postura as CharacterData["selections"]["postura"],
      estilo: state.estilo as CharacterData["selections"]["estilo"],
      manobraEstilo: state.manobraEstilo as CharacterData["selections"]["manobraEstilo"],
      manobrasEspeciais: state.manobrasEspeciais,
    },
    diceProgression: {
      manobraEstilo: state.manobraEstiloDie as ManobraDieStep,
      manobraEspecial: state.manobraEspecialDie as ManobraDieStep,
      faJin: state.faJinDie as FaJinDieStep,
    },
    notes: state.notes.trim() === "" ? undefined : state.notes.trim(),
  };
}

function ptIssueMessage(issue: {
  code: string;
  message: string;
  maximum?: number | bigint;
}): string {
  if (issue.code === "too_small") return "Preencha este campo.";
  if (issue.code === "too_big") return `Máximo de ${String(issue.maximum ?? "")} caracteres.`;
  if (issue.code === "invalid_enum_value") return "Selecione uma opção válida.";
  if (issue.code === "invalid_type") return "Valor inválido.";
  return issue.message;
}

interface CharacterFormProps {
  initial?: CharacterData;
  submitLabel: string;
  onSubmit: (data: CharacterData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  errorMessage: string | null;
}

export default function CharacterForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
  isSubmitting,
  errorMessage,
}: CharacterFormProps) {
  const [state, setState] = useState<FormState>(() => toFormState(initial));
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const s = sheetStrings;

  function update(patch: Partial<FormState>): void {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function toggleManobraEspecial(id: ManobraEspecial): void {
    setState((prev) => ({
      ...prev,
      manobrasEspeciais: prev.manobrasEspeciais.includes(id)
        ? prev.manobrasEspeciais.filter((m) => m !== id)
        : [...prev.manobrasEspeciais, id],
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const candidate = toCharacterData(state);
    const parsed = characterDataSchema.safeParse(candidate);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errors[issue.path.join(".")] = ptIssueMessage(issue);
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    onSubmit(parsed.data);
  }

  const err = (key: string) =>
    fieldErrors[key] ? (
      <span role="alert" className="sheetForm__error">
        {fieldErrors[key]}
      </span>
    ) : null;

  return (
    <form className="sheetForm" onSubmit={handleSubmit} noValidate>
      {errorMessage ? (
        <p role="alert" className="sheetForm__error sheetForm__error--global">
          {errorMessage}
        </p>
      ) : null}

      <fieldset className="sheetForm__section">
        <legend className="sheetForm__legend">{s.sectionIdentity}</legend>
        <label className="sheetForm__label" htmlFor="f-name">
          {s.name}
        </label>
        <input
          id="f-name"
          className="sheetForm__input"
          value={state.name}
          onChange={(e) => update({ name: e.target.value })}
          maxLength={80}
          required
        />
        {err("name")}

        <label className="sheetForm__label" htmlFor="f-image">
          {s.imageUrl}
        </label>
        <input
          id="f-image"
          className="sheetForm__input"
          value={state.imageUrl}
          onChange={(e) => update({ imageUrl: e.target.value })}
          placeholder="https://…"
        />
        {err("imageUrl")}
      </fieldset>

      <fieldset className="sheetForm__section">
        <legend className="sheetForm__legend">{s.sectionAutoridades}</legend>
        <div className="sheetForm__grid">
          {AUTH_KEYS.map((key) => (
            <div key={key}>
              <label className="sheetForm__label" htmlFor={`f-auth-${key}`}>
                {s.autoridades[key]}
              </label>
              <select
                id={`f-auth-${key}`}
                className="sheetForm__input"
                value={state.autoridades[key]}
                onChange={(e) =>
                  update({
                    autoridades: { ...state.autoridades, [key]: e.target.value },
                  })
                }
              >
                {DIE_STEPS.map((step) => (
                  <option key={step} value={step}>
                    {step}
                  </option>
                ))}
              </select>
              {err(`autoridades.${key}`)}
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="sheetForm__section">
        <legend className="sheetForm__legend">{s.sectionResources}</legend>
        <div className="sheetForm__grid">
          {(["chi", "prana", "vida"] as const).map((res) => (
            <div key={res} className="sheetForm__resourceRow">
              <span className="sheetForm__resourceName">{s.resources[res]}</span>
              <div>
                <label className="sheetForm__label" htmlFor={`f-${res}-cur`}>
                  {s.resources.current}
                </label>
                <input
                  id={`f-${res}-cur`}
                  type="number"
                  min={0}
                  className="sheetForm__input sheetForm__input--narrow"
                  value={state[`${res}Current` as keyof FormState] as string}
                  onChange={(e) => update({ [`${res}Current`]: e.target.value } as Partial<FormState>)}
                />
              </div>
              <div>
                <label className="sheetForm__label" htmlFor={`f-${res}-max`}>
                  {s.resources.max}
                </label>
                <input
                  id={`f-${res}-max`}
                  type="number"
                  min={0}
                  className="sheetForm__input sheetForm__input--narrow"
                  value={state[`${res}Max` as keyof FormState] as string}
                  onChange={(e) => update({ [`${res}Max`]: e.target.value } as Partial<FormState>)}
                />
              </div>
              {err(`resources.${res}.current`)}
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="sheetForm__section">
        <legend className="sheetForm__legend">{s.sectionSelections}</legend>

        <label className="sheetForm__label" htmlFor="f-postura">
          {s.postura}
        </label>
        <select
          id="f-postura"
          className="sheetForm__input"
          value={state.postura}
          onChange={(e) => update({ postura: e.target.value })}
        >
          {POSTURAS.map((p) => (
            <option key={p} value={p}>
              {s.labels.postura[p]}
            </option>
          ))}
        </select>

        <label className="sheetForm__label" htmlFor="f-estilo">
          {s.estilo}
        </label>
        <select
          id="f-estilo"
          className="sheetForm__input"
          value={state.estilo}
          onChange={(e) => update({ estilo: e.target.value })}
        >
          {ESTILOS.map((e) => (
            <option key={e} value={e}>
              {s.labels.estilo[e]}
            </option>
          ))}
        </select>

        <label className="sheetForm__label" htmlFor="f-manobra-estilo">
          {s.manobraEstilo}
        </label>
        <select
          id="f-manobra-estilo"
          className="sheetForm__input"
          value={state.manobraEstilo}
          onChange={(e) => update({ manobraEstilo: e.target.value })}
        >
          {MANOBRAS_ESTILO.map((m) => (
            <option key={m} value={m}>
              {s.labels.manobraEstilo[m]}
            </option>
          ))}
        </select>

        <span className="sheetForm__label">{s.manobrasEspeciais}</span>
        <div className="sheetForm__checks">
          {MANOBRAS_ESPECIAIS.map((m) => (
            <label key={m} className="sheetForm__check">
              <input
                type="checkbox"
                checked={state.manobrasEspeciais.includes(m)}
                onChange={() => toggleManobraEspecial(m)}
              />
              {s.labels.manobraEspecial[m]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="sheetForm__section">
        <legend className="sheetForm__legend">{s.sectionDice}</legend>
        <div className="sheetForm__grid">
          <div>
            <label className="sheetForm__label" htmlFor="f-die-manobra">
              {s.dice.manobraEstilo}
            </label>
            <select
              id="f-die-manobra"
              className="sheetForm__input"
              value={state.manobraEstiloDie}
              onChange={(e) => update({ manobraEstiloDie: e.target.value })}
            >
              {MANOBRA_DIE_STEPS.map((step) => (
                <option key={step} value={step}>
                  {step}
                </option>
              ))}
            </select>
            {err("diceProgression.manobraEstilo")}
          </div>
          <div>
            <label className="sheetForm__label" htmlFor="f-die-especial">
              {s.dice.manobraEspecial}
            </label>
            <select
              id="f-die-especial"
              className="sheetForm__input"
              value={state.manobraEspecialDie}
              onChange={(e) => update({ manobraEspecialDie: e.target.value })}
            >
              {MANOBRA_DIE_STEPS.map((step) => (
                <option key={step} value={step}>
                  {step}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="sheetForm__label" htmlFor="f-die-fajin">
              {s.dice.faJin}
            </label>
            <select
              id="f-die-fajin"
              className="sheetForm__input"
              value={state.faJinDie}
              onChange={(e) => update({ faJinDie: e.target.value })}
            >
              {FAJIN_DIE_STEPS.map((step) => (
                <option key={step} value={step}>
                  {step}
                </option>
              ))}
            </select>
            {err("diceProgression.faJin")}
          </div>
        </div>
      </fieldset>

      <fieldset className="sheetForm__section">
        <legend className="sheetForm__legend">{s.sectionNotes}</legend>
        <textarea
          className="sheetForm__input sheetForm__textarea"
          value={state.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder={s.notesPlaceholder}
          maxLength={2000}
        />
      </fieldset>

      <div className="sheetForm__actions">
        <button type="submit" className="sheetForm__submit" disabled={isSubmitting}>
          {isSubmitting ? s.saving : submitLabel}
        </button>
        <button
          type="button"
          className="sheetForm__cancel"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {s.cancel}
        </button>
      </div>
    </form>
  );
}
