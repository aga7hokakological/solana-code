import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SignerCheckUnsafe } from "../target/types/signer_check_unsafe";
import { assert } from "chai";

describe("signer-check-unsafe", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.signerCheckUnsafe as Program<SignerCheckUnsafe>;

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
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      myAccount: myAccount.publicKey,
      user: user.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    }).signers([user, myAccount]).rpc();
  });

  it("un authorized user or attacker can update the value", async () => {
    // Add your test here.
    const tx = await program.methods.update(new anchor.BN(100)).accounts({
      myAccount: myAccount.publicKey,
      user: attacker.publicKey,
    }).signers([]).rpc();

    const data = await program.account.myAccount.fetch(myAccount.publicKey);
    assert(data.data == 100);
  });
});
