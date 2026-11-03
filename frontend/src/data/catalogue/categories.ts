import { Category } from "../../types/category.types";

export const CATEGORIES: Category[] = [
  {
    "id": "CAT-01",
    "name": "Patient Monitoring Equipment",
    "exampleSubcategory": "Multiparameter Patient Monitors",
    "description": "Professional patient monitoring equipment engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/patient-monitoring.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-02",
    "name": "Diagnostic Imaging Equipment",
    "exampleSubcategory": "Ultrasound Scanners",
    "description": "Professional diagnostic imaging equipment engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/diagnostic-imaging.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-03",
    "name": "Critical Care & Respiratory Equipment",
    "exampleSubcategory": "Ventilators & Respiratory Support",
    "description": "Professional critical care & respiratory equipment engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/critical-care.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-04",
    "name": "Surgical & Operation Theatre Equipment",
    "exampleSubcategory": "Operating Theatre Systems",
    "description": "Professional surgical & operation theatre equipment engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/surgical-ot.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-05",
    "name": "Laboratory & Diagnostic Equipment",
    "exampleSubcategory": "Clinical Laboratory Instruments",
    "description": "Professional laboratory & diagnostic equipment engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/laboratory-diagnostic.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-06",
    "name": "Hospital Furniture & Patient Care",
    "exampleSubcategory": "Beds, Mobility & Ward Furniture",
    "description": "Professional hospital furniture & patient care engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/hospital-furniture.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-07",
    "name": "Sterilization & Infection Control",
    "exampleSubcategory": "Sterilization Systems",
    "description": "Professional sterilization & infection control engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/sterilization-infection.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-08",
    "name": "Infusion & Drug Delivery Equipment",
    "exampleSubcategory": "Pumps & Fluid Management",
    "description": "Professional infusion & drug delivery equipment engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/infusion-drug-delivery.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-09",
    "name": "General Medical & Examination Equipment",
    "exampleSubcategory": "Examination & Point-of-Care Devices",
    "description": "Professional general medical & examination equipment engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/general-medical.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-10",
    "name": "Emergency & Trauma Care",
    "exampleSubcategory": "Emergency Response Equipment",
    "description": "Professional emergency & trauma care engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/emergency-trauma.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-11",
    "name": "Medical Consumables & Disposables",
    "exampleSubcategory": "Single-Use Medical Supplies",
    "description": "Professional medical consumables & disposables engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/consumables-disposables.svg",
    "productCount": 5,
    "status": "Active"
  },
  {
    "id": "CAT-12",
    "name": "Medical Gas & Oxygen Systems",
    "exampleSubcategory": "Medical Gas Delivery Infrastructure",
    "description": "Professional medical gas & oxygen systems engineered for institutional healthcare facilities and clinical settings.",
    "image": "/images/categories/medical-gas-oxygen.svg",
    "productCount": 5,
    "status": "Active"
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find((cat) => cat.id === id);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return CATEGORIES.find((cat) => cat.name.toLowerCase() === name.toLowerCase());
};
