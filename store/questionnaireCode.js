export const state = () => ({
  codes: {
    Code1: {
      OFFICER: 'officer',
      ADVISER_ELDER: 'adviser/elder',
      COMMITTEE_MEMBER: 'committee member',
      MEMBER: 'member',
      COORDINATOR: 'coordinator',
      OTHERS: 'others',
    },
    Code2: {
      COOPERATIVE: 'cooperative',
      ASSOCIATION: 'association',
      OTHERS: 'others',
    },
    Code3_4: {
      ACTIVE: 'active',
      INACTIVE: 'inactive',
    },
    Code5FarmImplementsTools: {
      HAND_HOE: 'hand hoe',
      SPADE_SHOVEL: 'spade/shovel',
      WEED_SLASHER: 'weed slasher',
      SICKLE: 'sickle',
      WATERING_CAN: 'watering can',
      PANGA_KNIFE: 'panga knife',
      RAKE: 'rake',
      AXE: 'axe',
      PLOUGH: 'plough',
      KNAPSACK_SPRAYER: 'knapsack sprayer',
      TREADLE_PUMP: 'treadle pump',
      WHEELBARROW_CART: 'wheelbarrow/cart',
    },
    Code5FarmMachinery: {
      TRACTOR: 'tractor',
      TRACTOR_PLOUGH: 'tractor plough',
      RIDGER: 'ridger',
      GENERATOR: 'generator',
      MOTORIZED_PLUMP: 'motorized plump',
    },
    Code5PoultryAndLivestock: {
      CARABAO: 'carabao',
      COW: 'cow',
      GOAT: 'goat',
      HOG_PIG: 'hog/pig',
      CHICKEN: 'chicken',
      DUCK: 'duck',
      QUAIL: 'quail',
      TURKEY: 'turkey',
      HORSE: 'horse',
    },
    Code5StructuresBuilding: {
      PIGPEN: 'pigpen',
      POULTRY_KRAAL_FENCE: 'poultry kraal/fence',
      LIVESTOCK_FENCES: 'livestock fences',
      BARN: 'barn',
      STORAGE_HOUSE: 'storage house',
      OWNLAND: 'ownland',
      CHICKEN_HOUSE: 'chicken house',
      OTHERS: 'others',
    },
    Code6: {
      OWN_HOUSE_AND_LOT: 'own or owner-like possession of house and lot',
      OWN_HOUSE_RENT_LOT: 'own house, rent lot',
      OWN_HOUSE_RENT_FREE_WITH_CONSENT:
        'own house, rent-free lot with consent of owner',
      OWN_HOUSE_RENT_FREE_WITHOUT_CONSENT:
        'own house, rent-free lot without consent of owner',
      RENT_FREE_WITH_CONSENT: 'rent-free house and lot with consent of owner',
      RENT_FREE_WITHOUT_CONSENT:
        'rent-free house and lot without consent of owner',
      OTHERS: 'others',
    },
    Code7_8: {
      STRONG_MATERIALS: 'strong materials',
      LIGHT_MATERIALS: 'light materials',
      SALVAGED_MATERIALS: 'salvaged/makeshift materials',
      MIXED_STRONG: 'mixed but predominantly strong materials',
      MIXED_LIGHT: 'mixed but predominantly light materials',
      MIXED_SALVAGED: 'mixed but predominantly salvaged materials',
      OTHERS: 'others',
    },
    Code9: {
      NONE: 'none',
      FLUSH_TOILET: 'flush toilet',
      POUR_FLUSH_INSIDE_HOUSE: 'pour flush toilet inside the house',
      POUR_FLUSH_OUTSIDE_ROOF: 'pour flush toilet outside the house with roof',
      POUR_FLUSH_OUTSIDE_NO_ROOF:
        'pour flush toilet outside the house without roof',
      TRADITIONAL_LATRINE_INSIDE: 'traditional latrine inside the house',
      TRADITIONAL_LATRINE_OUTSIDE_ROOF:
        'traditional latrine outside the house with roof',
      TRADITIONAL_LATRINE_OUTSIDE_NO_ROOF:
        'traditional latrine outside the house without roof',
      OTHERS: 'others',
    },
    Code10: {
      ELECTRICITY_BULB: 'electricity bulb',
      KEROSENE_LAMP: 'kerosene lamp',
      SOLAR_POWERED_LAMPS: 'solar powered lamps',
      PARAFFIN_CANDLE: 'paraffin/candle',
      OIL_LAMP: 'oil lamp',
      OTHERS: 'others',
    },
    Code11: {
      COLLECTED_FIREWOOD: 'collected firewood',
      PURCHASED_FIREWOOD: 'purchased firewood',
      KEROSENE: 'kerosene',
      ELECTRICITY: 'electricity',
      LPG: 'lpg',
      CHARCOAL: 'charcoal',
      CROP_RESIDUE: 'crop residue',
      SAW_DUST: 'saw dust',
      OTHERS: 'others',
    },
    Code12: {
      PIPED_INTO_DWELLING: 'piped into dwelling',
      PIPED_INTO_YARD: 'piped into yard/plot',
      COMMUNAL_STANDPIPE: 'communal standpipe',
      OPEN_WELL: 'open well',
      PROTECTED_WELL: 'protected well',
      BOREHOLE: 'borehole',
      SPRING: 'spring',
      RIVER_STREAM: 'river/stream',
      POND_LAKE: 'pond/lake',
      DAM: 'dam',
      RAINWATER: 'rainwater',
      TANKER_TRUCK: 'tanker truck/bowser',
      BOTTLED_WATER: 'bottled water',
      OTHERS: 'others',
    },
    Code13: {
      LAND_OWNER: 'land owner',
      SHARE_TENANT: 'share tenant',
      LEASEHOLDER: 'leaseholder/rented-in',
      LENT_OUT: 'lent out',
      RENTED_OUT: 'rented out',
      FREE_ACCESS: 'free access/use',
      LAND_TRANSFER: 'land transfer',
      CARETAKER: 'caretaker',
      FARM_WORKER: 'farm worker',
      OTHERS: 'others',
    },
    Code14: {
      DEEP_WELLS: 'deep wells',
      PUMPED_WELLS: 'pumped wells',
      PIPED_FAUCET: 'piped/faucet',
      SPRINGS: 'springs',
      RIVER_CREEK_POND: 'river/creek/pond',
      RAINWATER_RAINFED: 'rainwater/rainfed',
      IRRIGATION_SYSTEM: 'irrigation system',
      OTHERS: 'others',
    },
    Code15: {
      CULTIVATED: 'cultivated',
      PERMANENT_CROPLAND: 'permanent cropland',
      PERMANENT_PASTURE: 'permanent pasture',
      FOREST_LAND: 'forest land',
      FALLOW: 'fallow',
      OTHERS: 'others',
    },
    Code16A: {
      CERTIFIED_MOTHER_PLANT_GARDEN:
        'purchased from a certified mother plant garden',
      PURCHASED_OR_EXCHANGED_FROM_OTHER_FARMER:
        'purchased or exchanged seeds from other farmer',
      GOOD_QUALITY_SEED_OR_FARM_LOT_WITH_PROPER_ROUGING:
        'using good quality seed or from a farm lot with proper rouging',
      HOME_SAVED_SEEDS_SEVERAL_SEASONS:
        'home saved – seeds or seeds for several seasons',
      PROVIDED_FOR_FREE: 'provided for free',
      LOANED: 'loaned',
      OTHERS: 'others',
    },
    Code16B: {
      RECOMMENDED_BY_OTHER_FARMER: 'recommended by other farmer',
      RECOMMENDED_BY_FAMILY_MEMBER: 'recommended by family member',
      OTHERS: 'others',
    },
    Code17: {
      METER: 'meter',
      KILOMETER: 'kilometer',
    },
    Code18: {
      WALK: 'walk',
      RIDING_ANIMALS: 'riding animals',
      BICYCLE: 'bicycle',
      MOTORCYCLE: 'motorized vehicle 2-wheeled',
      TRICYCLE: 'motorized vehicle 3-wheeled',
      FOUR_WHEELS_OR_BIGGER: 'motorized vehicle 4-wheeled or bigger',
      OTHERS: 'others',
    },
    Code19: {
      DIRT_ROAD: 'dirt road',
      GRAVEL_ALL_WEATHER: 'gravel/all-weather',
      CONCRETE: 'concrete',
      ASPHALT: 'asphalt',
      OTHERS: 'others',
    },
    Code20: {
      LAND_PREPARATION: 'land preparation',
      PLANTING: 'planting',
      WATERING_IRRIGATION: 'watering/irrigation',
      WEEDING: 'weeding',
      FERTILIZER_APPLICATION: 'fertilizer application',
      DISEASE_MANAGEMENT: 'disease management',
      HARVESTING: 'harvesting',
      PRUNING: 'pruning',
      DRYING: 'drying',
      HULLING: 'hulling',
      POLISHING_CLEANING: 'polishing and cleaning',
      SORTING: 'sorting',
      MARKETING: 'marketing',
      OTHERS: 'others',
    },
    Code21A: {
      SEEDS: 'seeds',
      SEEDLINGS: 'seedlings',
      ASEXUALLY_PROPAGATED_MATERIALS: 'asexually propagated materials',
    },
    Code21B: {
      ARABICA: 'arabica',
      ROBUSTA: 'robusta',
      LIBERICA: 'liberica',
      EXCELSA: 'excelsa',
    },
    Code21C: {
      ZERO_TILLAGE: 'zero tillage',
      SLASH_AND_BURN: 'slash and burn',
      CLEARING: 'clearing',
      CONVENTIONAL_TILLAGE: 'conventional tillage',
      CONSERVATION_TILLAGE: 'conservation tillage',
      CONTOUR_PLOWING: 'contour plowing',
      OTHERS: 'others',
    },
    Code21D: {
      EAST_WEST: 'east-west',
      NORTH_SOUTH: 'north-south',
    },
    Code21E: {
      PHYSICAL: 'physical',
      MECHANICAL: 'mechanical',
      CHEMICAL: 'chemical',
      BIOLOGICAL: 'biological',
      CULTURAL: 'cultural',
      GENETICS: 'genetics',
      OTHERS: 'others',
    },
    Code21F: {
      BROADCAST: 'broadcast',
      LOCALIZED_PLACEMENT: 'localized placement',
      BAND_PLACEMENT: 'band placement',
      FOLIAR_APPLICATION: 'foliar application',
      FERTIGATION: 'fertigation',
    },
    Code22: {
      FAMILY_LABOR: 'family labor',
      HIRED_LABOR: 'hired labor',
      BAYANIHAN_LABOR: 'bayanihan labor',
    },
    Code23: {
      DEFOLIATORS: 'defoliators',
      LEAF_FOLDERS: 'leaf folders',
      FRUIT_BORER: 'fruit borer',
      STEM_BORER: 'stem borer',
      ROOT_GRUBS: 'root grubs',
      FOLIAR_DISEASE: 'foliar disease',
      FRUIT_DISEASE: 'fruit disease',
      STEM_DISEASE: 'stem disease',
      WILTING: 'wilting',
    },
    Code24: {
      SEEDLING: 'seedling',
      TRANSPLANTING: 'transplanting',
      VEGETATIVE: 'vegetative',
      FLOWERING: 'flowering',
      FRUITING: 'fruiting',
      SENESCENCE: 'senescence',
    },
    Code25: {
      PHYSICAL: 'physical',
      MECHANICAL: 'mechanical',
      CHEMICAL: 'chemical',
      BIOLOGICAL: 'biological',
      CULTURAL: 'cultural',
      GENETICS: 'genetics',
      OTHERS: 'others',
    },
    Code26: {
      NOT_EFFECTIVE: 'not effective',
      MODERATELY_EFFECTIVE: 'moderately effective',
      HIGHLY_EFFECTIVE: 'highly effective',
    },
    Code27: {
      OWN_FUNDS: 'own funds',
      BORROWED_FUNDS: 'borrowed funds',
      MIXED_FUNDS: 'mixed funds',
    },
    // TODO:
    Rate: {
      STRONGLY_AGREEE: 'strongly agree',
      AGREE: 'agree',
      NEUTRAL: 'neutral',
      DISAGREE: 'disagree',
      STRONGLY_DISAGREE: 'strongly disgaree',
    },
    Sex: {
      FEMALE: 'female',
      MALE: 'male',
    },
    Agree: {
      YES: 'yes',
      NO: 'no',
      PARTIALLY: 'partially',
    },
    PrintMaterials: {
      NEWSPAPER: 'newspaper',
      BROCHURES: 'brochures',
      PAMPHLETS: 'pamphlets',
      MAGAZINES: 'magazines',
    },
    PestControlAdvice: {
      NEIGHBOR: 'neighbor',
      EXTENSION_TECHNICIAN: 'extension technician',
      RELATIVES: 'relatives',
      PESTICIDE_SALES_AGENTS: 'pesticide sales agents',
      MASS_MEDIA: 'mass media',
      OTHERS: 'others',
    },
    PesticideConsideration: {
      PRICE: 'price',
      EFFECTIVENESS: 'effectiveness (killing efficiency)',
      PACKAGING: 'packaging',
      ENDORSEMENT_BY_SALES_AGENT: 'endorsement by the sales agent',
      OTHERS: 'others',
    },
    PesticideInformationSource: {
      NEIGHBOR_OR_OTHER_FARMERS: 'neighbor/other farmers',
      EXTENSION_TECHNICIAN: 'extension technician',
      PESTICIDE_SALES_AGENTS: 'pesticide sales agents',
      GROUP: 'group',
      MASS_MEDIA: 'mass media',
    },
    SprayingEquipment: {
      KNAPSACK: 'knapsack',
      HAND_SPRAYER: 'hand sprayer',
      OTHER: 'other',
    },
    AgriWasteReutilizationInformationSource: {
      SOCIAL_MEDIA: 'social media',
      OWN_KNOWLEDGE: 'own knowledge',
      TV_ADVERTISEMENT: 'TV/advertisement',
      SCHOOL_UNIVERSITY_INSTITUTION: 'school/university/institution',
      TRAINING: 'training',
      EXPERIENCE_FROM_OTHERS: 'experience from others',
      OTHERS: 'others',
    },
    WasteDisposalMethod: {
      THROW_AWAY_VACANT_LOT: 'throw away in a vacant lot far from people',
      STORED_FOR_REUSE: 'stored for reutilization',
      BURY_WASTE_DISPOSAL_AREA: 'bury in waste disposal area in the farm',
      COLLECTED_GARBAGE_COLLECTORS: 'collected by garbage collectors',
      BURN_AGRI_WASTE: 'burn the agri-waste',
      OTHERS: 'others',
    },
    AgriculturalSystem: {
      CROP_PRODUCTION: 'crop production',
      LIVESTOCK_PRODUCTION: 'livestock production',
      AQUACULTURE: 'aquaculture',
      AGROFORESTRY: 'agroforestry',
      OTHERS: 'others',
    },
    Topography: {
      FLAT_PLAIN: 'flat/plain',
      HILLY_ROLLING: 'hilly/rolling',
      STEEP_MOUNTAINOUS: 'steep/mountainous',
      OTHERS: 'others',
    },
    SoilFertility: {
      VERY_FERTILE: 'very fertile',
      MODERATE: 'moderate',
      POOR: 'poor',
      VER_POOR: 'very poor',
      NOT_PRODUCTIVE: 'not productive',
    },
    CroppingSystem: {
      MONO_CROPPING: 'mono-cropping',
      MULTIPLE_DIVERSIFIED_CROPPING: 'multiple/diversified cropping',
      INTERCROPPING: 'intercropping',
      RELAY_CROPPING: 'relay cropping',
      OTHERS: 'others',
    },
  },
})

