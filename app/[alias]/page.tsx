import {redirect, notFound} from "next/navigation";
import { getDatabase } from "@/lib/mongodb";

export default async function RedirectPage({params,}: {
    params: Promise<{alias: string}>;
}) {
    const { alias } = await params;
    const db = await getDatabase();
    const result = await db.collection("urls").findOne({alias});

    if (!result) {
        notFound();
    }
    redirect(result.url);
}
