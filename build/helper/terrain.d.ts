import { Vec2 } from '../math/index';
export declare type TerrainType = number;
export declare enum TerrainShape {
    Circle = 0,
    Square = 1
}
export declare function setTerrainType(pos: Vec2, terrainType: TerrainType, variation: number, area: number, shape: TerrainShape): void;
export declare function getTerrainType(pos: Vec2): TerrainType;
export declare function isTerrainWalkable(pos: Vec2): boolean;
export declare class TerrainTypes {
    static lordaeronSummerDirt: TerrainType;
    static lordaeronSummerRoughDirt: TerrainType;
    static lordaeronSummerGrassyDirt: TerrainType;
    static lordaeronSummerRock: TerrainType;
    static lordaeronSummerGrass: TerrainType;
    static lordaeronSummerDarkGrass: TerrainType;
    static lordaeronFallDirt: TerrainType;
    static lordaeronFallRoughDirt: TerrainType;
    static lordaeronFallGrassyDirt: TerrainType;
    static lordaeronFallRock: TerrainType;
    static lordaeronFallGrass: TerrainType;
    static lordaeronFallDarkGrass: TerrainType;
    static lordaeronWinterDirt: TerrainType;
    static lordaeronWinterRoughDirt: TerrainType;
    static lordaeronWinterGrassySnow: TerrainType;
    static lordaeronWinterRock: TerrainType;
    static lordaeronWinterGrass: TerrainType;
    static lordaeronWinterSnow: TerrainType;
    static barrensDirt: TerrainType;
    static barrensRoughDirt: TerrainType;
    static barrensPebbles: TerrainType;
    static barrensGrassyDirt: TerrainType;
    static barrensDesert: TerrainType;
    static barrensDarkDesert: TerrainType;
    static barrensRock: TerrainType;
    static barrensGrass: TerrainType;
    static ashenvaleDirt: TerrainType;
    static ashenvaleRoughDirt: TerrainType;
    static ashenvaleGrass: TerrainType;
    static ashenvaleRock: TerrainType;
    static ashenvaleLumpyGrass: TerrainType;
    static ashenvaleVines: TerrainType;
    static ashenvaleGrassyDirt: TerrainType;
    static ashenvaleLeaves: TerrainType;
    static felwoodDirt: TerrainType;
    static felwoodRoughDirt: TerrainType;
    static felwoodPoison: TerrainType;
    static felwoodRock: TerrainType;
    static felwoodVines: TerrainType;
    static felwoodGrass: TerrainType;
    static felwoodLeaves: TerrainType;
    static northrendDirt: TerrainType;
    static northrendDarkDirt: TerrainType;
    static northrendRock: TerrainType;
    static northrendGrass: TerrainType;
    static northrendIce: TerrainType;
    static northrendSnow: TerrainType;
    static northrendRockySnow: TerrainType;
    static cityscapeDirt: TerrainType;
    static cityscapeRoughDirt: TerrainType;
    static cityscapeBlackMarble: TerrainType;
    static cityscapeBrick: TerrainType;
    static cityscapeSquareTiles: TerrainType;
    static cityscapeRoundTiles: TerrainType;
    static cityscapeGrass: TerrainType;
    static cityscapeGrassTrim: TerrainType;
    static cityscapeWhiteMarble: TerrainType;
    static villageDirt: TerrainType;
    static villageRoughDirt: TerrainType;
    static villageCrops: TerrainType;
    static villageCobblePath: TerrainType;
    static villageStonePath: TerrainType;
    static villageShortGrass: TerrainType;
    static villageRocks: TerrainType;
    static villageThickGrass: TerrainType;
    static villageFallDirt: TerrainType;
    static villageFallRoughDirt: TerrainType;
    static villageFallCrops: TerrainType;
    static villageFallCobblePath: TerrainType;
    static villageFallStonePath: TerrainType;
    static villageFallShortGrass: TerrainType;
    static villageFallRocks: TerrainType;
    static villageFallThickGrass: TerrainType;
    static dalaranDirt: TerrainType;
    static dalaranRoughDirt: TerrainType;
    static dalaranBlackMarble: TerrainType;
    static dalaranBrickTiles: TerrainType;
    static dalaranSquareTiles: TerrainType;
    static dalaranRoundTiles: TerrainType;
    static dalaranGrass: TerrainType;
    static dalaranTrimGrass: TerrainType;
    static dalaranWhiteMarble: TerrainType;
    static dungeonDirt: TerrainType;
    static dungeonBrick: TerrainType;
    static dungeonRedStones: TerrainType;
    static dungeonLavaCracks: TerrainType;
    static dungeonLava: TerrainType;
    static dungeonDarkRocks: TerrainType;
    static dungeonGreyStones: TerrainType;
    static dungeonSquareTiles: TerrainType;
    static undergroundDirt: TerrainType;
    static undergroundBrick: TerrainType;
    static undergroundRedStones: TerrainType;
    static undergroundLavaCracks: TerrainType;
    static undergroundLava: TerrainType;
    static undergroundDarkRocks: TerrainType;
    static undergroundGreyStones: TerrainType;
    static undergroundSquareTiles: TerrainType;
    static sunkenRuinsDirt: TerrainType;
    static sunkenRuinsRoughDirt: TerrainType;
    static sunkenRuinsGrassyDirt: TerrainType;
    static sunkenRuinsSmallBricks: TerrainType;
    static sunkenRuinsSand: TerrainType;
    static sunkenRuinsLargeBricks: TerrainType;
    static sunkenRuinsRoundTiles: TerrainType;
    static sunkenRuinsGrass: TerrainType;
    static sunkenRuinsDarkGrass: TerrainType;
    static icecrownGlacierDirt: TerrainType;
    static icecrownGlacierRoughDirt: TerrainType;
    static icecrownGlacierDarkIce: TerrainType;
    static icecrownGlacierBlackBricks: TerrainType;
    static icecrownGlacierRuneBricks: TerrainType;
    static icecrownGlacierTiledBricks: TerrainType;
    static icecrownGlacierIce: TerrainType;
    static icecrownGlacierBlackSquares: TerrainType;
    static icecrownGlacierSnow: TerrainType;
    static outlandDirt: TerrainType;
    static outlandLightDirt: TerrainType;
    static outlandRoughDirt: TerrainType;
    static outlandCrackedDirt: TerrainType;
    static outlandFlatStones: TerrainType;
    static outlandRock: TerrainType;
    static outlandLightFlatStones: TerrainType;
    static outlandAbyss: TerrainType;
    static blackCitadelDirt: TerrainType;
    static blackCitadelLightDirt: TerrainType;
    static blackCitadelRoughDirt: TerrainType;
    static blackCitadelFlatStones: TerrainType;
    static blackCitadelSmallBricks: TerrainType;
    static blackCitadelLargeBricks: TerrainType;
    static blackCitadelSquareTiles: TerrainType;
    static blackCitadelDarkTiles: TerrainType;
    static dalaranRuinsDirt: TerrainType;
    static dalaranRuinsRoughDirt: TerrainType;
    static dalaranRuinsBlackMarble: TerrainType;
    static dalaranRuinsBrickTiles: TerrainType;
    static dalaranRuinsSquareTiles: TerrainType;
    static dalaranRuinsRoundTiles: TerrainType;
    static dalaranRuinsGrass: TerrainType;
    static dalaranRuinsTrimGrass: TerrainType;
    static dalaranRuinsWhiteMarble: TerrainType;
    static ashenvaleDirtCliff: TerrainType;
    static ashenvaleGrassCliff: TerrainType;
    static barrensDesertCliff: TerrainType;
    static barrensGrassCliff: TerrainType;
    static blackCitadelDirtCliff: TerrainType;
    static blackCitadelDarkTilesCliff: TerrainType;
    static cityscapeDirtCliff: TerrainType;
    static cityscapeSquareTilesCliff: TerrainType;
    static dalaranDirtCliff: TerrainType;
    static dalaranSquareTilesCliff: TerrainType;
    static dalaranRuinsDirtCliff: TerrainType;
    static dalaranRuinsSquareTilesCliff: TerrainType;
    static dungeonDirtCliff: TerrainType;
    static dungeonSquareTilesCliff: TerrainType;
    static felwoodDirtCliff: TerrainType;
    static felwoodGrassCliff: TerrainType;
    static icecrownGlacierRuneBricksCliff: TerrainType;
    static icecrownGlacierSnowCliff: TerrainType;
    static lordaeronFallDirtCliff: TerrainType;
    static lordaeronFallGrassCliff: TerrainType;
    static lordaeronSummerDirtCliff: TerrainType;
    static lordaeronSummerGrassCliff: TerrainType;
    static lordaeronWinterGrassCliff: TerrainType;
    static lordaeronWinterSnowCliff: TerrainType;
    static northrendDirtCliff: TerrainType;
    static northrendSnowCliff: TerrainType;
    static outlandAbyssCliff: TerrainType;
    static outlandRoughDirtCliff: TerrainType;
    static sunkenRuinsDirtCliff: TerrainType;
    static sunkenRuinsLargeBricksCliff: TerrainType;
    static undergroundDirtCliff: TerrainType;
    static undergroundSquareTilesCliff: TerrainType;
    static villageDirtCliff: TerrainType;
    static villageGrassThickCliff: TerrainType;
    static villageFallDirtCliff: TerrainType;
    static villageFallGrassThickCliff: TerrainType;
}