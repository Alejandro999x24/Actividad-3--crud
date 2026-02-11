export const enviroments = {
  dev: '.env',
  stg: '.stg.env',
  prod: '.prod,env',
} as const;

export type EnvKey = keyof typeof enviroments;
