const base = import.meta.env.BASE_URL;

export const menuAssets = {
  pdf: `${base}raim-ruudus-menu.pdf`,
  pages: [
    {
      src: `${base}raim-ruudus-menu-page-1.png`,
      alt: 'Räim Ruudus menüü ja hinnakiri, leht 1',
    },
    {
      src: `${base}raim-ruudus-menu-page-2.png`,
      alt: 'Räim Ruudus menüü ja hinnakiri, leht 2',
    },
  ],
};
