import httpService from "./http.service";

const expenseTypesEndpoit = "expense-types";

const expenseTypesService = {
  get: async () => {
    const {
      data: { content: data },
    } = await httpService.get(expenseTypesEndpoit);
    return data;
  },
};

export default expenseTypesService;
