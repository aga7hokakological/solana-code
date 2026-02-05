use anchor_lang::prelude::*;

declare_id!("8x6SCMgzVyr3rsVKhT5pgjCo36sxQMZRfmhPqR2K6b8x");

#[program]
pub mod data_matching_safe {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
