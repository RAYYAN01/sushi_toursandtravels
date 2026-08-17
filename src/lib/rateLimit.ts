type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Checks if a given IP has exceeded the allowed request limit within the window windowMs.
 * @param ip The IP address of the client
 * @param limit Max allowed requests within windowMs
 * @param windowMs Time window in milliseconds
 */
export function rateLimit(
  ip: string,
  limit: number,
  windowMs: number
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    const newRecord = { count: 1, resetTime: now + windowMs };
    rateLimitMap.set(ip, newRecord);
    return { success: true, limit, remaining: limit - 1, reset: newRecord.resetTime };
  }

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return { success: true, limit, remaining: limit - 1, reset: record.resetTime };
  }

  record.count += 1;
  if (record.count > limit) {
    return { success: false, limit, remaining: 0, reset: record.resetTime };
  }

  return { success: true, limit, remaining: limit - record.count, reset: record.resetTime };
}

/**
 * Helper to retrieve the client's IP address from incoming request headers.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
