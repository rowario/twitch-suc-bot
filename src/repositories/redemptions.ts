import { Redemption } from "@prisma/client";
import { prisma } from "../common/prisma";
import { RedemAction } from "../types/common";

export const createRedemption = async (
    rewardId: string,
    action: RedemAction
): Promise<Redemption> => {
    return prisma.redemption.create({
        data: {
            rewardId,
            action,
        },
    });
};

export const getRedemption = async (
    rewardId: string
): Promise<Redemption | null> => {
    return prisma.redemption.findFirst({
        where: {
            rewardId,
        },
    });
};

export const getRedemptionByAction = async (
    action: RedemAction
): Promise<Redemption | null> => {
    return prisma.redemption.findFirst({
        where: {
            action,
        },
    });
};

export const deleteRedemption = async (id: number): Promise<void> => {
    await prisma.redemption.delete({
        where: {
            id,
        },
    });
};
