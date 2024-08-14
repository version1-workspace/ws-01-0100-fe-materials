import { NextResponse } from "next/server";
import { getProjects } from "@/datastore";
import { PageInfo } from "@/services/api/models/pagination";

export async function GET(request) {
  const projects = getProjects()
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 20;

  const pageInfo = new PageInfo({
    page,
    limit,
    totalCount: projects.length,
  });

  const data = pageInfo.paginate(projects);

  return NextResponse.json({
    data,
    pageInfo,
  });
}
