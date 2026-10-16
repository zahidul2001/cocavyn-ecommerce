import { createClient } from "@/lib/supabase/server";
import CheckoutForm from "./CheckoutForm";

// ============================================
// COCAVYN - Checkout Page (Server Component)
// Stage 11.2 — Fetches delivery zones from database
// ============================================

export default async function CheckoutPage() {
  const supabase = await createClient();

  // Fetch active delivery zones
  const { data: deliveryZones } = await supabase
    .from("delivery_zones")
    .select("id, name, charge, estimated_days")
    .eq("is_active", true)
    .order("charge", { ascending: true });

  return (
    <CheckoutForm
      deliveryZones={(deliveryZones || []).map((z) => ({
        id: z.id,
        name: z.name,
        charge: Number(z.charge),
        estimated_days: z.estimated_days,
      }))}
    />
  );
}