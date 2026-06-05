use crate::state::Counter;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

impl<'info> Increment<'info> {
    pub fn increment(&mut self, count: u64) -> Result<()> {
        self.counter.count += count;
        Ok(())
    }
}
