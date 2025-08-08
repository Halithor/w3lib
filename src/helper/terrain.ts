import { Vec2 } from "../math/index";

export type TerrainType = number;

export enum TerrainShape {
  Circle = 0,
  Square = 1,
}

export function setTerrainType(
  pos: Vec2,
  terrainType: TerrainType,
  variation: number,
  area: number,
  shape: TerrainShape,
) {
  SetTerrainType(pos.x, pos.y, terrainType, variation, area, shape);
}

export function getTerrainType(pos: Vec2): TerrainType {
  return GetTerrainType(pos.x, pos.y);
}

export function isPointBlighted(pos: Vec2): boolean {
  return IsPointBlighted(pos.x, pos.y);
}

export function isTerrainWalkable(pos: Vec2): boolean {
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

  return (
    newPos.distanceToSq(pos) < maxRangeSq &&
    !IsTerrainPathable(pos.x, pos.y, PATHING_TYPE_WALKABILITY)
  );
}

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

export class TerrainTypes {
  // Lordaeron Summer
  public static lordaeronSummerDirt: TerrainType = FourCC("Ldrt");
  public static lordaeronSummerRoughDirt: TerrainType = FourCC("Ldro");
  public static lordaeronSummerGrassyDirt: TerrainType = FourCC("Ldrg");
  public static lordaeronSummerRock: TerrainType = FourCC("Lrok");
  public static lordaeronSummerGrass: TerrainType = FourCC("Lgrs");
  public static lordaeronSummerDarkGrass: TerrainType = FourCC("Lgrd");

  // Lordaeron Fall
  public static lordaeronFallDirt: TerrainType = FourCC("Fdrt");
  public static lordaeronFallRoughDirt: TerrainType = FourCC("Fdro");
  public static lordaeronFallGrassyDirt: TerrainType = FourCC("Fdrg");
  public static lordaeronFallRock: TerrainType = FourCC("Frok");
  public static lordaeronFallGrass: TerrainType = FourCC("Fgrs");
  public static lordaeronFallDarkGrass: TerrainType = FourCC("Fgrd");

  // Lordaeron Winter
  public static lordaeronWinterDirt: TerrainType = FourCC("Wdrt");
  public static lordaeronWinterRoughDirt: TerrainType = FourCC("Wdro");
  public static lordaeronWinterGrassySnow: TerrainType = FourCC("Wsng");
  public static lordaeronWinterRock: TerrainType = FourCC("Wrok");
  public static lordaeronWinterGrass: TerrainType = FourCC("Wgrs");
  public static lordaeronWinterSnow: TerrainType = FourCC("Wsnw");

  // Barrens
  public static barrensDirt: TerrainType = FourCC("Bdrt");
  public static barrensRoughDirt: TerrainType = FourCC("Bdrh");
  public static barrensPebbles: TerrainType = FourCC("Bdrr");
  public static barrensGrassyDirt: TerrainType = FourCC("Bdrg");
  public static barrensDesert: TerrainType = FourCC("Bdsr");
  public static barrensDarkDesert: TerrainType = FourCC("Bdsd");
  public static barrensRock: TerrainType = FourCC("Bflr");
  public static barrensGrass: TerrainType = FourCC("Bgrr");

  // Ashenvale
  public static ashenvaleDirt: TerrainType = FourCC("Adrt");
  public static ashenvaleRoughDirt: TerrainType = FourCC("Adrd");
  public static ashenvaleGrass: TerrainType = FourCC("Agrs");
  public static ashenvaleRock: TerrainType = FourCC("Arck");
  public static ashenvaleLumpyGrass: TerrainType = FourCC("Agrd");
  public static ashenvaleVines: TerrainType = FourCC("Avin");
  public static ashenvaleGrassyDirt: TerrainType = FourCC("Adrg");
  public static ashenvaleLeaves: TerrainType = FourCC("Alvd");

