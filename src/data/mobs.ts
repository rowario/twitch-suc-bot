import { shuffle } from "lodash";

export type MinecraftMob = {
    spawnCommand: string;
};

export const getRandomMob = (): MinecraftMob => {
    return shuffle(mobs)[0];
};

export const mobs = [
    {
        spawnCommand: "minecraft:axolotl",
    },
    {
        spawnCommand: "minecraft:bat",
    },
    {
        spawnCommand: "minecraft:cat",
    },
    {
        spawnCommand: "minecraft:chicken",
    },
    {
        spawnCommand: "minecraft:cow",
    },
    {
        spawnCommand: "minecraft:donkey",
    },
    {
        spawnCommand: "minecraft:fox",
    },
    {
        spawnCommand: "minecraft:horse",
    },
    {
        spawnCommand: "minecraft:mule",
    },
    {
        spawnCommand: "minecraft:ocelot",
    },
    {
        spawnCommand: "minecraft:parrot",
    },
    {
        spawnCommand: "minecraft:pig",
    },
    {
        spawnCommand: "minecraft:pufferfish",
    },
    {
        spawnCommand: "minecraft:rabbit",
    },
    {
        spawnCommand: "minecraft:sheep",
    },
    {
        spawnCommand: "minecraft:skeleton_horse",
    },
    {
        spawnCommand: "minecraft:snow_golem",
    },
    {
        spawnCommand: "minecraft:strider",
    },
    {
        spawnCommand: "minecraft:turtle",
    },
    {
        spawnCommand: "minecraft:villager",
    },
    {
        spawnCommand: "minecraft:bee",
    },
    {
        spawnCommand: "minecraft:cave_spider",
    },
    {
        spawnCommand: "minecraft:goat",
    },
    {
        spawnCommand: "minecraft:iron_golem",
    },
    {
        spawnCommand: "minecraft:llama",
    },
    {
        spawnCommand: "minecraft:panda",
    },
    {
        spawnCommand: "minecraft:strider_jockey",
    },
    {
        spawnCommand: "minecraft:wolf",
    },
    {
        spawnCommand: "minecraft:zombified_piglin",
    },
    {
        spawnCommand: "minecraft:blaze",
    },
    {
        spawnCommand: "minecraft:chicken_jockey",
    },
    {
        spawnCommand: "minecraft:creeper",
    },
    {
        spawnCommand: "minecraft:creeper {powered:1}",
    },
    {
        spawnCommand: "minecraft:drowned",
    },
    {
        spawnCommand: "minecraft:elder_guardian",
    },
    {
        spawnCommand: "minecraft:endermite",
    },
    {
        spawnCommand: "minecraft:evoker",
    },
    {
        spawnCommand: "minecraft:ghast",
    },
    {
        spawnCommand: "minecraft:guardian",
    },
    {
        spawnCommand: "minecraft:hoglin",
    },
    {
        spawnCommand: "minecraft:husk",
    },
    {
        spawnCommand: "minecraft:illusioner",
    },
    {
        spawnCommand: "minecraft:magma_cube",
    },
    {
        spawnCommand: "minecraft:phantom",
    },
    {
        spawnCommand: "minecraft:piglin",
    },
    {
        spawnCommand: "minecraft:piglin_brute",
    },
    {
        spawnCommand: "minecraft:pillager",
    },
    {
        spawnCommand: "minecraft:polar_bear",
    },
    {
        spawnCommand: "minecraft:ravager",
    },
    {
        spawnCommand: "minecraft:ravager_jockey",
    },
    {
        spawnCommand: "minecraft:shulker",
    },
    {
        spawnCommand: "minecraft:silverfish",
    },
    {
        spawnCommand: "minecraft:skeleton",
    },
    {
        spawnCommand: "minecraft:slime",
    },
    {
        spawnCommand: "minecraft:spider",
    },
    {
        spawnCommand: "minecraft:stray",
    },
    {
        spawnCommand: "minecraft:vex",
    },
    {
        spawnCommand: "minecraft:vindicator",
    },
    {
        spawnCommand: "minecraft:witch",
    },
    {
        spawnCommand: "minecraft:zoglin",
    },
];
