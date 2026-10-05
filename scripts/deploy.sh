#!/usr/bin/env bash
# Upload an already-built dist/, then validate and activate it on the server.
set -euo pipefail
cd "$(dirname "$0")/.."

SSH_HOST="${SSH_HOST:?Set SSH_HOST to the deployment SSH destination}"
RELEASE_ID="${RELEASE_ID:-$(date -u +%Y%m%dT%H%M%SZ)-$(git rev-parse --short=12 HEAD)}"
[[ "$SSH_HOST" =~ ^[a-zA-Z0-9_@.-]+$ && "$SSH_HOST" != -* ]] || { echo 'Invalid SSH_HOST' >&2; exit 1; }
[[ "$RELEASE_ID" =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{0,100}$ ]] || { echo 'Invalid RELEASE_ID' >&2; exit 1; }
for file in index.html zh/index.html 404.html; do
  test -s "dist/$file" || { echo "Missing dist/$file; run npm run build" >&2; exit 1; }
done
mkdir -p dist/.well-known
printf '%s\n' "$RELEASE_ID" > dist/.well-known/deployment.txt

ssh -o BatchMode=yes "$SSH_HOST" "bash -s -- prepare $RELEASE_ID" < scripts/release.sh
rsync -az --delete -e 'ssh -o BatchMode=yes' dist/ "$SSH_HOST:/var/www/konakona.dev/releases/$RELEASE_ID/"
ssh -o BatchMode=yes "$SSH_HOST" "bash -s -- activate $RELEASE_ID" < scripts/release.sh
printf 'Deployed %s: https://konakona.dev\n' "$RELEASE_ID"
