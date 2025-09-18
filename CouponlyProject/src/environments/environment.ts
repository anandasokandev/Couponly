export const environment = {
  production: true,
  //  apiBaseUrl: 'https://api.couponly.store/api',
  apiBaseUrl: 'https://localhost:7224/api',

  imageUploadUrl: 'https://images.couponly.store/api/upload',
  imageKey: '5dtg419dtny9y84nu67ry7',

  
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
      addusers:'User/AddUser',
      disableusers:'User/DisableUser',
      updateusers:'User/Update'
      
    },


    location: {
      fetchDistrict: 'District',
      addLocation: "Location",
      editLocation: 'Location/Edit',
      fetchLocation: 'Location',
      filterLocation: 'Location/filter',
      toggleLocation: 'Location/toggle'
    },


     store: {
      fetchdistricts:'District',
      fetchcategories:'Store/Categories',
      fetchstores:'Store/AllStores',
      filterstore: 'Store/FilterStore',
      fetchstore:'Store/id',
      upload:'ImageUpload',
      addStore:'Store/AddStore',
      updateStore:'Store/',
      storeExists:'Store/check-store-existence',
      emailExists:'Store/check-email-existence',
      contactExists:'Store/check-contact-existence',
      updateStorePassword:'Store/update-password',
      verifyPaymentToken:'Promotion/ValidatePaymentToken'
    },


    contact: {
      AllContacts: 'Contact/AllContacts',
      AllFilters: 'Contact/AllFilters',
      AddContact : 'Contact/AddContact',
      EditContact : 'Contact/updatebyid',
      ExportCSV: 'Contact/ExportContactsToCsv',
      ExportVcard:'Contact/ExportContactsToVCard',
      importcsv:'Contact/ImportContactsFromCsv',
      importvcard :'Contact/ImportContactsFromVCard'
    },


    login:{
      signup: '/Login',
      forgotPassword: '/Login/forgot-password',
      verifyToken: '/Login/verify-token',
      updatePassword:'/Login/updatepassword',
    },


    coupon: {
      GetCouponType : 'Coupon/CouponTypes', 
      GenerateCoupon: 'Coupon',
      GetAllCoupons: 'Coupon',
      FilterCoupons:'Coupon/filter'
    },


    promotion: {
      service: {
        AllServices: 'ServiceHandler/AllServices',
        UpdateService: 'ServiceHandler/UpdateService',
        Payment: 'Payment/AddPayment'
      },

      coupon: {
        CouponSearch: 'Coupon/filter'
      },
      LoocationContact: {
        ContactCount: '',
        SelectedContacts: ''
      },

      StoreContact: {
        ContactCount: '',
        SelectedContacts: ''
      },
      ValidateToken: 'Promotion/ValidatePaymentToken',
      NewPromotion: 'Promotion/NewPromotion'
      },


    storedashboard: {
      storeinfo: 'StoreDashboardStore/StoreInfo',
      redeemhistory: 'StoreDashboardRedeem/FilterStoreRedeems',
      overview: 'StoreDashboardOverview/Overview',
    }
  }
};