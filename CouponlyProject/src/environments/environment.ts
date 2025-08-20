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
      ExportExcel: 'Redeems/ExportRedeemsToExcel',
      ExportEmail: 'Redeems/ExportToExcelAndMail'
    },
    user: {
      login: 'user/login',
      fetchusers: 'User/AllUsers',
      filterusers: 'User/FilterUser',
      addusers:'User/AddUser'

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
      filterstore: 'Store/FilterStore',
      upload:'ImageUpload',
      addStore:'Store/AddStore'
    },
    contact: {
      AllContacts: 'Contact/AllContacts',
      AllFilters: 'Contact/AllFilters',
      AddContact : 'Contact/AddContact',
      EditContact : 'Contact/updatebyid'
    },
    login:{
      signup:'/Login'
    }
  }
};