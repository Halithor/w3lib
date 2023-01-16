"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerrainTypes = exports.isTerrainWalkable = exports.getTerrainType = exports.setTerrainType = exports.TerrainShape = void 0;
var TerrainShape;
(function (TerrainShape) {
    TerrainShape[TerrainShape["Circle"] = 0] = "Circle";
    TerrainShape[TerrainShape["Square"] = 1] = "Square";
})(TerrainShape = exports.TerrainShape || (exports.TerrainShape = {}));
function setTerrainType(pos, terrainType, variation, area, shape) {
    SetTerrainType(pos.x, pos.y, terrainType, variation, area, shape);
}
exports.setTerrainType = setTerrainType;
function getTerrainType(pos) {
    return GetTerrainType(pos.x, pos.y);
}
exports.getTerrainType = getTerrainType;
function isTerrainWalkable(pos) {
    const maxRangeSq = 100;
    // const dummyItem = new Item(itemId('wolg'), vec2(0, 0));
    // dummyItem.visible = false;
    // const itemSearchRect = new Rectangle(vec2(0, 0), vec2(128, 128));
    // First hide items in the way.
    // const itemsInWay: Item[] = [];
    // itemSearchRect.move(pos);
    // itemSearchRect.enumItems(null, () => {
    //   const i = Item.fromHandle(GetEnumItem());
    //   i.visible = false;
    //   itemsInWay.push(i);
    // });
    // dummyItem.pos = pos; // Unhides the item
    // const newPos = dummyItem.pos;
    const newPos = pos;
    // dummyItem.visible = false; // hide it again
    // dummyItem.destroy();
    // Unhide items in the way
    // itemsInWay.forEach(i => {
    //   i.visible = true;
    // });
    return (newPos.distanceToSq(pos) < maxRangeSq &&
        !IsTerrainPathable(pos.x, pos.y, PATHING_TYPE_WALKABILITY));
}
exports.isTerrainWalkable = isTerrainWalkable;
// let walkableItem: Item;
// let walkableRect: Rectangle;
// const maxRangeSq = 100;
// export function isTerrainWalkable(pos: Vec2): boolean {
//   // if (!walkableItem) {
//   //   walkableItem = new Item(itemId('wolf'), vec2(0, 0));
//   //   walkableItem.visible = false;
//   // }
//   // if (!walkableRect) {
//   //   walkableRect = new Rectangle(vec2(0, 0), vec2(128, 128));
//   // }
//   // First hide items in the way
//   const itemsInWay: Item[] = [];
//   walkableRect.move(pos);
//   walkableRect.enumItems(null, () => {
//     const i = Item.fromHandle(GetEnumItem());
//     i.visible = false;
//     itemsInWay.push(i);
//   });
//   walkableItem.pos = pos; // unhides the item
//   const newPos = walkableItem.pos;
//   walkableItem.visible = false; // hide it again
//   // unhide the items in the way
//   itemsInWay.forEach(i => {
//     i.visible = true;
//   });
//   return (
//     newPos.distanceToSq(pos) < maxRangeSq &&
//     !IsTerrainPathable(pos.x, pos.y, PATHING_TYPE_WALKABILITY)
//   );
// }
// addScriptHook(W3TS_HOOK.MAIN_AFTER, () => {
//   const walkableItem = new Item(itemId('wolg'), vec2(0, 0));
//   walkableItem.visible = false;
//   const walkableRect = new Rectangle(vec2(0, 0), vec2(128, 128));
// });
class TerrainTypes {
}
exports.TerrainTypes = TerrainTypes;
// Lordaeron Summer
TerrainTypes.lordaeronSummerDirt = FourCC('Ldrt');
TerrainTypes.lordaeronSummerRoughDirt = FourCC('Ldro');
TerrainTypes.lordaeronSummerGrassyDirt = FourCC('Ldrg');
TerrainTypes.lordaeronSummerRock = FourCC('Lrok');
TerrainTypes.lordaeronSummerGrass = FourCC('Lgrs');
TerrainTypes.lordaeronSummerDarkGrass = FourCC('Lgrd');
// Lordaeron Fall
TerrainTypes.lordaeronFallDirt = FourCC('Fdrt');
TerrainTypes.lordaeronFallRoughDirt = FourCC('Fdro');
TerrainTypes.lordaeronFallGrassyDirt = FourCC('Fdrg');
TerrainTypes.lordaeronFallRock = FourCC('Frok');
TerrainTypes.lordaeronFallGrass = FourCC('Fgrs');
TerrainTypes.lordaeronFallDarkGrass = FourCC('Fgrd');
// Lordaeron Winter
TerrainTypes.lordaeronWinterDirt = FourCC('Wdrt');
TerrainTypes.lordaeronWinterRoughDirt = FourCC('Wdro');
TerrainTypes.lordaeronWinterGrassySnow = FourCC('Wsng');
TerrainTypes.lordaeronWinterRock = FourCC('Wrok');
TerrainTypes.lordaeronWinterGrass = FourCC('Wgrs');
TerrainTypes.lordaeronWinterSnow = FourCC('Wsnw');
// Barrens
TerrainTypes.barrensDirt = FourCC('Bdrt');
TerrainTypes.barrensRoughDirt = FourCC('Bdrh');
TerrainTypes.barrensPebbles = FourCC('Bdrr');
TerrainTypes.barrensGrassyDirt = FourCC('Bdrg');
TerrainTypes.barrensDesert = FourCC('Bdsr');
TerrainTypes.barrensDarkDesert = FourCC('Bdsd');
TerrainTypes.barrensRock = FourCC('Bflr');
TerrainTypes.barrensGrass = FourCC('Bgrr');
// Ashenvale
TerrainTypes.ashenvaleDirt = FourCC('Adrt');
TerrainTypes.ashenvaleRoughDirt = FourCC('Adrd');
TerrainTypes.ashenvaleGrass = FourCC('Agrs');
TerrainTypes.ashenvaleRock = FourCC('Arck');
TerrainTypes.ashenvaleLumpyGrass = FourCC('Agrd');
TerrainTypes.ashenvaleVines = FourCC('Avin');
TerrainTypes.ashenvaleGrassyDirt = FourCC('Adrg');
TerrainTypes.ashenvaleLeaves = FourCC('Alvd');
// Felwood
TerrainTypes.felwoodDirt = FourCC('Cdrt');
TerrainTypes.felwoodRoughDirt = FourCC('Cdrd');
TerrainTypes.felwoodPoison = FourCC('Cpos');
TerrainTypes.felwoodRock = FourCC('Crck');
TerrainTypes.felwoodVines = FourCC('Cvin');
TerrainTypes.felwoodGrass = FourCC('Cgrs');
TerrainTypes.felwoodLeaves = FourCC('Clvg');
// Northrend
TerrainTypes.northrendDirt = FourCC('Ndrt');
TerrainTypes.northrendDarkDirt = FourCC('Ndrd');
TerrainTypes.northrendRock = FourCC('Nrck');
TerrainTypes.northrendGrass = FourCC('Ngrs');
TerrainTypes.northrendIce = FourCC('Nice');
TerrainTypes.northrendSnow = FourCC('Nsnw');
TerrainTypes.northrendRockySnow = FourCC('Nsnr');
// Cityscape
TerrainTypes.cityscapeDirt = FourCC('Ydrt');
TerrainTypes.cityscapeRoughDirt = FourCC('Ydtr');
TerrainTypes.cityscapeBlackMarble = FourCC('Yblm');
TerrainTypes.cityscapeBrick = FourCC('Ybtl');
TerrainTypes.cityscapeSquareTiles = FourCC('Ysqd');
TerrainTypes.cityscapeRoundTiles = FourCC('Yrtl');
TerrainTypes.cityscapeGrass = FourCC('Ygsb');
TerrainTypes.cityscapeGrassTrim = FourCC('Yhdg');
TerrainTypes.cityscapeWhiteMarble = FourCC('Ywmb');
// Village
TerrainTypes.villageDirt = FourCC('Vdrt');
TerrainTypes.villageRoughDirt = FourCC('Vdrr');
TerrainTypes.villageCrops = FourCC('Vcrp');
TerrainTypes.villageCobblePath = FourCC('Vcbp');
TerrainTypes.villageStonePath = FourCC('Vstp');
TerrainTypes.villageShortGrass = FourCC('Vgrs');
TerrainTypes.villageRocks = FourCC('Vrck');
TerrainTypes.villageThickGrass = FourCC('Vgrt');
// Village Fall
TerrainTypes.villageFallDirt = FourCC('Qdrt');
TerrainTypes.villageFallRoughDirt = FourCC('Qdrr');
TerrainTypes.villageFallCrops = FourCC('Qcrp');
TerrainTypes.villageFallCobblePath = FourCC('Qcbp');
TerrainTypes.villageFallStonePath = FourCC('Qstp');
TerrainTypes.villageFallShortGrass = FourCC('Qgrs');
TerrainTypes.villageFallRocks = FourCC('Qrck');
TerrainTypes.villageFallThickGrass = FourCC('Qgrt');
// Dalaran
TerrainTypes.dalaranDirt = FourCC('Xdrt');
TerrainTypes.dalaranRoughDirt = FourCC('Xdtr');
TerrainTypes.dalaranBlackMarble = FourCC('Xblm');
TerrainTypes.dalaranBrickTiles = FourCC('Xbtl');
TerrainTypes.dalaranSquareTiles = FourCC('Xsqd');
TerrainTypes.dalaranRoundTiles = FourCC('Xrtl');
TerrainTypes.dalaranGrass = FourCC('Xgsb');
TerrainTypes.dalaranTrimGrass = FourCC('Xhdg');
TerrainTypes.dalaranWhiteMarble = FourCC('Xwmb');
// Dungeon
TerrainTypes.dungeonDirt = FourCC('Ddrt');
TerrainTypes.dungeonBrick = FourCC('Dbrk');
TerrainTypes.dungeonRedStones = FourCC('Drds');
TerrainTypes.dungeonLavaCracks = FourCC('Dlvc');
TerrainTypes.dungeonLava = FourCC('Dlav');
TerrainTypes.dungeonDarkRocks = FourCC('Ddkr');
TerrainTypes.dungeonGreyStones = FourCC('Dgrs');
TerrainTypes.dungeonSquareTiles = FourCC('Dsqd');
// Underground
TerrainTypes.undergroundDirt = FourCC('Gdrt');
TerrainTypes.undergroundBrick = FourCC('Gbrk');
TerrainTypes.undergroundRedStones = FourCC('Grds');
TerrainTypes.undergroundLavaCracks = FourCC('Glvc');
TerrainTypes.undergroundLava = FourCC('Glav');
TerrainTypes.undergroundDarkRocks = FourCC('Gdkr');
TerrainTypes.undergroundGreyStones = FourCC('Ggrs');
TerrainTypes.undergroundSquareTiles = FourCC('Gsqd');
// Sunken Ruins
TerrainTypes.sunkenRuinsDirt = FourCC('Zdrt');
TerrainTypes.sunkenRuinsRoughDirt = FourCC('Zdtr');
TerrainTypes.sunkenRuinsGrassyDirt = FourCC('Zdrg');
TerrainTypes.sunkenRuinsSmallBricks = FourCC('Zbks');
TerrainTypes.sunkenRuinsSand = FourCC('Zsan');
TerrainTypes.sunkenRuinsLargeBricks = FourCC('Zbkl');
TerrainTypes.sunkenRuinsRoundTiles = FourCC('Ztil');
TerrainTypes.sunkenRuinsGrass = FourCC('Zgrs');
TerrainTypes.sunkenRuinsDarkGrass = FourCC('Zvin');
// Icecrown Glacier
TerrainTypes.icecrownGlacierDirt = FourCC('Idrt');
TerrainTypes.icecrownGlacierRoughDirt = FourCC('Idtr');
TerrainTypes.icecrownGlacierDarkIce = FourCC('Idki');
TerrainTypes.icecrownGlacierBlackBricks = FourCC('Ibkb');
TerrainTypes.icecrownGlacierRuneBricks = FourCC('Irbk');
TerrainTypes.icecrownGlacierTiledBricks = FourCC('Itbk');
TerrainTypes.icecrownGlacierIce = FourCC('Iice');
TerrainTypes.icecrownGlacierBlackSquares = FourCC('Ibsq');
TerrainTypes.icecrownGlacierSnow = FourCC('Isnw');
// Outland
TerrainTypes.outlandDirt = FourCC('Odrt');
TerrainTypes.outlandLightDirt = FourCC('Odtr');
TerrainTypes.outlandRoughDirt = FourCC('Osmb');
TerrainTypes.outlandCrackedDirt = FourCC('Ofst');
TerrainTypes.outlandFlatStones = FourCC('Olgb');
TerrainTypes.outlandRock = FourCC('Orok');
TerrainTypes.outlandLightFlatStones = FourCC('Ofsl');
TerrainTypes.outlandAbyss = FourCC('Oaby');
// Black Citadel
TerrainTypes.blackCitadelDirt = FourCC('Kdrt');
TerrainTypes.blackCitadelLightDirt = FourCC('Kfsl');
TerrainTypes.blackCitadelRoughDirt = FourCC('Kdtr');
TerrainTypes.blackCitadelFlatStones = FourCC('Kfst');
TerrainTypes.blackCitadelSmallBricks = FourCC('Ksmb');
TerrainTypes.blackCitadelLargeBricks = FourCC('Klgb');
TerrainTypes.blackCitadelSquareTiles = FourCC('Ksqt');
TerrainTypes.blackCitadelDarkTiles = FourCC('Kdkt');
// Dalaran Ruins
TerrainTypes.dalaranRuinsDirt = FourCC('Jdrt');
TerrainTypes.dalaranRuinsRoughDirt = FourCC('Jdtr');
TerrainTypes.dalaranRuinsBlackMarble = FourCC('Jblm');
TerrainTypes.dalaranRuinsBrickTiles = FourCC('Jbtl');
TerrainTypes.dalaranRuinsSquareTiles = FourCC('Jsqd');
TerrainTypes.dalaranRuinsRoundTiles = FourCC('Jrtl');
TerrainTypes.dalaranRuinsGrass = FourCC('Jgsb');
TerrainTypes.dalaranRuinsTrimGrass = FourCC('Jhdg');
TerrainTypes.dalaranRuinsWhiteMarble = FourCC('Jwmb');
// Cliffs
TerrainTypes.ashenvaleDirtCliff = FourCC('cAc2');
TerrainTypes.ashenvaleGrassCliff = FourCC('cAc1');
TerrainTypes.barrensDesertCliff = FourCC('cBc2');
TerrainTypes.barrensGrassCliff = FourCC('cBc1');
TerrainTypes.blackCitadelDirtCliff = FourCC('cKc1');
TerrainTypes.blackCitadelDarkTilesCliff = FourCC('cKc2');
TerrainTypes.cityscapeDirtCliff = FourCC('cYc2');
TerrainTypes.cityscapeSquareTilesCliff = FourCC('cYc1');
TerrainTypes.dalaranDirtCliff = FourCC('cXc2');
TerrainTypes.dalaranSquareTilesCliff = FourCC('cXc1');
TerrainTypes.dalaranRuinsDirtCliff = FourCC('cJc2');
TerrainTypes.dalaranRuinsSquareTilesCliff = FourCC('cJc1');
TerrainTypes.dungeonDirtCliff = FourCC('cDc2');
TerrainTypes.dungeonSquareTilesCliff = FourCC('cDc1');
TerrainTypes.felwoodDirtCliff = FourCC('cCc2');
TerrainTypes.felwoodGrassCliff = FourCC('cCc1');
TerrainTypes.icecrownGlacierRuneBricksCliff = FourCC('cIc2');
TerrainTypes.icecrownGlacierSnowCliff = FourCC('cIc1');
TerrainTypes.lordaeronFallDirtCliff = FourCC('cFc2');
TerrainTypes.lordaeronFallGrassCliff = FourCC('cFc1');
TerrainTypes.lordaeronSummerDirtCliff = FourCC('cLc2');
TerrainTypes.lordaeronSummerGrassCliff = FourCC('cLc1');
TerrainTypes.lordaeronWinterGrassCliff = FourCC('cWc2');
TerrainTypes.lordaeronWinterSnowCliff = FourCC('cWc1');
TerrainTypes.northrendDirtCliff = FourCC('cNc2');
TerrainTypes.northrendSnowCliff = FourCC('cNc1');
TerrainTypes.outlandAbyssCliff = FourCC('cOc1');
TerrainTypes.outlandRoughDirtCliff = FourCC('cOc2');
TerrainTypes.sunkenRuinsDirtCliff = FourCC('cZc2');
TerrainTypes.sunkenRuinsLargeBricksCliff = FourCC('cZc1');
TerrainTypes.undergroundDirtCliff = FourCC('cGc2');
TerrainTypes.undergroundSquareTilesCliff = FourCC('cGc1');
TerrainTypes.villageDirtCliff = FourCC('cVc2');
TerrainTypes.villageGrassThickCliff = FourCC('cVc1');
TerrainTypes.villageFallDirtCliff = FourCC('cQc2');
TerrainTypes.villageFallGrassThickCliff = FourCC('cQc1');
//# sourceMappingURL=terrain.js.map