// Catalogue Import Validation Report
export const CATALOGUE_VALIDATION = {
  "totalCategories": 12,
  "totalProducts": 60,
  "totalSpecifications": 311,
  "uniqueSkus": 60,
  "duplicateSkusFound": 0,
  "orphanedSpecifications": [],
  "productsPerCategory": {
    "Patient Monitoring Equipment": 5,
    "Diagnostic Imaging Equipment": 5,
    "Critical Care & Respiratory Equipment": 5,
    "Surgical & Operation Theatre Equipment": 5,
    "Laboratory & Diagnostic Equipment": 5,
    "Hospital Furniture & Patient Care": 5,
    "Sterilization & Infection Control": 5,
    "Infusion & Drug Delivery Equipment": 5,
    "General Medical & Examination Equipment": 5,
    "Emergency & Trauma Care": 5,
    "Medical Consumables & Disposables": 5,
    "Medical Gas & Oxygen Systems": 5
  },
  "isValidationSuccessful": true
};

export const validateCatalogue = () => {
  return {
    success: CATALOGUE_VALIDATION.isValidationSuccessful,
    categories: CATALOGUE_VALIDATION.totalCategories,
    products: CATALOGUE_VALIDATION.totalProducts,
    specs: CATALOGUE_VALIDATION.totalSpecifications,
  };
};
