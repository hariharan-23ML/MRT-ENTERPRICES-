/**
 * MRT-ENTERPRISES complete sample product catalogue.
 * Source: product categories and samples.xlsx (Products + Technical Specs sheets).
 * IMPORTANT: brand, model, SKU, prices, stock, ratings, MOQ, warranty and specs
 * are illustrative/unverified. Verify with supplier/manufacturer before publishing.
 * Product images are null until licensed/approved exact-model images are supplied.
 */
export type ProductSpecification = {
  name: string;
  value: string;
  verificationStatus: string;
};

export type CatalogProduct = {
  sku: string; name: string; category: string; subcategory: string;
  brand: string; model: string; shortDescription: string; description: string;
  imageUrl: string | null; imageNote: string;
  priceInrIllustrative: number | null; stockStatusIllustrative: string;
  warrantyIllustrative: string; ratingIllustrative: number | null;
  moqIllustrative: number | null;
  technicalSpecificationsIllustrative: ProductSpecification[];
  featuresBenefitsIllustrative: string; datasheet: string; userManual: string;
  regulatoryDetails: string; warrantyServiceInformation: string;
  shippingInformation: string; returnPolicy: string; bulkPricing: string;
  purchaseActions: string; dataStatus: 'illustrative_unverified';
};

export const catalogProducts: CatalogProduct[] = [
  {
    "sku": "MED-PM-001",
    "name": "Multiparameter Patient Monitor",
    "category": "Patient Monitoring Equipment",
    "subcategory": "Multiparameter Patient Monitors",
    "brand": "Illustrative Medical",
    "model": "PM-12X",
    "shortDescription": "A bedside monitor for continuous observation of core patient vital signs.",
    "description": "A bedside monitor for continuous observation of core patient vital signs. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Multiparameter Patient Monitor",
    "priceInrIllustrative": 125000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "ECG",
        "value": "3/5-lead",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "SpO2",
        "value": "included",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "NIBP",
        "value": "included",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "RESP",
        "value": "included",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "12-inch colour",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "LAN/USB",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC with rechargeable battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-PM-002",
    "name": "Portable Patient Monitor",
    "category": "Patient Monitoring Equipment",
    "subcategory": "Multiparameter Patient Monitors",
    "brand": "Illustrative Medical",
    "model": "PM-P8",
    "shortDescription": "A compact monitor intended for patient transfer and bedside spot monitoring.",
    "description": "A compact monitor intended for patient transfer and bedside spot monitoring. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Portable Patient Monitor",
    "priceInrIllustrative": 89000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Display",
        "value": "8-inch colour",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Parameters",
        "value": "ECG, SpO2, NIBP",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "USB",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC/rechargeable battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Mounting",
        "value": "portable handle",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-PM-003",
    "name": "Fetal & Maternal Monitor",
    "category": "Patient Monitoring Equipment",
    "subcategory": "Multiparameter Patient Monitors",
    "brand": "Illustrative Medical",
    "model": "FM- twins-200",
    "shortDescription": "A monitor for observing fetal heart rate and maternal parameters during antenatal care.",
    "description": "A monitor for observing fetal heart rate and maternal parameters during antenatal care. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Fetal & Maternal Monitor",
    "priceInrIllustrative": 98000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "FHR channels",
        "value": "2",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "TOCO",
        "value": "included",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Maternal NIBP",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "10-inch",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "USB",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-PM-004",
    "name": "12-Channel ECG Machine",
    "category": "Patient Monitoring Equipment",
    "subcategory": "Multiparameter Patient Monitors",
    "brand": "Illustrative Medical",
    "model": "ECG-12P",
    "shortDescription": "A diagnostic ECG system for recording and reviewing cardiac electrical activity.",
    "description": "A diagnostic ECG system for recording and reviewing cardiac electrical activity. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for 12-Channel ECG Machine",
    "priceInrIllustrative": 76000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Leads",
        "value": "12",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Channels",
        "value": "12",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "7-inch",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Interpretation",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Storage",
        "value": "internal memory",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "USB/LAN",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-PM-005",
    "name": "Handheld Pulse Oximeter",
    "category": "Patient Monitoring Equipment",
    "subcategory": "Multiparameter Patient Monitors",
    "brand": "Illustrative Medical",
    "model": "OX-H1",
    "shortDescription": "A portable device for spot-check measurement of oxygen saturation and pulse rate.",
    "description": "A portable device for spot-check measurement of oxygen saturation and pulse rate. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Handheld Pulse Oximeter",
    "priceInrIllustrative": 6500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Measurements",
        "value": "SpO2 and pulse rate",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "OLED",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarm",
        "value": "configurable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "rechargeable battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Probe",
        "value": "reusable finger probe",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-DI-001",
    "name": "Portable Ultrasound Scanner",
    "category": "Diagnostic Imaging Equipment",
    "subcategory": "Ultrasound Scanners",
    "brand": "Illustrative Imaging",
    "model": "US-PRO",
    "shortDescription": "A portable ultrasound platform for general imaging applications.",
    "description": "A portable ultrasound platform for general imaging applications. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Portable Ultrasound Scanner",
    "priceInrIllustrative": 650000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Display",
        "value": "15-inch",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Modes",
        "value": "B/M/Colour Doppler",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Probe ports",
        "value": "2",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Storage",
        "value": "SSD",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "DICOM/LAN/USB",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC/battery option",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-DI-002",
    "name": "Digital X-Ray System",
    "category": "Diagnostic Imaging Equipment",
    "subcategory": "Ultrasound Scanners",
    "brand": "Illustrative Imaging",
    "model": "DXR-500",
    "shortDescription": "A digital radiography system for routine diagnostic imaging.",
    "description": "A digital radiography system for routine diagnostic imaging. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Digital X-Ray System",
    "priceInrIllustrative": 1850000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Detector",
        "value": "flat-panel",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Image size",
        "value": "17×17-inch class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Generator",
        "value": "high-frequency",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Workstation",
        "value": "included",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "DICOM",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "site-specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-DI-003",
    "name": "Mobile C-Arm System",
    "category": "Diagnostic Imaging Equipment",
    "subcategory": "Ultrasound Scanners",
    "brand": "Illustrative Imaging",
    "model": "CARM-M8",
    "shortDescription": "A mobile fluoroscopy imaging system for selected operating-room procedures.",
    "description": "A mobile fluoroscopy imaging system for selected operating-room procedures. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Mobile C-Arm System",
    "priceInrIllustrative": 4200000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Image intensifier/FPD",
        "value": "configuration-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Monitor",
        "value": "dual display",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "C-arm depth",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Imaging",
        "value": "pulsed/continuous",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "DICOM",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-DI-004",
    "name": "Veterinary & Small-Part Ultrasound",
    "category": "Diagnostic Imaging Equipment",
    "subcategory": "Ultrasound Scanners",
    "brand": "Illustrative Imaging",
    "model": "US-VET5",
    "shortDescription": "An ultrasound system configured for veterinary and superficial imaging use.",
    "description": "An ultrasound system configured for veterinary and superficial imaging use. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Veterinary & Small-Part Ultrasound",
    "priceInrIllustrative": 390000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Display",
        "value": "12-inch",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Modes",
        "value": "B/M/Colour",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Probe ports",
        "value": "2",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Image storage",
        "value": "USB",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "USB/LAN",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-DI-005",
    "name": "Portable Dental X-Ray Unit",
    "category": "Diagnostic Imaging Equipment",
    "subcategory": "Ultrasound Scanners",
    "brand": "Illustrative Imaging",
    "model": "DX-POR",
    "shortDescription": "A portable intraoral X-ray unit for dental imaging environments.",
    "description": "A portable intraoral X-ray unit for dental imaging environments. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Portable Dental X-Ray Unit",
    "priceInrIllustrative": 145000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Generator",
        "value": "high-frequency",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Exposure settings",
        "value": "adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Focal spot",
        "value": "manufacturer-defined",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "rechargeable battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Accessories",
        "value": "exposure switch",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-CR-001",
    "name": "ICU Ventilator",
    "category": "Critical Care & Respiratory Equipment",
    "subcategory": "Ventilators & Respiratory Support",
    "brand": "Illustrative Respiratory",
    "model": "VENT-ICU-7",
    "shortDescription": "A configurable ventilator intended for critical-care environments.",
    "description": "A configurable ventilator intended for critical-care environments. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for ICU Ventilator",
    "priceInrIllustrative": 950000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Ventilation modes",
        "value": "manufacturer-configured",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Patient types",
        "value": "adult/pediatric",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "15-inch class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Gas supply",
        "value": "pipeline/cylinder",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarms",
        "value": "audible/visual",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC/battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-CR-002",
    "name": "Transport Ventilator",
    "category": "Critical Care & Respiratory Equipment",
    "subcategory": "Ventilators & Respiratory Support",
    "brand": "Illustrative Respiratory",
    "model": "VENT-TR-2",
    "shortDescription": "A compact ventilator for supervised patient transport.",
    "description": "A compact ventilator for supervised patient transport. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Transport Ventilator",
    "priceInrIllustrative": 480000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Patient type",
        "value": "adult/pediatric configuration",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Modes",
        "value": "pressure/volume options",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "colour",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Gas",
        "value": "configuration-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "battery/AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-CR-003",
    "name": "BiPAP Therapy Device",
    "category": "Critical Care & Respiratory Equipment",
    "subcategory": "Ventilators & Respiratory Support",
    "brand": "Illustrative Respiratory",
    "model": "BIPAP-A30",
    "shortDescription": "A non-invasive ventilation device for prescribed respiratory support.",
    "description": "A non-invasive ventilation device for prescribed respiratory support. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for BiPAP Therapy Device",
    "priceInrIllustrative": 52000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Therapy",
        "value": "bilevel positive airway pressure",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Modes",
        "value": "device-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Humidifier",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Data",
        "value": "SD card",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-CR-004",
    "name": "Oxygen Concentrator 5 LPM",
    "category": "Critical Care & Respiratory Equipment",
    "subcategory": "Ventilators & Respiratory Support",
    "brand": "Illustrative Respiratory",
    "model": "OXY-5L",
    "shortDescription": "An oxygen concentrator designed to provide supplemental oxygen from ambient air.",
    "description": "An oxygen concentrator designed to provide supplemental oxygen from ambient air. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Oxygen Concentrator 5 LPM",
    "priceInrIllustrative": 42000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Flow",
        "value": "up to 5 L/min class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Oxygen concentration",
        "value": "verify at rated flow",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarm",
        "value": "power/low oxygen",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Outlet",
        "value": "humidifier bottle",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-CR-005",
    "name": "Portable Suction Machine",
    "category": "Critical Care & Respiratory Equipment",
    "subcategory": "Ventilators & Respiratory Support",
    "brand": "Illustrative Respiratory",
    "model": "SUCT-20",
    "shortDescription": "A portable suction unit for removal of fluids under clinical supervision.",
    "description": "A portable suction unit for removal of fluids under clinical supervision. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Portable Suction Machine",
    "priceInrIllustrative": 18500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Vacuum range",
        "value": "adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Collection jar",
        "value": "1 L class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Flow",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Filter",
        "value": "bacterial filter",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-SU-001",
    "name": "Electrosurgical Unit",
    "category": "Surgical & Operation Theatre Equipment",
    "subcategory": "Operating Theatre Systems",
    "brand": "Illustrative Surgical",
    "model": "ESU-300",
    "shortDescription": "An electrosurgical generator for cutting and coagulation procedures.",
    "description": "An electrosurgical generator for cutting and coagulation procedures. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Electrosurgical Unit",
    "priceInrIllustrative": 185000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Modes",
        "value": "cut/coagulation",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Output",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Monopolar/bipolar",
        "value": "configuration-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safety",
        "value": "return-electrode monitoring where supported",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-SU-002",
    "name": "LED Surgical Light",
    "category": "Surgical & Operation Theatre Equipment",
    "subcategory": "Operating Theatre Systems",
    "brand": "Illustrative Surgical",
    "model": "LED-OR-160",
    "shortDescription": "An operating-room light designed for adjustable illumination.",
    "description": "An operating-room light designed for adjustable illumination. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for LED Surgical Light",
    "priceInrIllustrative": 225000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Light source",
        "value": "LED",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Illuminance",
        "value": "manufacturer-rated",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Colour temperature",
        "value": "adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Diameter",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Mount",
        "value": "ceiling/mobile option",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-SU-003",
    "name": "Hydraulic Operating Table",
    "category": "Surgical & Operation Theatre Equipment",
    "subcategory": "Operating Theatre Systems",
    "brand": "Illustrative Surgical",
    "model": "OT-HY-5",
    "shortDescription": "A multi-position operating table for general surgical procedures.",
    "description": "A multi-position operating table for general surgical procedures. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Hydraulic Operating Table",
    "priceInrIllustrative": 475000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Table length/width",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Height adjustment",
        "value": "hydraulic/electric variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Back/leg sections",
        "value": "adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safe working load",
        "value": "verify datasheet",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Accessories",
        "value": "rails",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-SU-004",
    "name": "Anaesthesia Workstation",
    "category": "Surgical & Operation Theatre Equipment",
    "subcategory": "Operating Theatre Systems",
    "brand": "Illustrative Surgical",
    "model": "AN-WORK-8",
    "shortDescription": "An anaesthesia delivery workstation for use by trained anaesthesia professionals.",
    "description": "An anaesthesia delivery workstation for use by trained anaesthesia professionals. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Anaesthesia Workstation",
    "priceInrIllustrative": 1250000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Vaporizers",
        "value": "configuration-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Ventilator",
        "value": "integrated",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Gas supply",
        "value": "pipeline/cylinder",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Monitoring",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "colour",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safety alarms",
        "value": "included per configuration",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-SU-005",
    "name": "Flexible Video Endoscope System",
    "category": "Surgical & Operation Theatre Equipment",
    "subcategory": "Operating Theatre Systems",
    "brand": "Illustrative Surgical",
    "model": "ENDO-V5",
    "shortDescription": "A video endoscopy platform with compatible scope and image processor.",
    "description": "A video endoscopy platform with compatible scope and image processor. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Flexible Video Endoscope System",
    "priceInrIllustrative": 890000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Image processor",
        "value": "HD class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Light source",
        "value": "LED",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Scope compatibility",
        "value": "model-specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display output",
        "value": "HDMI/DVI option",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Recording",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-LB-001",
    "name": "Automated Hematology Analyzer",
    "category": "Laboratory & Diagnostic Equipment",
    "subcategory": "Clinical Laboratory Instruments",
    "brand": "Illustrative Lab",
    "model": "HEMA-3D",
    "shortDescription": "An automated analyzer for routine complete blood count testing.",
    "description": "An automated analyzer for routine complete blood count testing. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Automated Hematology Analyzer",
    "priceInrIllustrative": 680000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Differential",
        "value": "3-part/5-part variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Throughput",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Sample volume",
        "value": "manufacturer-defined",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Parameters",
        "value": "verify IFU",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Interface",
        "value": "LIS/LAN option",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-LB-002",
    "name": "Semi-Automatic Biochemistry Analyzer",
    "category": "Laboratory & Diagnostic Equipment",
    "subcategory": "Clinical Laboratory Instruments",
    "brand": "Illustrative Lab",
    "model": "BIO-200",
    "shortDescription": "A photometric analyzer for clinical chemistry laboratory workflows.",
    "description": "A photometric analyzer for clinical chemistry laboratory workflows. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Semi-Automatic Biochemistry Analyzer",
    "priceInrIllustrative": 145000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Wavelengths",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Cuvette",
        "value": "flow cell/cuvette",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Assays",
        "value": "endpoint/kinetic",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "LCD",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connectivity",
        "value": "USB/serial option",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-LB-003",
    "name": "Laboratory Centrifuge",
    "category": "Laboratory & Diagnostic Equipment",
    "subcategory": "Clinical Laboratory Instruments",
    "brand": "Illustrative Lab",
    "model": "CENT-24",
    "shortDescription": "A benchtop centrifuge for separation of laboratory samples.",
    "description": "A benchtop centrifuge for separation of laboratory samples. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Laboratory Centrifuge",
    "priceInrIllustrative": 38000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Capacity",
        "value": "24×10 mL class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Speed",
        "value": "adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "RCF",
        "value": "rotor-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Timer",
        "value": "digital",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safety",
        "value": "lid lock",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Rotor",
        "value": "included variant-specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-LB-004",
    "name": "Binocular Laboratory Microscope",
    "category": "Laboratory & Diagnostic Equipment",
    "subcategory": "Clinical Laboratory Instruments",
    "brand": "Illustrative Lab",
    "model": "MIC-BN-40",
    "shortDescription": "A binocular microscope for routine clinical and educational microscopy.",
    "description": "A binocular microscope for routine clinical and educational microscopy. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Binocular Laboratory Microscope",
    "priceInrIllustrative": 28500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Head",
        "value": "binocular",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Objectives",
        "value": "4×/10×/40×/100× oil",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Illumination",
        "value": "LED",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Stage",
        "value": "mechanical",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Focus",
        "value": "coarse/fine",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-LB-005",
    "name": "Laboratory Refrigerator",
    "category": "Laboratory & Diagnostic Equipment",
    "subcategory": "Clinical Laboratory Instruments",
    "brand": "Illustrative Lab",
    "model": "LAB-REF-300",
    "shortDescription": "A temperature-controlled refrigerator for laboratory materials requiring refrigerated storage.",
    "description": "A temperature-controlled refrigerator for laboratory materials requiring refrigerated storage. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Laboratory Refrigerator",
    "priceInrIllustrative": 95000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Capacity",
        "value": "300 L class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Temperature range",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Controller",
        "value": "digital",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarm",
        "value": "high/low temperature",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Data logging",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-HF-001",
    "name": "Electric ICU Hospital Bed",
    "category": "Hospital Furniture & Patient Care",
    "subcategory": "Beds, Mobility & Ward Furniture",
    "brand": "Illustrative Furniture",
    "model": "BED-ICU-5M",
    "shortDescription": "A motorized bed with adjustable sections for intensive-care patient support.",
    "description": "A motorized bed with adjustable sections for intensive-care patient support. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Electric ICU Hospital Bed",
    "priceInrIllustrative": 165000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Adjustments",
        "value": "back/knee/height",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Motors",
        "value": "electric",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Side rails",
        "value": "folding",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safe working load",
        "value": "verify datasheet",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Castors",
        "value": "central locking variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-HF-002",
    "name": "Manual Hospital Bed",
    "category": "Hospital Furniture & Patient Care",
    "subcategory": "Beds, Mobility & Ward Furniture",
    "brand": "Illustrative Furniture",
    "model": "BED-MAN-2",
    "shortDescription": "A manually adjustable hospital bed for general ward use.",
    "description": "A manually adjustable hospital bed for general ward use. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Manual Hospital Bed",
    "priceInrIllustrative": 28500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Adjustments",
        "value": "back/knee",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Cranks",
        "value": "manual",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Side rails",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Frame",
        "value": "coated steel",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Castors",
        "value": "lockable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-HF-003",
    "name": "Foldable Wheelchair",
    "category": "Hospital Furniture & Patient Care",
    "subcategory": "Beds, Mobility & Ward Furniture",
    "brand": "Illustrative Furniture",
    "model": "WCH-FD-18",
    "shortDescription": "A foldable wheelchair for patient mobility and assisted transport.",
    "description": "A foldable wheelchair for patient mobility and assisted transport. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Foldable Wheelchair",
    "priceInrIllustrative": 8500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Seat width",
        "value": "18-inch class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Frame",
        "value": "steel/aluminium variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Wheels",
        "value": "rear large wheels",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Footrests",
        "value": "swing-away",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Capacity",
        "value": "verify datasheet",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-HF-004",
    "name": "Patient Transfer Stretcher",
    "category": "Hospital Furniture & Patient Care",
    "subcategory": "Beds, Mobility & Ward Furniture",
    "brand": "Illustrative Furniture",
    "model": "STR-TR-1",
    "shortDescription": "A wheeled stretcher for supervised patient transfer within healthcare facilities.",
    "description": "A wheeled stretcher for supervised patient transfer within healthcare facilities. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Patient Transfer Stretcher",
    "priceInrIllustrative": 42000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Height",
        "value": "adjustable variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Side rails",
        "value": "folding",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Mattress",
        "value": "included",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Castors",
        "value": "lockable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safe working load",
        "value": "verify datasheet",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-HF-005",
    "name": "Bedside Locker",
    "category": "Hospital Furniture & Patient Care",
    "subcategory": "Beds, Mobility & Ward Furniture",
    "brand": "Illustrative Furniture",
    "model": "LOCK-BS-2",
    "shortDescription": "A bedside storage unit for patient personal items and ward supplies.",
    "description": "A bedside storage unit for patient personal items and ward supplies. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Bedside Locker",
    "priceInrIllustrative": 6500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Material",
        "value": "powder-coated steel/ABS variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Drawers",
        "value": "1",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Cabinet",
        "value": "1",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Top",
        "value": "moulded",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Wheels",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ST-001",
    "name": "Tabletop Steam Autoclave",
    "category": "Sterilization & Infection Control",
    "subcategory": "Sterilization Systems",
    "brand": "Illustrative Sterilization",
    "model": "AUTO-23L",
    "shortDescription": "A tabletop steam sterilizer for compatible reusable instruments.",
    "description": "A tabletop steam sterilizer for compatible reusable instruments. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Tabletop Steam Autoclave",
    "priceInrIllustrative": 98000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Chamber",
        "value": "23 L class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Cycles",
        "value": "configurable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Temperature/pressure",
        "value": "validated cycle-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Drying",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Printer/USB",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ST-002",
    "name": "Vertical Steam Sterilizer",
    "category": "Sterilization & Infection Control",
    "subcategory": "Sterilization Systems",
    "brand": "Illustrative Sterilization",
    "model": "AUTO-V50",
    "shortDescription": "A vertical steam sterilizer for instrument and material processing.",
    "description": "A vertical steam sterilizer for instrument and material processing. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Vertical Steam Sterilizer",
    "priceInrIllustrative": 145000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Chamber",
        "value": "50 L class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Control",
        "value": "digital",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Cycles",
        "value": "configurable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safety",
        "value": "pressure interlock",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "electrical",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ST-003",
    "name": "ETO Sterilizer",
    "category": "Sterilization & Infection Control",
    "subcategory": "Sterilization Systems",
    "brand": "Illustrative Sterilization",
    "model": "ETO-120",
    "shortDescription": "An ethylene oxide sterilization system for compatible heat-sensitive devices.",
    "description": "An ethylene oxide sterilization system for compatible heat-sensitive devices. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for ETO Sterilizer",
    "priceInrIllustrative": 1850000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Chamber",
        "value": "120 L class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Process",
        "value": "ETO",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Aeration",
        "value": "integrated/separate configuration",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Monitoring",
        "value": "cycle records",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safety",
        "value": "engineered ventilation required",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ST-004",
    "name": "Washer Disinfector",
    "category": "Sterilization & Infection Control",
    "subcategory": "Sterilization Systems",
    "brand": "Illustrative Sterilization",
    "model": "WD-60",
    "shortDescription": "A washer-disinfector for automated cleaning and thermal disinfection of reusable instruments.",
    "description": "A washer-disinfector for automated cleaning and thermal disinfection of reusable instruments. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Washer Disinfector",
    "priceInrIllustrative": 780000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Chamber",
        "value": "60 L class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Cycles",
        "value": "configurable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Drying",
        "value": "option",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Dosing",
        "value": "detergent system",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Records",
        "value": "cycle logging",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ST-005",
    "name": "UV-C Room Disinfection Unit",
    "category": "Sterilization & Infection Control",
    "subcategory": "Sterilization Systems",
    "brand": "Illustrative Sterilization",
    "model": "UVC-360",
    "shortDescription": "A UV-C disinfection unit for controlled, unoccupied-room use under safety procedures.",
    "description": "A UV-C disinfection unit for controlled, unoccupied-room use under safety procedures. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for UV-C Room Disinfection Unit",
    "priceInrIllustrative": 58000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "UV-C source",
        "value": "manufacturer-defined",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Timer",
        "value": "programmable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safety",
        "value": "occupancy interlock/remote operation",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Coverage",
        "value": "room-size dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ID-001",
    "name": "Volumetric Infusion Pump",
    "category": "Infusion & Drug Delivery Equipment",
    "subcategory": "Pumps & Fluid Management",
    "brand": "Illustrative Infusion",
    "model": "INF-VP5",
    "shortDescription": "A programmable pump for controlled delivery of compatible infusion fluids.",
    "description": "A programmable pump for controlled delivery of compatible infusion fluids. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Volumetric Infusion Pump",
    "priceInrIllustrative": 48000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Flow rate",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Modes",
        "value": "rate/time/volume",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarms",
        "value": "occlusion/air-in-line where supported",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "colour",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC/battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ID-002",
    "name": "Syringe Pump",
    "category": "Infusion & Drug Delivery Equipment",
    "subcategory": "Pumps & Fluid Management",
    "brand": "Illustrative Infusion",
    "model": "SYR-200",
    "shortDescription": "A syringe driver for controlled medication delivery using compatible syringe sizes.",
    "description": "A syringe driver for controlled medication delivery using compatible syringe sizes. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Syringe Pump",
    "priceInrIllustrative": 36000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Syringe sizes",
        "value": "manufacturer-approved range",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Rate",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Modes",
        "value": "infusion/bolus",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarms",
        "value": "occlusion/near-end",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC/battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ID-003",
    "name": "Enteral Feeding Pump",
    "category": "Infusion & Drug Delivery Equipment",
    "subcategory": "Pumps & Fluid Management",
    "brand": "Illustrative Infusion",
    "model": "ENT-FP1",
    "shortDescription": "A pump for controlled enteral nutrition delivery using compatible giving sets.",
    "description": "A pump for controlled enteral nutrition delivery using compatible giving sets. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Enteral Feeding Pump",
    "priceInrIllustrative": 29500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Flow range",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Feeding modes",
        "value": "continuous/intermittent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarms",
        "value": "occlusion/door",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Set compatibility",
        "value": "manufacturer-specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC/battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ID-004",
    "name": "IV Fluid Warmer",
    "category": "Infusion & Drug Delivery Equipment",
    "subcategory": "Pumps & Fluid Management",
    "brand": "Illustrative Infusion",
    "model": "IVW-40",
    "shortDescription": "A device for warming compatible intravenous fluids according to clinical protocol.",
    "description": "A device for warming compatible intravenous fluids according to clinical protocol. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for IV Fluid Warmer",
    "priceInrIllustrative": 22000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Temperature control",
        "value": "preset/adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Warmer type",
        "value": "dry heat",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarm",
        "value": "over-temperature",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Compatibility",
        "value": "approved tubing set",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ID-005",
    "name": "Infusion Pump Docking Station",
    "category": "Infusion & Drug Delivery Equipment",
    "subcategory": "Pumps & Fluid Management",
    "brand": "Illustrative Infusion",
    "model": "DOCK-4",
    "shortDescription": "A docking and power-management station for compatible infusion pumps.",
    "description": "A docking and power-management station for compatible infusion pumps. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Infusion Pump Docking Station",
    "priceInrIllustrative": 65000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Slots",
        "value": "4-pump class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "mains",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Mounting",
        "value": "pole/rail",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Compatibility",
        "value": "specified pump family",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Network",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-GM-001",
    "name": "Aneroid Blood Pressure Monitor",
    "category": "General Medical & Examination Equipment",
    "subcategory": "Examination & Point-of-Care Devices",
    "brand": "Illustrative General Medical",
    "model": "BP-AN1",
    "shortDescription": "A manual blood pressure set for clinical examination.",
    "description": "A manual blood pressure set for clinical examination. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Aneroid Blood Pressure Monitor",
    "priceInrIllustrative": 2800.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Gauge",
        "value": "aneroid",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Cuff",
        "value": "adult",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Inflation",
        "value": "manual bulb",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Measurement",
        "value": "non-invasive BP",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Accessories",
        "value": "stethoscope variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-GM-002",
    "name": "Digital Clinical Thermometer",
    "category": "General Medical & Examination Equipment",
    "subcategory": "Examination & Point-of-Care Devices",
    "brand": "Illustrative General Medical",
    "model": "TEMP-D1",
    "shortDescription": "A digital thermometer for routine body-temperature measurement.",
    "description": "A digital thermometer for routine body-temperature measurement. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Digital Clinical Thermometer",
    "priceInrIllustrative": 450.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "6 months",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Display",
        "value": "LCD",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Measurement",
        "value": "contact",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Unit",
        "value": "°C/°F",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alert",
        "value": "fever indication variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "replaceable battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "6 months (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-GM-003",
    "name": "Professional Stethoscope",
    "category": "General Medical & Examination Equipment",
    "subcategory": "Examination & Point-of-Care Devices",
    "brand": "Illustrative General Medical",
    "model": "STETH-PRO",
    "shortDescription": "A dual-head acoustic stethoscope for clinical auscultation.",
    "description": "A dual-head acoustic stethoscope for clinical auscultation. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Professional Stethoscope",
    "priceInrIllustrative": 2200.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Chestpiece",
        "value": "dual-head",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Tubing",
        "value": "single lumen",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Eartips",
        "value": "soft-seal",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Intended use",
        "value": "adult/pediatric variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Accessories",
        "value": "spare diaphragm",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-GM-004",
    "name": "Portable Nebulizer",
    "category": "General Medical & Examination Equipment",
    "subcategory": "Examination & Point-of-Care Devices",
    "brand": "Illustrative General Medical",
    "model": "NEB-COMP",
    "shortDescription": "A compressor nebulizer for aerosol delivery with compatible medication solutions.",
    "description": "A compressor nebulizer for aerosol delivery with compatible medication solutions. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Portable Nebulizer",
    "priceInrIllustrative": 2400.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Type",
        "value": "compressor",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Particle size",
        "value": "manufacturer-rated",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Medication cup",
        "value": "included",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Noise",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-GM-005",
    "name": "Digital Glucometer Kit",
    "category": "General Medical & Examination Equipment",
    "subcategory": "Examination & Point-of-Care Devices",
    "brand": "Illustrative General Medical",
    "model": "GLU-KIT1",
    "shortDescription": "A blood glucose meter kit for compatible test strips and lancets.",
    "description": "A blood glucose meter kit for compatible test strips and lancets. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Digital Glucometer Kit",
    "priceInrIllustrative": 950.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Sample",
        "value": "capillary whole blood",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "LCD",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Memory",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Strip type",
        "value": "compatible proprietary strips",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ET-001",
    "name": "Biphasic Defibrillator",
    "category": "Emergency & Trauma Care",
    "subcategory": "Emergency Response Equipment",
    "brand": "Illustrative Emergency",
    "model": "DEF-BI-2",
    "shortDescription": "A defibrillator for emergency cardiac response by trained personnel.",
    "description": "A defibrillator for emergency cardiac response by trained personnel. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Biphasic Defibrillator",
    "priceInrIllustrative": 185000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "2 years",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Waveform",
        "value": "biphasic",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Modes",
        "value": "manual/AED variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Energy levels",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Display",
        "value": "colour",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Battery",
        "value": "rechargeable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "ECG monitoring",
        "value": "configuration-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "2 years (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ET-002",
    "name": "Emergency Crash Cart",
    "category": "Emergency & Trauma Care",
    "subcategory": "Emergency Response Equipment",
    "brand": "Illustrative Emergency",
    "model": "CART-ER5",
    "shortDescription": "A mobile cart for organizing emergency medicines and response equipment.",
    "description": "A mobile cart for organizing emergency medicines and response equipment. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Emergency Crash Cart",
    "priceInrIllustrative": 28000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Drawers",
        "value": "5",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Defibrillator shelf",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "CPR board",
        "value": "included variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Castors",
        "value": "lockable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Accessories",
        "value": "IV pole",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ET-003",
    "name": "Bag-Valve-Mask Resuscitator",
    "category": "Emergency & Trauma Care",
    "subcategory": "Emergency Response Equipment",
    "brand": "Illustrative Emergency",
    "model": "BVM-AD",
    "shortDescription": "A manual resuscitator for assisted ventilation by trained responders.",
    "description": "A manual resuscitator for assisted ventilation by trained responders. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Bag-Valve-Mask Resuscitator",
    "priceInrIllustrative": 1800.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "6 months",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Patient size",
        "value": "adult",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Bag",
        "value": "reusable/disposable variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Mask",
        "value": "included",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Oxygen reservoir",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connector",
        "value": "standard-size variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "6 months (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ET-004",
    "name": "Portable Emergency Suction Unit",
    "category": "Emergency & Trauma Care",
    "subcategory": "Emergency Response Equipment",
    "brand": "Illustrative Emergency",
    "model": "SUCT-ER",
    "shortDescription": "A battery-capable suction device for emergency and transport settings.",
    "description": "A battery-capable suction device for emergency and transport settings. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Portable Emergency Suction Unit",
    "priceInrIllustrative": 26500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Vacuum",
        "value": "adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Collection canister",
        "value": "1 L class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Power",
        "value": "AC/battery",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Filter",
        "value": "bacterial",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Carry case",
        "value": "included variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-ET-005",
    "name": "Spinal Immobilization Board",
    "category": "Emergency & Trauma Care",
    "subcategory": "Emergency Response Equipment",
    "brand": "Illustrative Emergency",
    "model": "SPB-XL",
    "shortDescription": "A rigid board for trained-team patient immobilization and transfer.",
    "description": "A rigid board for trained-team patient immobilization and transfer. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Spinal Immobilization Board",
    "priceInrIllustrative": 6500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Material",
        "value": "polymer",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Length",
        "value": "adult size",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Straps",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Compatible with head immobilizer",
        "value": "yes",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Load capacity",
        "value": "verify datasheet",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MC-001",
    "name": "Nitrile Examination Gloves",
    "category": "Medical Consumables & Disposables",
    "subcategory": "Single-Use Medical Supplies",
    "brand": "Illustrative Supplies",
    "model": "GLV-NIT-M",
    "shortDescription": "Powder-free examination gloves for single-use clinical tasks.",
    "description": "Powder-free examination gloves for single-use clinical tasks. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Nitrile Examination Gloves",
    "priceInrIllustrative": 650.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "As per pack",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Material",
        "value": "nitrile",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Size",
        "value": "M",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Sterility",
        "value": "non-sterile",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Powder",
        "value": "powder-free",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Pack",
        "value": "100 pieces",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "AQL",
        "value": "supplier-declared",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "As per pack (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MC-002",
    "name": "Disposable Syringe 5 mL",
    "category": "Medical Consumables & Disposables",
    "subcategory": "Single-Use Medical Supplies",
    "brand": "Illustrative Supplies",
    "model": "SYR-5ML",
    "shortDescription": "A single-use syringe for compatible clinical applications.",
    "description": "A single-use syringe for compatible clinical applications. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Disposable Syringe 5 mL",
    "priceInrIllustrative": 180.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "As per pack",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Capacity",
        "value": "5 mL",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Tip",
        "value": "Luer slip/lock variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Needle",
        "value": "with/without needle",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Sterility",
        "value": "sterile",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Pack",
        "value": "100 pieces",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "As per pack (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MC-003",
    "name": "IV Cannula 20G",
    "category": "Medical Consumables & Disposables",
    "subcategory": "Single-Use Medical Supplies",
    "brand": "Illustrative Supplies",
    "model": "CAN-20G",
    "shortDescription": "A peripheral intravenous catheter for trained clinical use.",
    "description": "A peripheral intravenous catheter for trained clinical use. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for IV Cannula 20G",
    "priceInrIllustrative": 350.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "As per pack",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Gauge",
        "value": "20G",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Material",
        "value": "catheter polymer",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Port",
        "value": "with injection port variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Sterility",
        "value": "sterile",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Pack",
        "value": "50 pieces",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "As per pack (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MC-004",
    "name": "3-Ply Surgical Face Masks",
    "category": "Medical Consumables & Disposables",
    "subcategory": "Single-Use Medical Supplies",
    "brand": "Illustrative Supplies",
    "model": "MASK-3P",
    "shortDescription": "Disposable three-layer masks for routine healthcare settings.",
    "description": "Disposable three-layer masks for routine healthcare settings. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for 3-Ply Surgical Face Masks",
    "priceInrIllustrative": 220.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "As per pack",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Layers",
        "value": "3",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Attachment",
        "value": "ear loop",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Nose clip",
        "value": "adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Sterility",
        "value": "non-sterile",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Pack",
        "value": "50 pieces",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "As per pack (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MC-005",
    "name": "Sterile Gauze Dressing Pack",
    "category": "Medical Consumables & Disposables",
    "subcategory": "Single-Use Medical Supplies",
    "brand": "Illustrative Supplies",
    "model": "GAUZE-10",
    "shortDescription": "Sterile gauze dressings for wound care and clinical procedures.",
    "description": "Sterile gauze dressings for wound care and clinical procedures. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Sterile Gauze Dressing Pack",
    "priceInrIllustrative": 160.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "As per pack",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Material",
        "value": "cotton gauze",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Size",
        "value": "10×10 cm class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Sterility",
        "value": "sterile",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Pack",
        "value": "10 pieces",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Absorbency",
        "value": "supplier-declared",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "As per pack (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MG-001",
    "name": "Medical Oxygen Cylinder",
    "category": "Medical Gas & Oxygen Systems",
    "subcategory": "Medical Gas Delivery Infrastructure",
    "brand": "Illustrative Gas Systems",
    "model": "OXY-CYL-10",
    "shortDescription": "A refillable cylinder intended for medical oxygen supply through approved regulators.",
    "description": "A refillable cylinder intended for medical oxygen supply through approved regulators. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Medical Oxygen Cylinder",
    "priceInrIllustrative": 12500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "As per supplier",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Water capacity",
        "value": "10 L class",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Gas",
        "value": "medical oxygen",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Working pressure",
        "value": "cylinder-marked",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Valve",
        "value": "standard-specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Testing",
        "value": "valid hydrostatic test required",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "As per supplier (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MG-002",
    "name": "Oxygen Flowmeter with Humidifier",
    "category": "Medical Gas & Oxygen Systems",
    "subcategory": "Medical Gas Delivery Infrastructure",
    "brand": "Illustrative Gas Systems",
    "model": "FLOW-O2",
    "shortDescription": "A flowmeter assembly for controlled oxygen flow with humidification bottle.",
    "description": "A flowmeter assembly for controlled oxygen flow with humidification bottle. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Oxygen Flowmeter with Humidifier",
    "priceInrIllustrative": 1800.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Flow range",
        "value": "model-dependent",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Inlet",
        "value": "pipeline/cylinder variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Humidifier",
        "value": "reusable bottle",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Connector",
        "value": "standard-specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Material",
        "value": "medical-grade components",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MG-003",
    "name": "Medical Gas Regulator",
    "category": "Medical Gas & Oxygen Systems",
    "subcategory": "Medical Gas Delivery Infrastructure",
    "brand": "Illustrative Gas Systems",
    "model": "REG-O2",
    "shortDescription": "A pressure regulator for compatible medical gas cylinders.",
    "description": "A pressure regulator for compatible medical gas cylinders. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Medical Gas Regulator",
    "priceInrIllustrative": 4200.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Gas type",
        "value": "oxygen variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Inlet",
        "value": "cylinder-standard specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Outlet pressure",
        "value": "manufacturer-rated",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Gauge",
        "value": "dual/single",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Safety",
        "value": "relief mechanism",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MG-004",
    "name": "Medical Vacuum Regulator",
    "category": "Medical Gas & Oxygen Systems",
    "subcategory": "Medical Gas Delivery Infrastructure",
    "brand": "Illustrative Gas Systems",
    "model": "VAC-REG",
    "shortDescription": "A vacuum regulator for wall or pipeline suction systems.",
    "description": "A vacuum regulator for wall or pipeline suction systems. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Medical Vacuum Regulator",
    "priceInrIllustrative": 6500.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Vacuum range",
        "value": "adjustable",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Gauge",
        "value": "analogue/digital",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Collection jar",
        "value": "optional",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Mount",
        "value": "wall/pipeline standard",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Overflow protection",
        "value": "variant-specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  },
  {
    "sku": "MED-MG-005",
    "name": "Medical Gas Manifold System",
    "category": "Medical Gas & Oxygen Systems",
    "subcategory": "Medical Gas Delivery Infrastructure",
    "brand": "Illustrative Gas Systems",
    "model": "MAN-2BANK",
    "shortDescription": "A manifold assembly for continuous supply changeover from cylinder banks.",
    "description": "A manifold assembly for continuous supply changeover from cylinder banks. Specifications, included accessories, compatibility and intended-use details must be confirmed against the exact manufacturer model and supplied configuration before sale.",
    "imageUrl": null,
    "imageNote": "Upload approved image for Medical Gas Manifold System",
    "priceInrIllustrative": 185000.0,
    "stockStatusIllustrative": "In Stock",
    "warrantyIllustrative": "1 year",
    "ratingIllustrative": 4.5,
    "moqIllustrative": 1,
    "technicalSpecificationsIllustrative": [
      {
        "name": "Banks",
        "value": "dual-bank",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Changeover",
        "value": "automatic/manual variant",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Gas",
        "value": "configuration-specific",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Alarm",
        "value": "pressure status",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      },
      {
        "name": "Installation",
        "value": "engineered site commissioning required",
        "verificationStatus": "Not verified - replace with manufacturer datasheet"
      }
    ],
    "featuresBenefitsIllustrative": "Refer to the technical specification list; confirm actual features and supported options with the manufacturer.",
    "datasheet": "Upload manufacturer-approved datasheet PDF",
    "userManual": "Upload manufacturer-approved user manual",
    "regulatoryDetails": "Enter only verified, applicable approvals and registrations for the exact model and market; attach evidence.",
    "warrantyServiceInformation": "1 year (illustrative); confirm written warranty, service coverage and exclusions with supplier.",
    "shippingInformation": "Confirm dispatch lead time, installation requirements, packaging and delivery charges with supplier.",
    "returnPolicy": "Subject to seller policy, product condition, hygiene rules and applicable law; publish the approved policy before accepting orders.",
    "bulkPricing": "Configure quantity slabs after supplier confirmation.",
    "purchaseActions": "Quantity selector | Add to Cart | Buy Now | Request a Quote | Contact Supplier",
    "dataStatus": "illustrative_unverified"
  }
];

export const catalogCategories = [...new Set(catalogProducts.map((product) => product.category))];
