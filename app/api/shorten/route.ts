import {NextRequest, NextResponse} from "next/server";
import {getDatabase} from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    const {url, alias} = await request.json();

    if (!url) {
        return NextResponse.json(
            { error: "Please enter a valid URL." },
            { status: 400 }
        );
    }
    if (!alias) {
        return NextResponse.json(
            { error: "Please enter a valid alias." },
            { status: 400 }
        );
    }
    try {
        const parsedURL = new URL(url);

        if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
            throw new Error("Invalid protocol");
        }
    } catch {
        return NextResponse.json(
            { error: "Please enter a valid URL." },
            { status: 400 }
        );
    }

    const db = await getDatabase();
    const existAlias = await db.collection("urls").findOne({alias});

    if (existAlias) {
        return NextResponse.json(
            { error: "Invalid alias: This alias already exists" },
            { status: 409 }
        );
    }

    await db.collection("urls").insertOne({
        url,
        alias
    });

    return NextResponse.json(
        { message: "URL shortened successfully!", alias },
        { status: 201 }
    );
}