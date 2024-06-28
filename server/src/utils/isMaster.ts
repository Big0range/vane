export const isMaster =
  process.env.locale_start === 'true' || process.env.NODE_APP_INSTANCE === '0';
