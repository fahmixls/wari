import { getCircleClient, WalletManager } from "@/lib/circle.server";
import type { Blockchain } from "@circle-fin/developer-controlled-wallets";
import z from "zod";
import type { Route } from "./+types/create";

const WalletSchema = z.object({
  walletName: z.string().min(1, "Wallet name is required"),
  blockchains: z.string().min(1, "At least one blockchain is required"),
});

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }
  const formData = await request.formData();

  try {
    const raw = {
      walletName: formData.get("walletName"),
      blockchains: formData.get("blockchains") as Blockchain,
    };

    const parsed = WalletSchema.parse(raw);
    const client = await getCircleClient();
    const walletManager = new WalletManager(client);

    const { walletSet, wallets } =
      await walletManager.createWalletSetAndWallets(
        [parsed.blockchains as Blockchain],
        1,
        parsed.walletName
      );

    console.log("Final Result:", { walletSet, wallets });

    return Response.json({
      success: true,
      message: "Wallet created successfully!",
    });
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      return Response.json(
        { success: false, message: "Validation error", errors: err.flatten() },
        { status: 400 }
      );
    }

    return Response.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
