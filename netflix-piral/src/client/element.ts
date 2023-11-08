import { PiletApi } from "piral-base/minimal";
import { patchState } from "./state";
import { hydrate, render } from "./hydrate";
import { renderFragment } from "./network";
import { ComponentReference, PiralClientState } from "./types";

async function mount(
  element: Element,
  component: ComponentReference,
  load: () => Promise<void>
) {
  switch (component.client) {
    case "idle":
      requestIdleCallback(load);
      break;
    case "load":
      await load();
      break;
    case "visible":
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            load();
            observer.disconnect();
          }
        });
      });

      Array.from(element.children).forEach((child) => observer.observe(child));
      break;
  }
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export function createCustomElements(state: PiralClientState, api: PiletApi) {
  class PiralSlot extends HTMLElement {
    private interactive = false;

    private get name() {
      return this.getAttribute("name");
    }

    private set name(value: string) {
      this.setAttribute("name", value);
    }

    private get group() {
      return this.getAttribute("group");
    }

    private set group(value: string) {
      this.setAttribute("group", value);
    }

    private get parameters() {
      return JSON.parse(this.getAttribute("params"));
    }

    async connectedCallback() {
      await delay();

      const prepared = !this.group.startsWith('client-');

      if (prepared) {
        await Promise.all(
          Array.from(
            this.querySelectorAll(`piral-component[group="${this.group}"]`)
          ).map(async (element) => {
            const componentId = element.getAttribute("cid");
            const data = JSON.parse(element.getAttribute("data"));
            const component = state.components[componentId];
            await mount(element, component, async () => {
              const mod = await System.import(component.script);
              const params = this.parameters;
  
              if (component.server === "load") {
                hydrate(element, mod.default, api, params, data);
              } else {
                render(element, mod.default, api, params, data);
              }
            });
          })
        );
      } else {
        await this.setupChildren();
      }

      this.interactive = true;
    }

    disconnectedCallback() {
      // just make sure to remove everything
      this.innerHTML = "";
      this.interactive = false;
    }

    async attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ) {
      if (this.interactive) {
        if (name === "params") {
          await delay();
          this.dispatchEvent(
            new CustomEvent("params-changed", { detail: this.parameters })
          );
        } else if (name === "name" && newValue !== oldValue) {
          // this is a worst-case scenario, we need to throw away everything
          this.innerHTML = "";

          if (newValue) {
            this.rerender();
          }
        }
      }
    }

    async rerender() {
      this.interactive = false;
      await this.setupChildren();
      this.interactive = true;
    }

    async setupChildren() {
      const html = await renderFragment(this.name, this.parameters);
      this.outerHTML = html;
      patchState(state);
    }

    static get observedAttributes() {
      return ["name", "params"];
    }
  }

  customElements.define("piral-slot", PiralSlot);
}