  // Felwood
  public static felwoodDirt: TerrainType = FourCC("Cdrt");
  public static felwoodRoughDirt: TerrainType = FourCC("Cdrd");
  public static felwoodPoison: TerrainType = FourCC("Cpos");
  public static felwoodRock: TerrainType = FourCC("Crck");
  public static felwoodVines: TerrainType = FourCC("Cvin");
  public static felwoodGrass: TerrainType = FourCC("Cgrs");
  public static felwoodLeaves: TerrainType = FourCC("Clvg");

  // Northrend
  public static northrendDirt: TerrainType = FourCC("Ndrt");
  public static northrendDarkDirt: TerrainType = FourCC("Ndrd");
  public static northrendRock: TerrainType = FourCC("Nrck");
  public static northrendGrass: TerrainType = FourCC("Ngrs");
  public static northrendIce: TerrainType = FourCC("Nice");
  public static northrendSnow: TerrainType = FourCC("Nsnw");
  public static northrendRockySnow: TerrainType = FourCC("Nsnr");

  // Cityscape
  public static cityscapeDirt: TerrainType = FourCC("Ydrt");
  public static cityscapeRoughDirt: TerrainType = FourCC("Ydtr");
  public static cityscapeBlackMarble: TerrainType = FourCC("Yblm");
  public static cityscapeBrick: TerrainType = FourCC("Ybtl");
  public static cityscapeSquareTiles: TerrainType = FourCC("Ysqd");
  public static cityscapeRoundTiles: TerrainType = FourCC("Yrtl");
  public static cityscapeGrass: TerrainType = FourCC("Ygsb");
  public static cityscapeGrassTrim: TerrainType = FourCC("Yhdg");
  public static cityscapeWhiteMarble: TerrainType = FourCC("Ywmb");

  // Village
  public static villageDirt: TerrainType = FourCC("Vdrt");
  public static villageRoughDirt: TerrainType = FourCC("Vdrr");
  public static villageCrops: TerrainType = FourCC("Vcrp");
  public static villageCobblePath: TerrainType = FourCC("Vcbp");
  public static villageStonePath: TerrainType = FourCC("Vstp");
  public static villageShortGrass: TerrainType = FourCC("Vgrs");
  public static villageRocks: TerrainType = FourCC("Vrck");
  public static villageThickGrass: TerrainType = FourCC("Vgrt");

  // Village Fall
  public static villageFallDirt: TerrainType = FourCC("Qdrt");
  public static villageFallRoughDirt: TerrainType = FourCC("Qdrr");
  public static villageFallCrops: TerrainType = FourCC("Qcrp");
  public static villageFallCobblePath: TerrainType = FourCC("Qcbp");
  public static villageFallStonePath: TerrainType = FourCC("Qstp");
  public static villageFallShortGrass: TerrainType = FourCC("Qgrs");
  public static villageFallRocks: TerrainType = FourCC("Qrck");
  public static villageFallThickGrass: TerrainType = FourCC("Qgrt");

  // Dalaran
  public static dalaranDirt: TerrainType = FourCC("Xdrt");
  public static dalaranRoughDirt: TerrainType = FourCC("Xdtr");
  public static dalaranBlackMarble: TerrainType = FourCC("Xblm");
  public static dalaranBrickTiles: TerrainType = FourCC("Xbtl");
  public static dalaranSquareTiles: TerrainType = FourCC("Xsqd");
  public static dalaranRoundTiles: TerrainType = FourCC("Xrtl");
  public static dalaranGrass: TerrainType = FourCC("Xgsb");
  public static dalaranTrimGrass: TerrainType = FourCC("Xhdg");
  public static dalaranWhiteMarble: TerrainType = FourCC("Xwmb");

