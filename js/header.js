export const handleFixedHeader = (state) => {
  const lastScrollY = state.uiState.currentScrollY;
  const currentScrollY = window.scrollY;

  return { lastScrollY, currentScrollY };
};

const renderHeader = (
  state,
  header,
  fixedHeaderHeightAppearance,
  defaultHeaderHeight,
  e = null,
) => {
  const { currentScrollY, lastScrollY } = state.uiState;

  if (currentScrollY > fixedHeaderHeightAppearance) {
    header.classList.add('header--fixed');
    header.classList.add('header--show-fixed');
    header.classList.remove('header--hide-fixed');
  }

  if (currentScrollY < lastScrollY && currentScrollY <= fixedHeaderHeightAppearance) {
    header.classList.remove('header--show-fixed');
    header.classList.add('header--hide-fixed');
  }

  if (currentScrollY < lastScrollY && currentScrollY <= defaultHeaderHeight) {
    header.classList.remove('header--hide-fixed');
    header.classList.remove('header--fixed');
  }

  if (e && e.animationName === 'disappear-header') {
    header.classList.remove('header--fixed');
  }
};

export default renderHeader;
