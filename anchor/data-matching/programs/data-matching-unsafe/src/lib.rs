use anchor_lang::prelude::*;

declare_id!("HQ4ke3cnR6tXgtJYTmWAKp82Ju3odXZwLCMT18Po773e");

#[program]
pub mod data_matching_unsafe {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