  // Dungeon
  public static dungeonDirt: TerrainType = FourCC("Ddrt");
  public static dungeonBrick: TerrainType = FourCC("Dbrk");
  public static dungeonRedStones: TerrainType = FourCC("Drds");
  public static dungeonLavaCracks: TerrainType = FourCC("Dlvc");
  public static dungeonLava: TerrainType = FourCC("Dlav");
  public static dungeonDarkRocks: TerrainType = FourCC("Ddkr");
  public static dungeonGreyStones: TerrainType = FourCC("Dgrs");
  public static dungeonSquareTiles: TerrainType = FourCC("Dsqd");

  // Underground
  public static undergroundDirt: TerrainType = FourCC("Gdrt");
  public static undergroundBrick: TerrainType = FourCC("Gbrk");
  public static undergroundRedStones: TerrainType = FourCC("Grds");
  public static undergroundLavaCracks: TerrainType = FourCC("Glvc");
  public static undergroundLava: TerrainType = FourCC("Glav");
  public static undergroundDarkRocks: TerrainType = FourCC("Gdkr");
  public static undergroundGreyStones: TerrainType = FourCC("Ggrs");
  public static undergroundSquareTiles: TerrainType = FourCC("Gsqd");

  // Sunken Ruins
  public static sunkenRuinsDirt: TerrainType = FourCC("Zdrt");
  public static sunkenRuinsRoughDirt: TerrainType = FourCC("Zdtr");
  public static sunkenRuinsGrassyDirt: TerrainType = FourCC("Zdrg");
  public static sunkenRuinsSmallBricks: TerrainType = FourCC("Zbks");
  public static sunkenRuinsSand: TerrainType = FourCC("Zsan");
  public static sunkenRuinsLargeBricks: TerrainType = FourCC("Zbkl");
  public static sunkenRuinsRoundTiles: TerrainType = FourCC("Ztil");
  public static sunkenRuinsGrass: TerrainType = FourCC("Zgrs");
  public static sunkenRuinsDarkGrass: TerrainType = FourCC("Zvin");

  // Icecrown Glacier
  public static icecrownGlacierDirt: TerrainType = FourCC("Idrt");
  public static icecrownGlacierRoughDirt: TerrainType = FourCC("Idtr");
  public static icecrownGlacierDarkIce: TerrainType = FourCC("Idki");
  public static icecrownGlacierBlackBricks: TerrainType = FourCC("Ibkb");
  public static icecrownGlacierRuneBricks: TerrainType = FourCC("Irbk");
  public static icecrownGlacierTiledBricks: TerrainType = FourCC("Itbk");
  public static icecrownGlacierIce: TerrainType = FourCC("Iice");
  public static icecrownGlacierBlackSquares: TerrainType = FourCC("Ibsq");
  public static icecrownGlacierSnow: TerrainType = FourCC("Isnw");

  // Outland
  public static outlandDirt: TerrainType = FourCC("Odrt");
  public static outlandLightDirt: TerrainType = FourCC("Odtr");
  public static outlandRoughDirt: TerrainType = FourCC("Osmb");
  public static outlandCrackedDirt: TerrainType = FourCC("Ofst");
  public static outlandFlatStones: TerrainType = FourCC("Olgb");
  public static outlandRock: TerrainType = FourCC("Orok");
  public static outlandLightFlatStones: TerrainType = FourCC("Ofsl");
  public static outlandAbyss: TerrainType = FourCC("Oaby");

  // Black Citadel
  public static blackCitadelDirt: TerrainType = FourCC("Kdrt");
  public static blackCitadelLightDirt: TerrainType = FourCC("Kfsl");
  public static blackCitadelRoughDirt: TerrainType = FourCC("Kdtr");
  public static blackCitadelFlatStones: TerrainType = FourCC("Kfst");
  public static blackCitadelSmallBricks: TerrainType = FourCC("Ksmb");
  public static blackCitadelLargeBricks: TerrainType = FourCC("Klgb");
  public static blackCitadelSquareTiles: TerrainType = FourCC("Ksqt");
  public static blackCitadelDarkTiles: TerrainType = FourCC("Kdkt");

