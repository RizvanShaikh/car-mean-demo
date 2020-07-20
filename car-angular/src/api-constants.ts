import { environment } from './environments/environment';

export class ApiURIs {
    public static readonly apiURLMS1: any = environment.apiEndpointMS1;
    public static readonly apiEndpointMS1User: any = environment.apiEndpointMS1User;
    public static readonly apiURLMS2: any = environment.apiEndpointMS2;
    public static readonly apiEndpointMS1Common: any = environment.apiEndpointMS1Common;

    public static readonly login: string = ApiURIs.apiURLMS1 + '/login';
    public static readonly sqAdmin: string = `${ApiURIs.apiURLMS1}/isAdmin`;

    public static readonly forgotPassword: string = ApiURIs.apiURLMS1 + '/forgotPassword';
    public static readonly resetPassword: string = ApiURIs.apiURLMS1 + '/resetPassword';
    public static readonly authToken: string = ApiURIs.apiURLMS1 + '/authToken';

    public static readonly addAdmin: string = ApiURIs.apiURLMS1 + '/add';
    public static readonly getAdminById: string = ApiURIs.apiURLMS1 + '/get';
    public static readonly updateAdmin: string = ApiURIs.apiURLMS1 + '/update';
    public static readonly listAdmin: string = ApiURIs.apiURLMS1 + '/list';
    public static readonly deleteAdminById: string = ApiURIs.apiURLMS1 + '/delete';
    public static readonly updateStatus: string = ApiURIs.apiURLMS1 + '/changeStatus';

    public static readonly updatePermissionMatrix = ApiURIs.apiURLMS1 + '/permission/updatePermissionMatrix';

    
    public static readonly uploadData: string = ApiURIs.apiEndpointMS1User + '/uploadData';

    public static readonly listCMS : string = ApiURIs.apiURLMS1 + '/cms/getList';
    public static readonly addCMS: string = ApiURIs.apiURLMS1 + '/cms/addDetails';
    public static readonly getCMSById: string = ApiURIs.apiURLMS1 + '/cms/fetchDetails';
    public static readonly updateCMS: string = ApiURIs.apiURLMS1 + '/cms/updateDetails';
    public static readonly deleteCMSById: string = ApiURIs.apiURLMS1 + '/cms/deleteDetails';
    public static readonly updateCMSStatus: string = ApiURIs.apiURLMS1 + '/cms/changeStatus';

    public static readonly getContactUsById: string = ApiURIs.apiURLMS1 + '/contactUs/fetchDetails';
    public static readonly listContacts: string = ApiURIs.apiURLMS1 + '/contactUs/getList'; 
    public static readonly sendInquiry: string = ApiURIs.apiURLMS1 + '/contactUs/sendInquiry';

    
    public static readonly listProvider: string = ApiURIs.apiEndpointMS1User + '/getAllProviderList';
    public static readonly listBuyer: string = ApiURIs.apiURLMS1 + '/getAllBuyerList';

    public static readonly getUserById: string = ApiURIs.apiEndpointMS1User + '/fetchUserDetails';
    public static readonly deleteUserById: string = ApiURIs.apiEndpointMS1User + '/deleteDetail'; 
    public static readonly addUser: string = ApiURIs.apiEndpointMS1User + '/signUp_User';
    public static readonly updateUser: string = ApiURIs.apiEndpointMS1User + '/updateDetails';  
    public static readonly updateUserStatus: string = ApiURIs.apiEndpointMS1User + '/changeStatus';
}

