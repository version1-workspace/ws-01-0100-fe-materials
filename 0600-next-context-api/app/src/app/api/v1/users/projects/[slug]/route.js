import { NextResponse } from "next/server";
import { getProjects } from "../../../../../datastore";

export async function GET(request, context) {
  const { slug } = context.params || {};
  const project = getProjects().find((it) => it.slug === slug);

  return NextResponse.json({ data: project });
}
