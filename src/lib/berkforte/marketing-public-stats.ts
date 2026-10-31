/** Added to live DB user count for public counters (home + /statistic). */
export const MARKETING_USER_OFFSET = 318_500;

/** Minimum users shown when DB stats are missing or zero. */
export const MARKETING_TOTAL_USERS_FALLBACK = MARKETING_USER_OFFSET;

/** Deposits / withdrawals offsets (USD) for marketing stats page. */
export const MARKETING_DEPOSITS_OFFSET = 338_400_989;
export const MARKETING_WITHDRAWALS_OFFSET = 101_689_885;

/** Platform “days online” — fixed launch date so the number grows daily. */
const PLATFORM_LAUNCH = new Date("2012-08-15T12:00:00Z");

export function getMarketingDaysOnline(now: Date = new Date()): number {
  return Math.max(
    0,
    Math.floor((now.getTime() - PLATFORM_LAUNCH.getTime()) / 86_400_000),
  );
}

export function getMarketingTotalUsers(
  liveUserCount: number | null | undefined,
): number {
  const live = liveUserCount ?? 0;
  return Math.max(live + MARKETING_USER_OFFSET, MARKETING_TOTAL_USERS_FALLBACK);
}

export function formatMarketingUsersDisplay(totalUsers: number): string {
  return `${totalUsers.toLocaleString("en-US")}+`;
}

export function formatMarketingDaysDisplay(days: number): string {
  return days.toLocaleString("en-US");
}
