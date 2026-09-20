import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { waitlistSignups } from "@/db/schema";

const bodySchema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    await getDb().insert(waitlistSignups).values({ email: parsed.data.email });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.toLowerCase().includes("duplicate") || message.toLowerCase().includes("unique")) {
      return NextResponse.json({ ok: true, alreadyJoined: true }, { status: 200 });
    }
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
