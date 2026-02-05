use anchor_lang::prelude::*;

declare_id!("D9WLdE4tVkpRM7Rvwadrdt4zPPrXTc4gk8mUsLhX2unG");

#[program]
pub mod owner_check_safe {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
