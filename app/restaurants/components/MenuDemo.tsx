"use client";

import { useState } from "react";
import type { MenuSample } from "../data";

type MenuDemoProps = {
  sample: MenuSample;
};

export default function MenuDemo({ sample }: MenuDemoProps) {
  const categories = Object.keys(sample.categories);
  const [cat, setCat] = useState(categories[0] ?? "");
  const items = sample.categories[cat] ?? [];

  return (
    <div className="r-phone">
      <div className="r-phone-bar" aria-hidden>
        <span>9:41</span>
        <span className="r-phone-island" />
        <span>100%</span>
      </div>
      <div className="r-menu-head">{sample.name}</div>
      <div className="r-menu-tabs" role="tablist">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={cat === name}
            className={`r-menu-tab${cat === name ? " is-active" : ""}`}
            onClick={() => setCat(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="r-menu-items">
        {items.map((item) => (
          <div key={item.name} className="r-menu-item">
            <div className="r-mi-top">
              <span>{item.name}</span>
              <span className="r-mi-price">${item.price}</span>
            </div>
            <p className="r-mi-desc">{item.desc}</p>
            <div className="r-mi-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="r-mi-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
