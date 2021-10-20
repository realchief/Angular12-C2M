export class User {
    UserId!: number;
    UserName!: string;
    FirstName!: string;
    LastName!: string;
    TimeZone!: number;
    Language!: string;
    Roles!: any[];
    APIKEY!: string;
    EmailAddress!: string;
    GroupId!: string;
    EncUserName!: string;
    EncAPIKEY!: string;
    EncToken!: string;
    AdminId!: number;
    Currency!: string;
}
export class AccessManagement{
    IsCreateDeviceProfile = true;
    IsDeviceProfileMgmt = true;
    IsManageUser = true;
    IsInvoiceCenter = true;
    IsMyWallet = true;
    IsOrderSim = true;
    IsUseCase = true;
}

