import { QuotationRequest } from "../types/quotation.types";
import { api } from "./api";

const QUOTATIONS_STORAGE_KEY = "medisource_quotations";

export const quotationService = {
  getLocalQuotations(): QuotationRequest[] {
    try {
      const stored = localStorage.getItem(QUOTATIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  async submitQuotation(payload: QuotationRequest): Promise<{ success: boolean; quotation: QuotationRequest; endpointSupported: boolean }> {
    const quotation: QuotationRequest = {
      ...payload,
      id: `RFQ-${Date.now()}`,
      quotationNumber: `MRT-RFQ-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
    };

    let endpointSupported = false;

    // Check if backend supports /api/quotations or /api/rfq
    try {
      const response = await api.post("/quotations", quotation);
      if (response.status === 200 || response.status === 201) {
        endpointSupported = true;
      }
    } catch {
      // Backend does not have an active /quotations endpoint (documented missing API)
      endpointSupported = false;
    }

    // Persist to local RFQ repository so customer & admin can view submitted quotations
    const list = this.getLocalQuotations();
    list.unshift(quotation);
    localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(list));

    return {
      success: true,
      quotation,
      endpointSupported,
    };
  },

  getQuotations(): QuotationRequest[] {
    return this.getLocalQuotations();
  },
};
