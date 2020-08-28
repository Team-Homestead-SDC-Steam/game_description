exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(() => {
      // Inserts seed entries
      return knex('companies').insert([
        { id: 1, company: 'Nintendo' },
        { id: 2, company: 'Konami' },
        { id: 3, company: 'Valve' },
        { id: 4, company: 'Rockstar Games' },
        { id: 5, company: 'Activision' },
        { id: 6, company: 'Ubisoft' },
        { id: 7, company: 'BioWare' },
        { id: 8, company: 'Naughty Dog' },
        { id: 9, company: 'Square Enix' },
        { id: 10, company: 'Bungie' },
        { id: 11, company: 'Mojang' },
        { id: 12, company: 'Take-Two Interactive' },
        { id: 13, company: 'Blizzard Entertainment' },
        { id: 14, company: 'Bethesda' },
        { id: 15, company: 'Grinding Gear Games' },
        { id: 16, company: 'Aspyr' },
        { id: 17, company: 'Annapurna Interactive' },
        { id: 18, company: 'Mobius Digital' },
        { id: 19, company: 'Microsoft' },
        { id: 21, company: 'Electric Arts' },
        { id: 22, company: 'RedSpotGames' },
        { id: 23, company: 'Acheron Design' },
        { id: 24, company: 'THQ' },
        { id: 25, company: 'Panasonic' },
        { id: 26, company: 'Hero Concept' },
        { id: 27, company: 'Ngmoco' },
        { id: 28, company: 'Maxis' },
        { id: 29, company: 'Riot' },
        { id: 30, company: 'PopCap Games' },
        { id: 31, company: 'Zynga' },
        { id: 32, company: 'Harmonix' },
        { id: 33, company: 'PlayFirst' },
        { id: 34, company: 'Obeorn Media' },
        { id: 35, company: 'Ludia' },
        { id: 36, company: 'Sulake' },
        { id: 37, company: 'Gaikai' },
        { id: 38, company: 'Epic Games' },
        { id: 39, company: 'Alawar' },
        { id: 40, company: 'Portalarium' },
        { id: 41, company: 'Smule' },
        { id: 42, company: 'Atari' },
        { id: 43, company: 'Ritual' },
        { id: 44, company: 'Yousician' },
        { id: 45, company: 'Gamevil' },
        { id: 46, company: 'Kaneva' },
        { id: 47, company: 'Mentez' },
        { id: 48, company: 'Spicy Horse' },
        { id: 49, company: 'Activision' },
        { id: 50, company: 'Cellufun' }

      ]);
    });
};
