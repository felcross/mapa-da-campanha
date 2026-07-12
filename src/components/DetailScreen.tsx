import { useState } from "react";
import type { Item, ElementalVariant } from "../data/categories";
import Accordion from "./Accordion";

interface DetailScreenProps {
  categoryLabel: string;
  item: Item;
}

function isEkuroVariant(v: ElementalVariant): v is import("../data/categories").EkuroVariant {
  return "benefits" in v;
}

function isWallVariantSet(v: ElementalVariant): v is import("../data/categories").WallVariantSet {
  return "tiers" in v;
}

export default function DetailScreen({ categoryLabel, item }: DetailScreenProps) {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const firstSpellLibrary = item.spellLibrary?.[0];
  const defaultElement = firstSpellLibrary?.name ?? null;
  const currentElement = activeElement ?? defaultElement;

  return (
    <div className="detail">
      {/* ── Header ── */}
      <div className="detail__header">
        <div className="detail__frame">
          <div className="detail__frameBar detail__frameBar--top" />
          <div className="detail__emblem">{item.glyph}</div>
          <div className="detail__frameBar detail__frameBar--bottom" />
        </div>
        <div className="detail__titleBlock">
          <span className="detail__eyebrow">{categoryLabel}</span>
          <h2 className="detail__name">{item.name}</h2>
          {item.fullTitle && <h3 className="detail__fullTitle">{item.fullTitle}</h3>}
          <p className="detail__tagline">{item.tagline}</p>
        </div>
      </div>

      <div className="detail__body">
        {/* ── Tags ── */}
        {item.tags?.length > 0 && (
          <div className="detail__tags">
            {item.tags.map((tag) => (
              <span key={tag} className="detail__tag">{tag}</span>
            ))}
          </div>
        )}

        {/* ── Description ── */}
        {item.description && (
          <p className="detail__description">{item.description}</p>
        )}

        {/* ── SubSections ── */}
        {item.subSections && item.subSections.length > 0 && (
          <div className="detail__subSections">
            {item.subSections.map((sub) => (
              <div key={sub.name} className="detail__subSection">
                <span className="detail__subSectionName">{sub.name}</span>
                <p className="detail__subSectionText">{sub.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Bonuses ── */}
        {item.bonuses && item.bonuses.length > 0 && (
          <div className="bonusRow">
            {item.bonuses.map((b) => (
              <div key={b.source} className="bonusChip">
                <span className="bonusChip__source">{b.source}</span>
                <span className="bonusChip__value">{b.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── School ── */}
        {item.school && (
          <div className="schoolCard">
            <h3 className="schoolCard__name">{item.school.name}</h3>
            <div className="schoolCard__grid">
              <div className="schoolCard__group">
                <span className="schoolCard__label">Perícias</span>
                <ul className="schoolCard__list">
                  {item.school.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="schoolCard__group">
                <span className="schoolCard__label">Equipamento</span>
                <ul className="schoolCard__list">
                  {item.school.equipment.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── Orders (sub-classes) ── */}
        {item.orders && item.orders.length > 0 && (
          <div className="orders">
            {item.orders.map((order) => (
              <div key={order.name} className="order">
                <div className="order__header">
                  <span className="order__glyph">{order.glyph}</span>
                  <h3 className="order__name">{order.name}</h3>
                </div>
                {order.description.split("\n\n").map((para, pi) => (
                  <p key={pi} className="order__desc">{para}</p>
                ))}
                {order.techniques.length > 0 && (
                  <div className="techniques">
                    <Accordion
                      items={order.techniques.map((t) => ({
                        key: `tech-${order.name}-${t.level}`,
                        label: t.title,
                        sealLabel: t.levelLabel,
                        content: (
                          <div className="techniques__level">
                            <p className="techniques__intro">{t.intro}</p>
                            <div className="techniques__effects">
                              {t.effects.map((ef) => (
                                <div key={ef.name} className="techniques__effect">
                                  <span className="techniques__effectName">{ef.name}</span>
                                  <p className="techniques__effectText">{ef.text}</p>
                                  {ef.subEffects && ef.subEffects.length > 0 && (
                                    <div className="techniques__subEffects">
                                      {ef.subEffects.map((se) => (
                                        <div key={se.name} className="techniques__subEffect">
                                          <span className="techniques__effectName">{se.name}</span>
                                          <p className="techniques__effectText">{se.text}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      }))}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Techniques (standalone, for non-order items) ── */}
        {!item.orders && item.techniques && item.techniques.length > 0 && (
          <div className="techniques">
            <Accordion
              items={item.techniques.map((t) => ({
                key: `tech-${t.level}`,
                label: t.title,
                sealLabel: t.levelLabel,
                content: (
                  <div className="techniques__level">
                    <p className="techniques__intro">{t.intro}</p>
                    <div className="techniques__effects">
                      {t.effects.map((ef) => (
                        <div key={ef.name} className="techniques__effect">
                          <span className="techniques__effectName">{ef.name}</span>
                          <p className="techniques__effectText">{ef.text}</p>
                          {ef.subEffects && ef.subEffects.length > 0 && (
                            <div className="techniques__subEffects">
                              {ef.subEffects.map((se) => (
                                <div key={se.name} className="techniques__subEffect">
                                  <span className="techniques__effectName">{se.name}</span>
                                  <p className="techniques__effectText">{se.text}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {t.subAbilities && t.subAbilities.length > 0 && (
                      <div className="techniques__subAbilities">
                        <Accordion
                          items={t.subAbilities.map((sa) => ({
                            key: `sa-${t.level}-${sa.name}`,
                            label: sa.name,
                            content: (
                              <div>
                                <p className="techniques__effectText">{sa.text}</p>
                                {sa.categories && sa.categories.length > 0 && (
                                  <ul className="schoolCard__list">
                                    {sa.categories.map((c) => (
                                      <li key={c.name}>
                                        <strong>{c.name}:</strong> {c.examples}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ),
                          }))}
                        />
                      </div>
                    )}
                  </div>
                ),
              }))}
            />
          </div>
        )}

        {/* ── Upkeep ── */}
        {item.upkeep && (
          <div className="upkeepCard">
            <p>{item.upkeep.text}</p>
          </div>
        )}

        {/* ── Resource ── */}
        {item.resource && (
          <div className="resourceCard">
            <h3 className="resourceCard__name">{item.resource.name}</h3>
            <p className="resourceCard__desc">{item.resource.description}</p>
            {item.resource.progression && item.resource.progression.length > 0 && (
              <table className="resourceCard__table">
                <thead>
                  <tr>
                    <th>Nível</th>
                    <th>Custo</th>
                  </tr>
                </thead>
                <tbody>
                  {item.resource.progression.map((p) => (
                    <tr key={p.level}>
                      <td>{p.level}</td>
                      <td>{p.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {item.resource.methods && item.resource.methods.length > 0 && (
              <div className="resourceCard__methods">
                {item.resource.methods.map((m) => (
                  <div key={m.name} className="resourceCard__method">
                    <span className="resourceCard__methodType">{m.type}</span>
                    <span className="resourceCard__methodName">{m.name}</span>
                    <p className="resourceCard__methodText">{m.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Difficulty ── */}
        {item.difficulty && (
          <div className="difficultyCard">
            <p className="difficultyCard__formula">{item.difficulty.formula}</p>
            {item.difficulty.description && (
              <p className="difficultyCard__desc">{item.difficulty.description}</p>
            )}
            {item.difficulty.table && item.difficulty.table.length > 0 && (
              <table className="difficultyCard__table">
                <thead>
                  <tr>
                    <th>Nível</th>
                    <th>NA</th>
                  </tr>
                </thead>
                <tbody>
                  {item.difficulty.table.map((d) => (
                    <tr key={d.level}>
                      <td>{d.level}</td>
                      <td>{d.na}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── Domains ── */}
        {item.domains && item.domains.length > 0 && (
          <div className="domains">
            <Accordion
              items={item.domains.map((d) => ({
                key: `domain-${d.name}`,
                label: d.name,
                sealLabel: d.sealLabel,
                content: (
                  <div className="domains__constellations">
                    {d.constellations.map((c) => (
                      <div key={c.name} className="domains__constellation">
                        <h4 className="domains__constellationName">{c.name}</h4>
                        <p className="domains__constellationSummary">{c.summary}</p>
                        <div className="domains__constellationFields">
                          {Object.entries(c.fields).map(([key, val]) => (
                            <div key={key} className="domains__field">
                              <span className="domains__fieldKey">{key}:</span> {val}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              }))}
            />
          </div>
        )}

        {/* ── Elemental Variants ── */}
        {item.elementalVariants && item.elementalVariants.length > 0 && (
          <div className="variantsGrid">
            {item.elementalVariants.map((variant) => {
              if (isEkuroVariant(variant)) {
                return (
                  <div key={variant.name} className="variantCard">
                    <h4 className="variantCard__name">{variant.name}</h4>
                    <p className="variantCard__desc">{variant.description}</p>
                    {variant.benefits && variant.benefits.length > 0 && (
                      <div className="variantCard__benefits">
                        {variant.benefits.map((b) => (
                          <div key={b.name} className="variantCard__benefit">
                            <strong>{b.name}:</strong> {b.text}
                          </div>
                        ))}
                      </div>
                    )}
                    {variant.variants && variant.variants.length > 0 && (
                      <div className="variantCard__items">
                        {variant.variants.map((v) => (
                          <div key={v.name} className="variantCard__item">
                            <span className="variantCard__element">{v.element}</span>
                            <span className="variantCard__name">{v.name}</span>
                            <span className="variantCard__stats">
                              Alcance: {v.range} | Dano: {v.damage}
                            </span>
                            {v.special && (
                              <p className="variantCard__desc">{v.special}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (isWallVariantSet(variant)) {
                return (
                  <div key={variant.name} className="variantCard">
                    <h4 className="variantCard__name">{variant.name}</h4>
                    <p className="variantCard__desc">{variant.description}</p>
                    {variant.tiers.map((tier) => (
                      <div key={tier.name} className="variantCard__tier">
                        <h5 className="variantCard__tierName">{tier.name}</h5>
                        <div className="variantCard__stats">
                          <div>Anel: {tier.stats.ring}</div>
                          <div>Alcance: {tier.stats.range}</div>
                          <div>Área: {tier.stats.area}</div>
                          <div>Duração: {tier.stats.duration}</div>
                          <div>Incrementos: {tier.stats.increments}</div>
                        </div>
                        {tier.variants.map((v) => (
                          <div key={v.name} className="variantCard__wallVariant">
                            <span className="variantCard__element">{v.element}</span>
                            <span className="variantCard__name">{v.name}</span>
                            <p className="variantCard__desc">{v.description}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* ── Tattoos (accordion) ── */}
        {item.tattoos && item.tattoos.length > 0 && (
          <div className="tattoos">
            <Accordion
              items={[{
                key: "tattoos",
                label: `Tatuagens Místicas (${item.tattoos.length})`,
                content: (
                  <>
                    <p className="tattoos__subtitle">
                      Ativadas como Ações Livres. Apenas uma tatuagem pode ficar ativa por vez
                      (as Passivas não impedem outras ativações). Efeitos ativos duram um número
                      de rodadas igual ao Nível de Escola x 2. Devem estar expostas.
                    </p>
                    <div className="tattoos__grid">
                      {item.tattoos.map((t) => (
                        <div key={t.name} className="tattooCard">
                          <span className="tattooCard__name">{t.name}</span>
                          <p className="tattooCard__desc">{t.description}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ),
              }]}
            />
          </div>
        )}

        {/* ── Rule Sections ── */}
        {item.ruleSections && item.ruleSections.length > 0 && (
          <div className="ruleSections">
            {item.ruleSections.map((section, i) => (
              <div key={i} className="ruleSection">
                {section.title && (
                  <h4 className="ruleSection__title">{section.title}</h4>
                )}
                {section.text && (
                  <p className="ruleSection__text">{section.text}</p>
                )}
                {section.items && section.items.length > 0 && (
                  <ul className="ruleSection__list">
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <table className="ruleSection__table">
                    <thead>
                      <tr>
                        {section.table.headers.map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Spell Library ── */}
        {item.spellLibrary && item.spellLibrary.length > 0 && (
          <div className="spellLibrary">
            <div className="spellLibrary__tabs">
              {item.spellLibrary.map((lib) => (
                <button
                  key={lib.name}
                  type="button"
                  className={`spellLibrary__tab ${currentElement === lib.name ? "spellLibrary__tab--active" : ""}`}
                  onClick={() => setActiveElement(lib.name)}
                >
                  <span className="spellLibrary__tabSeal">{lib.seal}</span>
                  {lib.name}
                </button>
              ))}
            </div>
            {item.spellLibrary.map((lib) =>
              currentElement === lib.name ? (
                <div key={lib.name} className="spellLibrary__levels">
                  <Accordion
                    items={lib.levels.map((lvl) => ({
                      key: `spell-level-${lib.name}-${lvl.level}`,
                      label: `Nível ${lvl.level}`,
                      sealLabel: `${lvl.level}`,
                      content: (
                        <div className="spellLibrary__spells">
                          {lvl.spells.map((spell) => (
                            <div key={spell.name} className="spellLibrary__spell">
                              <h4 className="spellLibrary__spellName">{spell.name}</h4>
                              <div className="spellLibrary__spellMeta">
                                <span>Anel: {spell.ring}</span>
                                <span>Alcance: {spell.range}</span>
                                <span>Área: {spell.area}</span>
                                <span>Duração: {spell.duration}</span>
                              </div>
                              {spell.increments && spell.increments.length > 0 && (
                                <div className="spellLibrary__spellIncrements">
                                  Incrementos: {spell.increments.join(", ")}
                                </div>
                              )}
                              <p className="spellLibrary__spellEffect">{spell.effect}</p>
                            </div>
                          ))}
                        </div>
                      ),
                    }))}
                  />
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
