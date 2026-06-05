// use anchor_lang::prelude::*;

// #[derive(Accounts)]
// pub struct Initialize {}

// pub fn handler(ctx: Context<Initialize>) -> Result<()> {
//     msg!("Greetings from: {:?}", ctx.program_id);
//     Ok(())
// }
//

use crate::state::Counter;
use anchor_lang::prelude::*;
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer= user,
        space = 8+Counter::INIT_SPACE
    )]
    pub counter: Account<'info, Counter>,
    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn initialize(&mut self) -> Result<()> {
        self.counter.count = 0;
        Ok(())
    }
}
