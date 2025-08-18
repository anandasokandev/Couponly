export const environment = {
  production: true,
  apiBaseUrl: 'https://api.couponly.store/api',
  endpoints: {
    redeem: {
      downloadexel: 'Redeems/downloadexel',
      mailexel: 'Redeems/mailexel',
      getAllRedeems: 'Redeems/AllRedeems',
      newRedeem: 'Redeems/newRedeem',
      getRedeemById: 'Redeems/getRedeemById',
      getRedeemsByUserId: 'Redeems/getRedeemsByUserId',
      getRedeemsByStoreId: 'Redeems/getRedeemsByStoreId',
      ExportExcel: 'Redeems/ExportRedeemsToExcel'
    },
    user: {
      login: 'user/login',
    },
    location: {
      fetchDistrict: 'District',
      fetchLocation: 'Location',
      filterLocation: 'Location/filter'
    },
     store: {
      fetchdistricts:'District',
      fetchcategories:'Store/Categories',
      fetchstores:'Store/AllStores',
      filterstore: 'Store/FilterStore'
    },
    contact: {
      AllContacts: 'Contact/AllContacts',
      AllFilters: 'Contact/AllFilters'
    },
    login:{
      signup:'/Login'
    },
      AllFilters: 'Contact/AllFilters',
      AddContact : 'Contact/AddContact',
      EditContact : 'Contact/updatebyid'
    }
  }
};