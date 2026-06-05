# Learning Progress

## Anchor Counter Program

### Understood (answered correctly under grill)
- Solana programs are stateless — data lives in accounts, not programs
- Accounts hold: lamports, pubkey, data, owner, executable, rent_epoch
- Only the program that owns an account can write to its data
- Users create and pay rent for accounts
- Rent amount depends on storage size (bytes)
- u64 is the standard type for counters (8 bytes, 18 quintillion max)
- #[account] macro goes on data structs
- #[Accounts] macro goes on instruction context structs
- Account discriminator = 8 bytes added by Anchor for type verification
- system_program only needed when creating accounts, not modifying
- #[account(mut)] needed on user when they are payer (lamports decrease)
- #[account(init, payer, space)] for account creation
- #[account(mut)] for modifying existing accounts
- u64 cannot go below 0 (unsigned) — need underflow protection
- require! macro for custom error checks in Anchor
- lib.rs = declare_id! + #[program] module + instruction functions
- state.rs = #[account] data structs
- instructions/ folder = one file per instruction (context + impl logic)
- error.rs = #[error_code] enum with custom errors
- instructions.rs = pub mod + pub use for each instruction file
- anchor build compiles program + runs tests

### Shaky (needed hints or got partially wrong)
- require! syntax — used semicolon instead of comma separator
- Underflow condition — checked input parameter instead of counter value
- pubkey() method casing — tried pubKey() and Pubkey() before lowercase
- lib.rs instruction function names — named all three "initialize"
- Counter keypair vs Counter struct — confused the two

### Not Yet Covered
- Writing increment/decrement tests
- Verifying account state after transaction in tests
- Frontend integration with the program
- PDAs (Program Derived Addresses)
- Deploying to devnet

### Errors Made in Code (and whether understood after)
- 2026-05-27 | state.rs | InitSPace wrong capitalization | Understood: yes
- 2026-05-27 | state.rs | ValutState typo | Understood: yes
- 2026-05-27 | decrement.rs | require! semicolon instead of comma | Understood: yes
- 2026-05-27 | decrement.rs | wrong underflow condition (count>0 vs self.counter.count>0) | Understood: yes
- 2026-05-27 | lib.rs | all three functions named "initialize" | Understood: yes
- 2026-05-27 | test_initialize.rs | Counter struct used as keypair | Understood: yes
- 2026-05-27 | test_initialize.rs | pubKey() wrong casing | Understood: yes
