import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).href,
  };
}
