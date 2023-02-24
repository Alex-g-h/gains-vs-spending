import httpService from "./http.service";

const commonService = (endpoint) => ({
  get: async () => {
    const { data } = await httpService.get(endpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(endpoint + payload._id, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(endpoint + id);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(endpoint + payload._id, payload);
    return data;
  },
});

export default commonService;
