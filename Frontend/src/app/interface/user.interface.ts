
export interface User  {
    id: string;
    name: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    acceptedPolicy: boolean;
    acceptedTerms: boolean;
    city: City;
};
export type City = 'Derbent' | 'Madjalis' | 'Makhachkala' | 
                   'Kasumkent' | 'Belidzhi' | 'Dagestanskie_ogni' | 
                   'Izberbash'
