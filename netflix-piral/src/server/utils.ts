import { emptyApp, registerModule } from "piral-base";

export function extendSharedDependencies(dependencies: Record<string, string>) {
  for (const name of Object.keys(dependencies)) {
    if (!System.has(name)) {
      const dependency = dependencies[name];
      registerModule(name, () => System.import(dependency));
    }
  }
}

export function handleFailure(error: Error, link: string) {
  console.error("Failed to load SystemJS module", link, error);
  return emptyApp;
}

export function getUrlFromModule(targetModule: any) {
  for (const [url, sourceModule] of System.entries()) {
    if (sourceModule === targetModule) {
      return url;
    }
  }

  return "";
}

export function getUrlFromCb(baseUrl: string, cb: () => void) {
  const original = System.import;
  let link = "";
  System.import = (url: string) => {
    link = `${baseUrl}${url}`;
    return Promise.resolve(undefined);
  };
  cb();
  System.import = original;
  return link;
}
