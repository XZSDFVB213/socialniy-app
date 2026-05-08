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
export enum City{
    Derbent = 'Дербент',
    Majdalis = 'Маджалис',
    Makhachkala = 'Махачкала',
    Kaspiysk = 'Каспийск',
    Izberbash = 'Избербаш'
}