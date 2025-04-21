#!/bin/bash
set -e

# ─────────────────────────────────────────────────────────────────────────────
# 0. Free up DFX’s default HTTP port (4943) if something else grabbed it.
#    This avoids “Address already in use” errors.
echo "→ Checking port 4943…"
if lsof -i tcp:4943 &>/dev/null; then
  PID=$(lsof -t -i tcp:4943)
  echo "→ Killing process $PID on port 4943"
  kill -9 "$PID" || true
fi

# 1. Stop any existing DFX replica (ignore errors if none)
dfx stop || true

# 2. Start fresh
dfx start --background --clean

# 3. Create/use a non‑encrypted identity
IDENTITY="user1_noenc"
if ! dfx identity list | grep -q "^${IDENTITY}$"; then
  echo "→ Creating identity '${IDENTITY}' (no encryption)"
  dfx identity new "${IDENTITY}" --disable-encryption
fi
dfx identity use "${IDENTITY}"

# 4. Export the ledger account and principal
USER1_ACCOUNT="$(dfx ledger account-id)"
USER1_PRINCIPAL="$(dfx identity get-principal)"

# 5. Deploy Internet Identity
echo "→ Deploying internet_identity"
dfx deploy internet_identity

# 6. Deploy local ICP ledger (all tokens to USER1_ACCOUNT)
echo "→ Deploying icp_ledger_canister"
dfx deploy \
  --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai icp_ledger_canister \
  --argument "
    (variant {
      Init = record {
        minting_account = \"$USER1_ACCOUNT\";
        initial_values = vec {
          record {
            \"$USER1_ACCOUNT\";
            record { e8s = 1_000_000_000_000 : nat64; };
          };
        };
        send_whitelist = vec {};
        transfer_fee = opt record { e8s = 10_000 : nat64 };
        token_symbol = opt \"LICP\";
        token_name = opt \"Local ICP\";
      }
    })
  "

# 7. Deploy your Funti3r canisters
echo "→ Deploying funti3r_frontend"
dfx deploy funti3r_frontend

echo "→ Deploying funti3r_backend"
dfx deploy funti3r_backend

echo "→ Deploying funti3r_course"
dfx deploy funti3r_course

# 8. Deploy funti3r_video with its two init args
VIDEO_INIT_TEXT="funti3r_video_default"
echo "→ Deploying funti3r_video (text + principal)"
dfx deploy funti3r_video \
  --argument "(\"$VIDEO_INIT_TEXT\", principal \"$USER1_PRINCIPAL\")"

# 9. Show final balance
echo
echo "=== ${IDENTITY}'s ICP balance ==="
dfx ledger balance
