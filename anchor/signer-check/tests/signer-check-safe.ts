import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SignerCheckSafe } from "../target/types/signer_check_safe";
import { assert } from "chai";

describe("signer-check", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.signerCheckSafe as Program<SignerCheckSafe>;

  const user = anchor.web3.Keypair.generate();
  const attacker = anchor.web3.Keypair.generate();

  const myAccount = anchor.web3.Keypair.generate();

  before(async () => {
    // Airdrop SOL to user to pay for account creation
    const connection = anchor.getProvider().connection;
    const airdropSig = await connection.requestAirdrop(user.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdropSig);
  });

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().accounts({
      myAccount: myAccount.publicKey,
      user: user.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    }).signers([user, myAccount]).rpc();
  });

  it("unAuthorized user or attacker cannot update the value", async () => {
    try {
      await program.methods.update(new anchor.BN(100)).accounts({
        myAccount: myAccount.publicKey,
        user: attacker.publicKey,
      }).signers([]).rpc();
      assert.fail("Should have thrown an error");
    } catch (err) {
      // Expected - unauthorized user was blocked
      assert.ok(err);
    } 
  });
});