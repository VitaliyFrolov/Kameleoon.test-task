export function urlFormatter(url: string | undefined) {
  if (!url) return;

  return url.replace(/(https?:\/\/)?(www\.)?([^.]+)\.(company\.com)/, (_match, _protocol, _www, subdomain, domain) => {
      if (subdomain === 'delivery') {
        return 'delivery.com';
      }
      return `${subdomain}.${domain}`;
  });
}