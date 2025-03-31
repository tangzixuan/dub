import { NextResponse } from "next/server";

export function createResponseWithCookie(
  response: NextResponse,
  {
    clickId,
    path,
  }: {
    clickId?: string;
    path: string;
  },
): NextResponse {
  if (clickId) {
    response.cookies.set("dub_id", clickId, {
      path,
      maxAge: 60 * 60, // 1 hour
    });
  }

  return response;
}
