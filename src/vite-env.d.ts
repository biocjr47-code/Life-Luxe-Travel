/// <reference types="vite/client" />

/** `?url` imports return the emitted asset path as a string. */
declare module "*.css?url" {
  const url: string;
  export default url;
}
