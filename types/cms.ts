export interface DemographicsData {
  label: string;
  value: number;
  _key?: string;
}

export interface InstagramStats {
  _id: string;
  _type: "instagramStats";
  followers?: string;
  posts?: string;
  following?: string;
  views?: string;
  demographicsAge?: DemographicsData[];
  demographicsGender?: DemographicsData[];
}

export interface MediaKit {
  _id: string;
  _type: "mediaKit";
  reportingWindow?: string;
  dashboardWindow?: string;
  interactions?: string;
  contentShared?: string;
}

export interface PremiumExperience {
  href?: string;
  city?: string;
  _id: string;
  _type: "premiumExperience";
  title?: string;
  category?: string;
  views?: string;
  link?: string;
  image?: string;
}

export type CmsDocument = InstagramStats | MediaKit | PremiumExperience;
