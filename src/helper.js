export const findClub = (clubs = [], clubId) =>
clubs.find((club) => club.id === clubId);

export const findSchoolClubs = (clubs = [], school) =>
clubs.filter((club) => club.school == school)

export const clubsFoundFromSearch = (clubs = [], clubName) =>
clubs.filter(
  (club) =>
    club.name.toLowerCase().includes(clubName.toLowerCase()) ||
    club.topic.toLowerCase().includes(clubName.toLowerCase()) ||
    club.description.toLowerCase().includes(clubName.toLowerCase())
);