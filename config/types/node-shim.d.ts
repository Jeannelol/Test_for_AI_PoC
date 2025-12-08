declare module 'path' {
  const anyPath: any;
  export = anyPath;
}

declare module 'url' {
  export function fileURLToPath(url: string | URL): string;
}

declare const __dirname: string;
