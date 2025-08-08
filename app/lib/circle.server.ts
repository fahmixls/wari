import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
import { serverEnv } from "./env.server";
import type {
  Blockchain,
  CircleDeveloperControlledWalletsClient,
  WalletSet,
  Wallet,
} from "@circle-fin/developer-controlled-wallets";

export const circleClient = initiateDeveloperControlledWalletsClient({
  apiKey: serverEnv.CIRCLE_API_KEY,
  entitySecret: serverEnv.CIRCLE_ENTITY_SECRET_CHIPHERTEXT,
});

export class WalletManager {
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
