pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("5jL8NFLSUhPrkto2RuNANXehBDrRNsYTD6acAxKNCZKp");

#[program]
pub mod backend {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize()
    }
    pub fn increment(ctx: Context<Increment>, count: u64) -> Result<()> {
        ctx.accounts.increment(count)
    }
    pub fn decrement(ctx: Context<Decrement>, count: u64) -> Result<()> {
        ctx.accounts.decrement(count)
    }
}
