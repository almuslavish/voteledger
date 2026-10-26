export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const requestUrl = new URL(request.url);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
    const requestHost = forwardedHost || request.headers.get("host");
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
    const protocol = forwardedProtocol || requestUrl.protocol.slice(0, -1);
    const hostOrigin = requestHost ? new URL(`${protocol}://${requestHost}`).origin : requestUrl.origin;
    const requestOrigin = new URL(origin).origin;
    return requestOrigin === requestUrl.origin || requestOrigin === hostOrigin;
  } catch {
    return false;
  }
}