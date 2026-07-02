const etMenuPdf = new URL('../../raim_ruudus_menüü.pdf', import.meta.url).href;
const enMenuPdf = new URL('../../raim_ruudus_menu_en.pdf', import.meta.url).href;
const etMenuPage1Pdf = new URL('../../raim_ruudus_menu_et_page_1.pdf', import.meta.url).href;
const etMenuPage2Pdf = new URL('../../raim_ruudus_menu_et_page_2.pdf', import.meta.url).href;
const enMenuPage1Pdf = new URL('../../raim_ruudus_menu_en_page_1.pdf', import.meta.url).href;
const enMenuPage2Pdf = new URL('../../raim_ruudus_menu_en_page_2.pdf', import.meta.url).href;

const menuAssetSets = {
  et: {
    pdf: etMenuPdf,
    pages: [etMenuPage1Pdf, etMenuPage2Pdf],
  },
  en: {
    pdf: enMenuPdf,
    pages: [enMenuPage1Pdf, enMenuPage2Pdf],
  },
};

export const menuAssets = menuAssetSets.et;

export function getMenuAssets(lang = 'et') {
  return menuAssetSets[lang] || menuAssetSets.et;
}
