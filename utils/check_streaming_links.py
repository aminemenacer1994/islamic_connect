#!/usr/bin/env python3
"""Batch-verify streaming URLs from resources/js/components/streaming.json."""

from __future__ import annotations

import concurrent.futures
import json
import sys
from pathlib import Path
from typing import Iterable

import requests


JSON_PATH = Path("resources/js/components/streaming.json")


def load_entries(path: Path) -> Iterable[dict]:
    return json.loads(path.read_text())


def check_url(url: str) -> tuple[str, bool, str]:
    """Return (url, success, reason)."""
    try:
        response = requests.head(url, timeout=5, allow_redirects=True)
        if response.status_code >= 400:
            return url, False, f"{response.status_code} {response.reason}"
        return url, True, f"{response.status_code} {response.reason}"
    except Exception as exc:  # coverage: ignore
        return url, False, f"{type(exc).__name__}: {exc}"


def all_urls(entry: dict) -> list[str]:
    keys = ["youtubeChannel", "websiteUrl", "playlistUrl", "postUrl", "videoUrl"]
    return [entry.get(key) for key in keys if entry.get(key)]


def main() -> int:
    if not JSON_PATH.exists():
        print(f"Missing expected file: {JSON_PATH}", file=sys.stderr)
        return 1

    entries = load_entries(JSON_PATH)
    urls = []
    for entry in entries:
        urls.extend(all_urls(entry))

    print(f"Checking {len(urls)} URLs from {JSON_PATH}")

    failures: list[tuple[str, str]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        for url, success, reason in executor.map(check_url, urls):
            status = "OK" if success else "FAIL"
            print(f"{status}: {url} ({reason})")
            if not success:
                failures.append((url, reason))

    if failures:
        print(f"\n{len(failures)} URL(s) failed (see above).")
        return 2

    print("\nAll URLs returned success codes.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
