import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { IBlacklistResult } from "@/types";

const BLACKLIST_API_KEY = process.env.BLACKLIST_API_KEY;
const BLACKLIST_API_URL = process.env.BLACKLIST_API_URL;

interface RequestBody {
  phoneNumbers: string[];
}

export async function POST(request: NextRequest) {
  const { phoneNumbers } = (await request.json()) as RequestBody;

  if (!phoneNumbers || !Array.isArray(phoneNumbers)) {
    return NextResponse.json(
      { message: "Invalid phone numbers" },
      { status: 400 }
    );
  }

  try {
    const results: IBlacklistResult[] = [];

    const CONCURRENT_LIMIT = 100;

    const chunks: string[][] = [];
    for (let i = 0; i < phoneNumbers.length; i += CONCURRENT_LIMIT) {
      chunks.push(phoneNumbers.slice(i, i + CONCURRENT_LIMIT));
    }

    for (const chunk of chunks) {
      const requests = chunk.map(async (number) => {
        return axios
          .get(BLACKLIST_API_URL || "", {
            params: { phone: number, key: BLACKLIST_API_KEY },
          })
          .then((response) =>
            results.push({
              phoneNumber: number,
              message: response.data.message,
            })
          )
          .catch((error) => {
            console.error(error);
            throw new Error();
          });
      });

      await Promise.all(requests);
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Error processing phone numbers:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
