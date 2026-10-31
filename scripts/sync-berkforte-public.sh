#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BERK="${BERKFORTE_ROOT:-$HOME/Downloads/berkforte.com}"

if [[ ! -d "$BERK/public/front" ]]; then
  echo "Missing $BERK/public/front — set BERKFORTE_ROOT" >&2
  exit 1
fi

rsync -a --delete "$BERK/public/front/" "$ROOT/public/front/"

if [[ -d "$BERK/public/temp" ]]; then
  rsync -a --delete "$BERK/public/temp/" "$ROOT/public/temp/"
fi

if [[ -d "$BERK/public/dash2" ]]; then
  rsync -a "$BERK/public/dash2/" "$ROOT/public/dash2/"
fi

if [[ -d "$BERK/public/dash" ]]; then
  rsync -a "$BERK/public/dash/" "$ROOT/public/dash/"
fi

mkdir -p "$ROOT/public/storage"
if [[ -d "$BERK/storage/app/public" ]]; then
  rsync -a "$BERK/storage/app/public/" "$ROOT/public/storage/"
fi

echo "Synced front/, temp/, dash2/, dash/, and storage/ from $BERK"
