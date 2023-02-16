import httpService from "./http.service";

const paymentEndpoit = "payment";

const paymentService = {
  get: async () => {
    const {
      data: { content: data },
    } = await httpService.get(paymentEndpoit);
    return data;
  },
};

export default paymentService;
