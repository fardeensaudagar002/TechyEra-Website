"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";
import { SocialIcon } from "./SocialIcons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-ink">Share</span>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn (opens in a new tab)">
        <SocialIcon name="linkedin" className="h-4 w-4" />
      </a>
      <a className={btn} href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X (opens in a new tab)">
        <SocialIcon name="x" className="h-4 w-4" />
      </a>
      <a className={btn} href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email">
        <Mail aria-hidden className="h-4 w-4" />
      </a>
      <button type="button" className={btn} onClick={copy} aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check aria-hidden className="h-4 w-4 text-success" /> : <Link2 aria-hidden className="h-4 w-4" />}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? "Link copied to clipboard" : ""}</span>
    </div>
  );
}
