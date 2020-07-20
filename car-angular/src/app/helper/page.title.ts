export const APPNAME = "Ride Techonology"
export const titles = {
    login: `${APPNAME} | Login`,
    adminDashboard: `${APPNAME} | Dashboard`,
    adminManagement: `${APPNAME} | Admin Management`,
    cmsManagement: `${APPNAME} | CMS Management`,
    contactUs: `${APPNAME} | Contact Management `,
    providerManagement: `${APPNAME} | Provider Management `,
    buyerManagement: `${APPNAME} | Buyer Management `
}

export const subHeader = {
    DASHBOARD: 'Dashboard',
    ADMIN: 'Admin Management',
    CMS: 'CMS Management',
    CONTACT: ' ContactUs Management',
    PROVIDER: 'Provider Management',
    BUYER: 'Buyer Management'
}


export const PERMISSIONS = {
    USER:{
        READ: 'canReadUserData',
        CREATE: 'canCreateUserData',
        DELETE: 'canDeleteUserData',
        EDIT: 'canEditUserData'
    },
    ADMIN:{
        READ: 'canReadAdminData',
        CREATE: 'canCreateAdminData',
        DELETE: 'canDeleteAdminData',
        EDIT: 'canEditAdminData'
    },
    MAIN_MENU:{
        MASTER: 'canReadMasterMenuData',
        SITE_USER:"canReadSiteUserMenuData",
        CONTENT:"canReadContentMenuData",
        REPORTS:"canReadReportsMenuData"
    }
  
}