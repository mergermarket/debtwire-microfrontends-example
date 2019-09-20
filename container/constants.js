const SUB_EDITION_LIST = ['8_32768', '8_131072', '8_8388608']

const SUB_EDITION_TO_PARENT = { '8_32768': '8_8', '8_131072': '8_2', '8_8388608': '8_1' }

const STATUS_CODE = {
  OK: 200,
  Created: 201,
  NotFound: 404,
  Forbidden: 403,
  BadRequest: 400,
  InternalError: 500,
  NotImplemented: 501
}

Object.freeze(STATUS_CODE)

const PRODUCTS = {
  1: 'Mergermarket',
  2: 'Dealreporter',
  8: 'Debtwire',
  16: 'Wealthmonitor',
  32: 'Primary Issuance',
  64: 'BioPharm',
  256: 'Abs',
  512: 'Municipals',
  1024: 'Infinata Feed',
  2048: 'PaRR',
  4096: 'Analytics'
}

Object.freeze(PRODUCTS)

const EDITIONS = {
  1: 'Europe',
  2: 'North America',
  4: 'Latin America',
  8: 'Asia',
  16: 'Middle East Africa',
  32: 'Middle East',
  42: 'Global(No Edition)',
  64: 'EEMEA',
  128: 'MENA',
  256: 'GCC',
  1024: 'ME',
  2048: 'EE',
  4096: 'Africa',
  8192: 'North Africa',
  16384: 'Russia',
  32768: 'Asia Loans',
  65536: 'ECM',
  131072: 'Middle Market',
  262144: 'BRICS',
  524288: 'Greater China',
  1048576: 'SE Asia',
  2097152: 'Advanced Economies (TWN, KOR, JPN)',
  4194304: 'South Asia (IND)',
  8388608: 'Middle Market Europe',
  536870912: 'Equity/Hybrid Content Upgrade'
}

const DEBTWIRE_IDS = [
  '8_1',
  '8_2',
  '8_4',
  '8_8',
  '8_64',
  '32_1',
  '32_2',
  '32_4',
  '32_8',
  '32_64',
  '32_131072',
  '32_8388608',
  '128_1',
  '128_2',
  '128_8',
  '256_1',
  '256_2',
  '512_1',
  '512_2',
  '4096_1',
  '4096_2',
  '4096_8',
  '8_32768',
  '8_131072',
  '8_8388608'
]

Object.freeze(EDITIONS)

const HOMEPAGES = {
  '8_2': { link: 'us.debtwire.com', title: 'North America', position: 10 },
  '8_1': { link: 'eu.debtwire.com', title: 'Europe', position: 20 },
  '8_4': { link: 'latam.debtwire.com', title: 'Latin America', position: 40 },
  '8_8': { link: 'asia.debtwire.com', title: 'Asia-Pacific', position: 30 },
  '8_64': { link: 'ceemea.debtwire.com', title: 'CEEMEA', position: 50 },
  '256_1': { link: 'abs.debtwire.com', title: 'ABS', position: 60 },
  '256_2': { link: 'abs.debtwire.com', title: 'ABS', position: 60 },
  '512_2': { link: 'municipals.debtwire.com', title: 'Municipals', position: 70 },
  '4096_1': { link: 'debtwire.com', title: 'Analytics', position: 80 },
  '4096_2': { link: 'debtwire.com', title: 'Analytics', position: 80 },
  '4096_8': { link: 'debtwire.com', title: 'Analytics', position: 80 },
  '32_1': { title: 'Primary Issuance', position: 90 },
  '32_2': { title: 'Primary Issuance', position: 90 },
  '32_4': { title: 'Primary Issuance', position: 90 },
  '32_8': { title: 'Primary Issuance', position: 90 },
  '32_64': { title: 'Primary Issuance', position: 90 },
  '32_131072': { title: 'Primary Issuance', position: 90 },
  '32_8388608': { title: 'Primary Issuance', position: 90 }
}

Object.freeze(HOMEPAGES)

module.exports = {
  municipalsSubscription: '512_2',
  STATUS_CODE,
  EDITIONS,
  PRODUCTS,
  DEBTWIRE_IDS,
  HOMEPAGES,
  SUB_EDITION_LIST,
  SUB_EDITION_TO_PARENT
}
