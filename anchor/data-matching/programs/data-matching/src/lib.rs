use anchor_lang::prelude::*;

declare_id!("BA1oUXUQ9A3juSUsU1J8PeGfN9tmtv87fEoNP3e6Q3i8");

#[program]
pub mod data_matching {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
