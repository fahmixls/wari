import { put } from "@vercel/blob";
import {
  initiateDeveloperControlledWalletsClient,
  registerEntitySecretCiphertext,
} from "@circle-fin/developer-controlled-wallets";
import { serverEnv } from "./env.server";
import type {
  Blockchain,
  CircleDeveloperControlledWalletsClient,
  WalletSet,
  Wallet,
} from "@circle-fin/developer-controlled-wallets";
import { randomBytes } from "crypto";

// Generate the entity secret
const entitySecret = randomBytes(32).toString("hex");

let circleClient: CircleDeveloperControlledWalletsClient | undefined =
  undefined;

// Register the entity secret and store the recovery file in Vercel Blob
registerEntitySecretCiphertext({
  apiKey: serverEnv.CIRCLE_API_KEY!,
  entitySecret,
})
  .then(async (value) => {
    const recoveryFile = value.data?.recoveryFile;

    if (recoveryFile) {
      const buffer = Buffer.from(recoveryFile, "utf-8");
      put("recovery-file.txt", buffer, {
        access: "public",
      });
    }

    circleClient = initiateDeveloperControlledWalletsClient({
      apiKey: serverEnv.CIRCLE_API_KEY!,
      entitySecret,
    });
  })
  .catch((err) => {
    console.log(err);
  });

class WalletManager {
  private client: CircleDeveloperControlledWalletsClient;

  constructor(client: CircleDeveloperControlledWalletsClient) {
    this.client = client;
  }

  async createWalletSet(name: string): Promise<WalletSet | undefined> {
    try {
      const response = await this.client.createWalletSet({ name });
      console.log("Created WalletSet:", response.data?.walletSet);
      return response.data?.walletSet;
    } catch (err) {
      console.error("Failed to create wallet set:", err);
      throw new Error(`Failed to create wallet set: ${String(err)}`);
    }
  }

  async createWallets(
    blockchains: Blockchain[],
    count: number,
    walletSetId: string
  ): Promise<Wallet[] | undefined> {
    try {
      const response = await this.client.createWallets({
        blockchains,
        count,
        walletSetId,
      });
      console.log("Created Wallets:", response.data?.wallets);
      return response.data?.wallets;
    } catch (err) {
      console.error("Failed to create wallets:", err);
      throw new Error(`Failed to create wallets: ${String(err)}`);
    }
  }

  async createWalletSetAndWallets(
    blockchains: Blockchain[],
    count: number = 1,
    name: string = "Wallet Set Name"
  ): Promise<{ walletSet: WalletSet; wallets: Wallet[] }> {
    const walletSet = await this.createWalletSet(name);

    if (!walletSet?.id) {
      throw new Error("Failed to create wallet set");
    }

    const wallets = await this.createWallets(blockchains, count, walletSet.id);

    return {
      walletSet,
      wallets: wallets || [],
    };
  }
}

export { circleClient, WalletManager };
