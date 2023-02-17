import httpService from "./http.service";

const accountEndpoint = "account/";

const accountService = {
  get: async () => {
    const { data } = await httpService.get(accountEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      accountEndpoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(accountEndpoint + id);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      accountEndpoint + payload._id,
      payload
    );
    return data;
  },
};
export default accountService;
