use crate::error::ErrorCode;
use crate::state::Counter;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

impl<'info> Decrement<'info> {
    pub fn decrement(&mut self, count: u64) -> Result<()> {
        require!(self.counter.count > 0, ErrorCode::NegativeCountNotPossible);
        self.counter.count -= count;
        Ok(())
    }
}