/* this function gets the values of 
the object and convert it into array and return it */
function generateArray(object) {
  const keys = Object.keys(object)
  const array = []
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      array.push(object[keys[i]])
    }
  }
  return array
}

export const getters = {
  Code1(state) {
    return generateArray(state.codes.Code1)
  },
  Code2(state) {
    return generateArray(state.codes.Code2)
  },
  Code3_4(state) {
    return generateArray(state.codes.Code3_4)
  },
  Code5FarmImplementsTools(state) {
    return generateArray(state.codes.Code5FarmImplementsTools)
  },
  Code5FarmMachinery(state) {
    return generateArray(state.codes.Code5FarmMachinery)
  },
  Code5PoultryAndLivestock(state) {
    return generateArray(state.codes.Code5PoultryAndLivestock)
  },
  Code5StructuresBuilding(state) {
    return generateArray(state.codes.Code5StructuresBuilding)
  },
  Code6(state) {
    return generateArray(state.codes.Code6)
  },
  Code7_8(state) {
    return generateArray(state.codes.Code7_8)
  },
  Code9(state) {
    return generateArray(state.codes.Code9)
  },
  Code10(state) {
    return generateArray(state.codes.Code10)
  },
  Code11(state) {
    return generateArray(state.codes.Code11)
  },
  Code12(state) {
    return generateArray(state.codes.Code12)
  },
  Code13(state) {
    return generateArray(state.codes.Code13)
  },
  Code14(state) {
    return generateArray(state.codes.Code14)
  },
  Code15(state) {
    return generateArray(state.codes.Code15)
  },
  Code16A(state) {
    return state.codes.Code16A
  },
  Code16B(state) {
    return state.codes.Code16B
  },
  Code17(state) {
    return state.codes.Code17
  },
  Code18(state) {
    return state.codes.Code18
  },
  Code19(state) {
    return state.codes.Code19
  },
  Code20(state) {
    return state.codes.Code20
  },
  Code21A(state) {
    return state.codes.Code21A
  },
  Code21B(state) {
    return state.codes.Code21B
  },
  Code21C(state) {
    return state.codes.Code21C
  },
  Code21D(state) {
    return state.codes.Code21D
  },
  Code21E(state) {
    return state.codes.Code21E
  },
  Code21F(state) {
    return state.codes.Code21F
  },
  Code22(state) {
    return state.codes.Code22
  },
  Code23(state) {
    return state.codes.Code1
  },
  Code24(state) {
    return state.codes.Code1
  },
  Code25(state) {
    return state.codes.Code1
  },
  Code26(state) {
    return state.codes.Code1
  },
  Code27(state) {
    return state.codes.Code1
  },
  // TODO:
  Rate() {},
  Sex() {},
  Agree() {},
  PrintMaterials() {},
  PestControlAdvice() {},
  PesticideConsideration() {},
  PesticideInformationSource() {},
  SprayingEquipment() {},
  AgriWasteReutilizationInformationSource() {},
  WasteDisposalMethod() {},
  AgriculturalSystem() {},
  Topography(state) {
    return generateArray(state.codes.Topography)
  },
  SoilFertility(state) {
    return generateArray(state.codes.SoilFertility)
  },
  CroppingSystem() {},
}

export const mutations = {}

export const actions = {}
