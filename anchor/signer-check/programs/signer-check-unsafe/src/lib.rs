use anchor_lang::prelude::*;

declare_id!("6hf6R2iny7xtPiiz1Gi8bE7nMzwHiaYtsCFcJ3PDowJe");

#[program]
pub mod signer_check_unsafe {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = 0;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data; 
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    user: Signer<'info>,
    #[account(
        init,
        payer = user,
        space = 8 + MyAccount::INIT_SPACE
    )]
    my_account: Account<'info, MyAccount>,
    system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Update<'info> {
    /// CHECK:
    #[account(mut)]
    user: UncheckedAccount<'info>,
    #[account(mut)]
    my_account: Account<'info, MyAccount>,
}

#[account]
#[derive(InitSpace)]
pub struct MyAccount {
    data: u64,
}