  // Dalaran Ruins
  public static dalaranRuinsDirt: TerrainType = FourCC("Jdrt");
  public static dalaranRuinsRoughDirt: TerrainType = FourCC("Jdtr");
  public static dalaranRuinsBlackMarble: TerrainType = FourCC("Jblm");
  public static dalaranRuinsBrickTiles: TerrainType = FourCC("Jbtl");
  public static dalaranRuinsSquareTiles: TerrainType = FourCC("Jsqd");
  public static dalaranRuinsRoundTiles: TerrainType = FourCC("Jrtl");
  public static dalaranRuinsGrass: TerrainType = FourCC("Jgsb");
  public static dalaranRuinsTrimGrass: TerrainType = FourCC("Jhdg");
  public static dalaranRuinsWhiteMarble: TerrainType = FourCC("Jwmb");

  // Cliffs
  public static ashenvaleDirtCliff: TerrainType = FourCC("cAc2");
  public static ashenvaleGrassCliff: TerrainType = FourCC("cAc1");
  public static barrensDesertCliff: TerrainType = FourCC("cBc2");
  public static barrensGrassCliff: TerrainType = FourCC("cBc1");
  public static blackCitadelDirtCliff: TerrainType = FourCC("cKc1");
  public static blackCitadelDarkTilesCliff: TerrainType = FourCC("cKc2");
  public static cityscapeDirtCliff: TerrainType = FourCC("cYc2");
  public static cityscapeSquareTilesCliff: TerrainType = FourCC("cYc1");
  public static dalaranDirtCliff: TerrainType = FourCC("cXc2");
  public static dalaranSquareTilesCliff: TerrainType = FourCC("cXc1");
  public static dalaranRuinsDirtCliff: TerrainType = FourCC("cJc2");
  public static dalaranRuinsSquareTilesCliff: TerrainType = FourCC("cJc1");
  public static dungeonDirtCliff: TerrainType = FourCC("cDc2");
  public static dungeonSquareTilesCliff: TerrainType = FourCC("cDc1");
  public static felwoodDirtCliff: TerrainType = FourCC("cCc2");
  public static felwoodGrassCliff: TerrainType = FourCC("cCc1");
  public static icecrownGlacierRuneBricksCliff: TerrainType = FourCC("cIc2");
  public static icecrownGlacierSnowCliff: TerrainType = FourCC("cIc1");
  public static lordaeronFallDirtCliff: TerrainType = FourCC("cFc2");
  public static lordaeronFallGrassCliff: TerrainType = FourCC("cFc1");
  public static lordaeronSummerDirtCliff: TerrainType = FourCC("cLc2");
  public static lordaeronSummerGrassCliff: TerrainType = FourCC("cLc1");
  public static lordaeronWinterGrassCliff: TerrainType = FourCC("cWc2");
  public static lordaeronWinterSnowCliff: TerrainType = FourCC("cWc1");
  public static northrendDirtCliff: TerrainType = FourCC("cNc2");
  public static northrendSnowCliff: TerrainType = FourCC("cNc1");
  public static outlandAbyssCliff: TerrainType = FourCC("cOc1");
  public static outlandRoughDirtCliff: TerrainType = FourCC("cOc2");
  public static sunkenRuinsDirtCliff: TerrainType = FourCC("cZc2");
  public static sunkenRuinsLargeBricksCliff: TerrainType = FourCC("cZc1");
  public static undergroundDirtCliff: TerrainType = FourCC("cGc2");
  public static undergroundSquareTilesCliff: TerrainType = FourCC("cGc1");
  public static villageDirtCliff: TerrainType = FourCC("cVc2");
  public static villageGrassThickCliff: TerrainType = FourCC("cVc1");
  public static villageFallDirtCliff: TerrainType = FourCC("cQc2");
  public static villageFallGrassThickCliff: TerrainType = FourCC("cQc1");
}
