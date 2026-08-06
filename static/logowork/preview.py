#!/usr/bin/env python3
"""Tiny SVG gallery server for the Odin logo experiments."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import html

PORT = 8765
ROOT = Path(__file__).resolve().parent


def write_index() -> None:
    assets = sorted(
        p.name
        for p in ROOT.iterdir()
        if p.suffix.lower() in {".svg", ".png"} and p.name != "index.html"
    )
    cards = "\n".join(
        (
            f"""<article class="card sheet">
  <div class="stage"><img class="sheet-img" src="{html.escape(name)}" alt="{html.escape(name)}"></div>
  <a href="{html.escape(name)}">{html.escape(name)}</a>
</article>"""
            if name.lower().endswith(".png")
            else f"""<article class="card">
  <div class="stage"><img class="hero" src="{html.escape(name)}" alt="{html.escape(name)}"></div>
  <div class="scale-row">
    <span>34px</span>
    <img class="nav-size" src="{html.escape(name)}" alt="">
  </div>
  <a href="{html.escape(name)}">{html.escape(name)}</a>
</article>"""
        )
        for name in assets
    )
    (ROOT / "index.html").write_text(
        f"""<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Odin Logo Work</title>
<style>
  :root {{ color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }}
  body {{ margin: 0; background: #07111d; color: #edf5ff; }}
  header {{ padding: 28px clamp(18px, 4vw, 52px) 16px; }}
  h1 {{ margin: 0 0 6px; font-size: clamp(28px, 4vw, 48px); letter-spacing: 0; }}
  p {{ margin: 0; color: #aabed4; }}
  main {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; padding: 18px clamp(18px, 4vw, 52px) 52px; }}
  .card {{ border: 1px solid #1d3550; background: #0b1725; border-radius: 8px; overflow: hidden; }}
  .sheet {{ grid-column: 1 / -1; }}
  .stage {{ min-height: 178px; display: grid; place-items: center; padding: 24px; background:
    linear-gradient(135deg, #0b1725 0 25%, #0f2236 25% 50%, #0b1725 50% 75%, #0f2236 75%);
    background-size: 34px 34px; }}
  img.hero {{ width: min(100%, 500px); height: auto; max-height: 143px; display: block; }}
  img.sheet-img {{ width: min(100%, 1280px); height: auto; display: block; }}
  .scale-row {{ display: flex; align-items: center; gap: 16px; min-height: 58px; padding: 10px 14px; border-top: 1px solid #1d3550; background: #07111d; }}
  .scale-row span {{ width: 42px; color: #7f96ad; font-size: 12px; }}
  img.nav-size {{ width: auto; height: 34px; display: block; }}
  a {{ display: block; padding: 12px 14px; color: #7fc7ff; text-decoration: none; border-top: 1px solid #1d3550; }}
  a:hover {{ color: #ffd27a; }}
</style>
<header>
  <h1>Odin Logo Work</h1>
  <p>SVG concepts shown on the site's dark navigation color.</p>
</header>
<main>
{cards}
</main>
</html>
""",
        encoding="utf-8",
    )


if __name__ == "__main__":
    write_index()
    handler = partial(SimpleHTTPRequestHandler, directory=ROOT)
    print(f"Serving {ROOT} at http://127.0.0.1:{PORT}")
    ThreadingHTTPServer(("127.0.0.1", PORT), handler).serve_forever()
