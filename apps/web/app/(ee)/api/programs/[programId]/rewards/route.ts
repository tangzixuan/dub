import { DubApiError } from "@/lib/api/errors";
import { withWorkspace } from "@/lib/auth";
import { RewardSchema } from "@/lib/zod/schemas/rewards";
import { prisma } from "@dub/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// GET /api/programs/[programId]/rewards - get all rewards for a program
export const GET = withWorkspace(async ({ workspace, params }) => {
  const { programId } = params;

  if (programId !== workspace.defaultProgramId) {
    throw new DubApiError({
      code: "not_found",
      message: "Program not found",
    });
  }

  const rewards = await prisma.reward.findMany({
    where: {
      programId,
    },
    include: {
      _count: {
        select: {
          partners: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const rewardsWithPartnersCount = rewards.map((reward) => ({
    ...reward,
    partnersCount: reward._count.partners,
  }));

  return NextResponse.json(
    z.array(RewardSchema).parse(rewardsWithPartnersCount),
  );
});
