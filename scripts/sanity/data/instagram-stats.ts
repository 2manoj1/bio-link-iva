import { InstagramStats } from "../../../types/cms";

export const instagramStatsData: InstagramStats = {
  _id: "singleton-instagram-stats",
  _type: "instagramStats",
  followers: "82.9K",
  posts: "870",
  following: "1,750",
  views: "2.7M",
  demographicsAge: [
    { label: "13-17", value: 4, _key: "age-13-17" },
    { label: "18-24", value: 38, _key: "age-18-24" },
    { label: "25-34", value: 42, _key: "age-25-34" },
    { label: "35-44", value: 12, _key: "age-35-44" },
    { label: "45+", value: 4, _key: "age-45-plus" },
  ],
  demographicsGender: [
    { label: "Female", value: 68, _key: "gen-female" },
    { label: "Male", value: 32, _key: "gen-male" },
  ],
};
