// CO2, CH4, N2O
export const EMISSION_EQUIVALENCY = Object.freeze([1, 25, 298])

interface EmissionConfig {
  name: string
  unit: 'gallon' | 'scf' | 'g/mile'
  factor: [number, number, number] // [CO2, CH4, N2O] emissions
  suboption?: EmissionFactor['id']
}
export interface EmissionFactor {
  id: number
  name: string
  property: string
  multiplierDescription?: string
  options: EmissionConfig[]
}
/**
 * Static partial data from Table 2 and Table 3 from the link:
 * https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf
 * It is organized as data is connected to each other, being appended to data selected from
 * Table 2 (the first object in this array, with id=2).
 * if fetched from a database, and the `options` object is each row from the table. Tables that
 * have further subdivisions like Table 3 can be organized as multiple object being linked with
 * the `suboption` id within the `options` object.
 * `factor` is the value from each pollutant CO2, CH4 and N2) respectively, which should be
 * multiplied by EMISSION_EQUIVALENCY to get total CO2e.
 */
export const EMISSION_FACTORS: readonly EmissionFactor[] = Object.freeze([
  {
    id: 2,
    name: 'Mobile Combustion CO2',
    property: 'Fuel Type',
    multiplierDescription: 'Average yearly units',
    options: [
      { name: 'Aviation Gasoline', factor: [8.31, 0, 0], unit: 'gallon' },
      { name: 'Biodiesel (100%)', factor: [9.45, 0, 0], unit: 'gallon' }, // Link data from Table 4
      { name: 'Compressed Natural Gas (CNG)', factor: [0.05444, 0, 0], unit: 'scf' },
      { name: 'Diesel Fuel', factor: [10.21, 0, 0], unit: 'gallon' }, // Link data from Table 4
      { name: 'Ethanol (100%)', factor: [5.75, 0, 0], unit: 'gallon' }, // Link data from Table 4
      { name: 'Kerosene-Type Jet Fuel', factor: [9.75, 0, 0], unit: 'gallon' },
      { name: 'Liquefied Natural Gas (LNG)', factor: [4.5, 0, 0], unit: 'gallon' }, // Link data from Table 4
      { name: 'Liquefied Petroleum Gases (LPG)', factor: [5.68, 0, 0], unit: 'gallon' }, // Link data from Table 4
      { name: 'Motor Gasoline', factor: [8.78, 0, 0], unit: 'gallon', suboption: 3 },
      { name: 'Residual Fuel Oil', factor: [11.27, 0, 0], unit: 'gallon' },
    ],
  },
  {
    id: 3,
    name: 'Mobile Combustion CH4 and N2O for On-Road Gasoline Vehicles',
    property: 'Vehicle Type',
    options: [
      { name: 'Gasoline Passenger Cars', factor: [0, 0, 0], unit: 'g/mile', suboption: 31 },
      { name: 'Gasoline Light-Duty Trucks (Vans, Pickup Trucks, SUVs)', factor: [0, 0, 0], unit: 'g/mile', suboption: 32 },
      { name: 'Gasoline Heavy-Duty Vehicles', factor: [0, 0, 0], unit: 'g/mile', suboption: 33 },
      { name: 'Gasoline Motorcycles', factor: [0, 0, 0], unit: 'g/mile', suboption: 34 },
    ],
  },
  {
    id: 31,
    name: 'Gasoline Passenger Cars',
    property: 'Year',
    options: [
      { name: '1973-1974', factor: [0, 0.1696, 0.0197], unit: 'g/mile' },
      { name: '1975', factor: [0, 0.1423, 0.0443], unit: 'g/mile' },
      { name: '1976-1977', factor: [0, 0.1406, 0.0458], unit: 'g/mile' },
      { name: '1978-1979', factor: [0, 0.1389, 0.0473], unit: 'g/mile' },
      { name: '1980', factor: [0, 0.1326, 0.0499], unit: 'g/mile' },
      { name: '1981', factor: [0, 0.0802, 0.0626], unit: 'g/mile' },
      { name: '1982', factor: [0, 0.0795, 0.0627], unit: 'g/mile' },
      { name: '1983', factor: [0, 0.0782, 0.063], unit: 'g/mile' },
      { name: '1984-1993', factor: [0, 0.0704, 0.0647], unit: 'g/mile' },
      { name: '1994', factor: [0, 0.0617, 0.0603], unit: 'g/mile' },
      { name: '1995', factor: [0, 0.0531, 0.056], unit: 'g/mile' },
      { name: '1996', factor: [0, 0.0434, 0.0503], unit: 'g/mile' },
      { name: '1997', factor: [0, 0.0337, 0.0446], unit: 'g/mile' },
      { name: '1998', factor: [0, 0.024, 0.0389], unit: 'g/mile' },
      { name: '1999', factor: [0, 0.0215, 0.0355], unit: 'g/mile' },
      { name: '2000', factor: [0, 0.0175, 0.0304], unit: 'g/mile' },
      { name: '2001', factor: [0, 0.0105, 0.0212], unit: 'g/mile' },
      { name: '2002', factor: [0, 0.0102, 0.0207], unit: 'g/mile' },
      { name: '2003', factor: [0, 0.0095, 0.0181], unit: 'g/mile' },
      { name: '2004', factor: [0, 0.0078, 0.0085], unit: 'g/mile' },
      { name: '2005', factor: [0, 0.0075, 0.0067], unit: 'g/mile' },
      { name: '2006', factor: [0, 0.0076, 0.0075], unit: 'g/mile' },
      { name: '2007', factor: [0, 0.0072, 0.0052], unit: 'g/mile' },
      { name: '2008', factor: [0, 0.0072, 0.0049], unit: 'g/mile' },
      { name: '2009', factor: [0, 0.0071, 0.0046], unit: 'g/mile' },
      { name: '2010', factor: [0, 0.0071, 0.0046], unit: 'g/mile' },
      { name: '2011', factor: [0, 0.0071, 0.0046], unit: 'g/mile' },
      { name: '2012', factor: [0, 0.0071, 0.0046], unit: 'g/mile' },
      { name: '2013', factor: [0, 0.0071, 0.0046], unit: 'g/mile' },
      { name: '2014', factor: [0, 0.0071, 0.0046], unit: 'g/mile' },
      { name: '2015', factor: [0, 0.0068, 0.0042], unit: 'g/mile' },
      { name: '2016', factor: [0, 0.0065, 0.0038], unit: 'g/mile' },
      { name: '2017', factor: [0, 0.0054, 0.0018], unit: 'g/mile' },
      { name: '2018', factor: [0, 0.0052, 0.0016], unit: 'g/mile' },
      { name: '2019', factor: [0, 0.0051, 0.0015], unit: 'g/mile' },
      { name: '2020', factor: [0, 0.005, 0.0014], unit: 'g/mile' },
    ],
  },
  {
    id: 32,
    name: 'Gasoline Light-Duty Trucks (Vans, Pickup Trucks, SUVs)',
    property: 'Year',
    options: [
      { name: '1973-1974', factor: [0, 0.1908, 0.0218], unit: 'g/mile' },
      { name: '1975', factor: [0, 0.1634, 0.0513], unit: 'g/mile' },
      { name: '1976', factor: [0, 0.1594, 0.0555], unit: 'g/mile' },
      { name: '1977-1978', factor: [0, 0.1614, 0.0534], unit: 'g/mile' },
      { name: '1979-1980', factor: [0, 0.1594, 0.0555], unit: 'g/mile' },
      { name: '1981', factor: [0, 0.1479, 0.066], unit: 'g/mile' },
      { name: '1982', factor: [0, 0.1442, 0.0681], unit: 'g/mile' },
      { name: '1983', factor: [0, 0.13682, 0.0722], unit: 'g/mile' },
      { name: '1984', factor: [0, 0.1294, 0.0764], unit: 'g/mile' },
      { name: '1985', factor: [0, 0.122, 0.0806], unit: 'g/mile' },
      { name: '1986', factor: [0, 0.11461, 0.0848], unit: 'g/mile' },
      { name: '1987-1993', factor: [0, 0.0813, 0.1035], unit: 'g/mile' },
      { name: '1994', factor: [0, 0.0646, 0.0982], unit: 'g/mile' },
      { name: '1995', factor: [0, 0.0517, 0.0908], unit: 'g/mile' },
      { name: '1996', factor: [0, 0.0452, 0.0871], unit: 'g/mile' },
      { name: '1997', factor: [0, 0.0452, 0.0871], unit: 'g/mile' },
      { name: '1998', factor: [0, 0.0412, 0.0787], unit: 'g/mile' },
      { name: '1999', factor: [0, 0.0333, 0.0618], unit: 'g/mile' },
      { name: '2000', factor: [0, 0.034, 0.0631], unit: 'g/mile' },
      { name: '2001', factor: [0, 0.0221, 0.0379], unit: 'g/mile' },
      { name: '2002', factor: [0, 0.0242, 0.0424], unit: 'g/mile' },
      { name: '2003', factor: [0, 0.0221, 0.0373], unit: 'g/mile' },
      { name: '2004', factor: [0, 0.0115, 0.0088], unit: 'g/mile' },
      { name: '2005', factor: [0, 0.0105, 0.0064], unit: 'g/mile' },
      { name: '2006', factor: [0, 0.0108, 0.008], unit: 'g/mile' },
      { name: '2007', factor: [0, 0.0103, 0.0061], unit: 'g/mile' },
      { name: '2008', factor: [0, 0.0095, 0.0036], unit: 'g/mile' },
      { name: '2009', factor: [0, 0.0095, 0.0036], unit: 'g/mile' },
      { name: '2010', factor: [0, 0.0095, 0.0035], unit: 'g/mile' },
      { name: '2011', factor: [0, 0.0096, 0.0034], unit: 'g/mile' },
      { name: '2012', factor: [0, 0.0096, 0.0033], unit: 'g/mile' },
      { name: '2013', factor: [0, 0.0095, 0.0035], unit: 'g/mile' },
      { name: '2014', factor: [0, 0.0095, 0.0033], unit: 'g/mile' },
      { name: '2015', factor: [0, 0.0094, 0.0031], unit: 'g/mile' },
      { name: '2016', factor: [0, 0.0091, 0.0029], unit: 'g/mile' },
      { name: '2017', factor: [0, 0.0084, 0.0018], unit: 'g/mile' },
      { name: '2018', factor: [0, 0.0081, 0.0015], unit: 'g/mile' },
      { name: '2019', factor: [0, 0.008, 0.0013], unit: 'g/mile' },
      { name: '2020', factor: [0, 0.0079, 0.0012], unit: 'g/mile' },
    ],
  },
  {
    id: 33,
    name: 'Gasoline Heavy-Duty Vehicles',
    property: 'Year',
    options: [
      { name: '≤1980', factor: [0, 0.4604, 0.0497], unit: 'g/mile' },
      { name: '1981-1984', factor: [0, 0.4492, 0.0538], unit: 'g/mile' },
      { name: '1985-1986', factor: [0, 0.409, 0.0515], unit: 'g/mile' },
      { name: '1987', factor: [0, 0.3675, 0.0849], unit: 'g/mile' },
      { name: '1988-1989', factor: [0, 0.3492, 0.0933], unit: 'g/mile' },
      { name: '1990-1995', factor: [0, 0.3246, 0.1142], unit: 'g/mile' },
      { name: '1996', factor: [0, 0.1278, 0.168], unit: 'g/mile' },
      { name: '1997', factor: [0, 0.09242, 0.1726], unit: 'g/mile' },
      { name: '1998', factor: [0, 0.0655, 0.175], unit: 'g/mile' },
      { name: '1999', factor: [0, 0.0648, 0.1724], unit: 'g/mile' },
      { name: '2000', factor: [0, 0.06301, 0.166], unit: 'g/mile' },
      { name: '2001', factor: [0, 0.0577, 0.1468], unit: 'g/mile' },
      { name: '2002', factor: [0, 0.0634, 0.1673], unit: 'g/mile' },
      { name: '2003', factor: [0, 0.0602, 0.1553], unit: 'g/mile' },
      { name: '2004', factor: [0, 0.0298, 0.0164], unit: 'g/mile' },
      { name: '2005', factor: [0, 0.0297, 0.0083], unit: 'g/mile' },
      { name: '2006', factor: [0, 0.0299, 0.0241], unit: 'g/mile' },
      { name: '2007', factor: [0, 0.0322, 0.0015], unit: 'g/mile' },
      { name: '2008', factor: [0, 0.034, 0.0015], unit: 'g/mile' },
      { name: '2009', factor: [0, 0.0339, 0.0015], unit: 'g/mile' },
      { name: '2010', factor: [0, 0.032, 0.0015], unit: 'g/mile' },
      { name: '2011', factor: [0, 0.0304, 0.0015], unit: 'g/mile' },
      { name: '2012', factor: [0, 0.0313, 0.0015], unit: 'g/mile' },
      { name: '2013', factor: [0, 0.0313, 0.0015], unit: 'g/mile' },
      { name: '2014', factor: [0, 0.0315, 0.0015], unit: 'g/mile' },
      { name: '2015', factor: [0, 0.0332, 0.0021], unit: 'g/mile' },
      { name: '2016', factor: [0, 0.0321, 0.0061], unit: 'g/mile' },
      { name: '2017', factor: [0, 0.0329, 0.0084], unit: 'g/mile' },
      { name: '2018', factor: [0, 0.0326, 0.0082], unit: 'g/mile' },
      { name: '2019', factor: [0, 0.033, 0.0091], unit: 'g/mile' },
      { name: '2020', factor: [0, 0.0328, 0.0098], unit: 'g/mile' },
    ],
  },
  {
    id: 34,
    name: 'Gasoline Motorcycles',
    property: 'Year',
    options: [
      { name: '1960-1995', factor: [0, 0.007, 0.0083], unit: 'g/mile' },
      { name: '1996-2005', factor: [0, 0.0, 0.0], unit: 'g/mile' },
      { name: '2006-2020', factor: [0, 0.007, 0.0083], unit: 'g/mile' },
    ],
  },
])
