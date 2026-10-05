#!/usr/bin/env bash
# Runs on the Linux origin through SSH; never needs sudo.
set -euo pipefail
SITE_ROOT=/var/www/konakona.dev
ACTION="${1:?Expected prepare, activate, or rollback}"
RELEASE_ID="${2:?Expected release ID}"
[[ "$RELEASE_ID" =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{0,100}$ ]] || exit 1
cd "$SITE_ROOT"

if [[ "$ACTION" == prepare ]]; then
  # A reused ID must never overwrite a live or historical release.
  mkdir "releases/$RELEASE_ID"
  exit 0
fi
[[ "$ACTION" == activate || "$ACTION" == rollback ]] || exit 1
exec 9> .deploy.lock
flock -w 120 9
for file in index.html zh/index.html 404.html .well-known/deployment.txt; do
  test -s "releases/$RELEASE_ID/$file"
done
[[ "$(cat "releases/$RELEASE_ID/.well-known/deployment.txt")" == "$RELEASE_ID" ]]

PREVIOUS=$(readlink current || true)
SWITCHED=0
restore_on_failure() {
  local status=$?
  if (( status != 0 && SWITCHED == 1 )); then
    if [[ -n "$PREVIOUS" ]]; then
      ln -s "$PREVIOUS" ".current-restore-$$"
      mv -Tf ".current-restore-$$" current
    else
      rm -f current
    fi
    echo 'HTTPS verification failed; restored the previous release.' >&2
  fi
  exit "$status"
}
trap restore_on_failure EXIT
ln -s "releases/$RELEASE_ID" ".current-next-$$"
mv -Tf ".current-next-$$" current
SWITCHED=1

# The uncached marker proves that HTTPS reaches this exact release.
marker=$(curl --fail --silent --show-error --connect-timeout 10 --max-time 30 \
  "https://konakona.dev/.well-known/deployment.txt?release=$RELEASE_ID")
[[ "$marker" == "$RELEASE_ID" ]]
for path in / /zh/; do
  status=$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' \
    --connect-timeout 10 --max-time 30 "https://konakona.dev$path")
  [[ "$status" == 200 ]]
done
trap - EXIT

# Keep the newest five directories, plus the active and previous releases.
# Failed uploads count toward retention but can never evict these two.
while IFS= read -r old; do
  [[ "$old" == "releases/$RELEASE_ID" || "$old" == "$PREVIOUS" ]] && continue
  rm -rf -- "$old"
done < <(find releases -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
  | sort -nr | tail -n +6 | cut -d' ' -f2-)
