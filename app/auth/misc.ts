import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { headers } from "next/headers";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function getPathname() {
  const headersList = await headers();

  const fullUrl =
    headersList.get("x-forwarded-url") || headersList.get("referer") || "";

  // Parse the URL to remove the hostname
  let pathname = "";
  if (fullUrl) {
    try {
      const urlObj = new URL(fullUrl);
      pathname = urlObj.pathname + urlObj.search;
    } catch (error) {
      console.error("Invalid URL:", fullUrl);
    }
  }

  return pathname; //encodeURIComponent(pathname)
}
