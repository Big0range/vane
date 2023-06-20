export function isPrivateIP(ip: string) {
  const parts = ip.split('.');
  const first = parseInt(parts[0]);
  const second = parseInt(parts[1]);

  if (first === 10) {
    return true;
  } else if (first === 172 && second >= 16 && second <= 31) {
    return true;
  } else if (first === 192 && parts[1] === '168') {
    return true;
  } else if (ip === '127.0.0.1') {
    return true;
  } else {
    return false;
  }
}
