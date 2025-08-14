export const environment = {
  production: true,
  apiBaseUrl: 'https://api.couponly.store/api',
  endpoints: {
    redeem: {
      downloadexel: 'redeem/downloadexel',
      mailexel: 'redeem/mailexel',
      getAllRedeems: 'redeem/getAllRedeems',
      newRedeem: 'redeem/newRedeem',
      getRedeemById: 'redeem/getRedeemById',
      getRedeemsByUserId: 'redeem/getRedeemsByUserId',
      getRedeemsByStoreId: 'redeem/getRedeemsByStoreId',
    },
    user: {
      login: 'user/login'
    },
     store: {
      fetchcategories:'Store/Categories',
      fetchstores:'Store/AllStores',
      filterstore: 'Store/FilterStore'
    },
  }
};