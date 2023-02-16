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
};
export default accountService;
