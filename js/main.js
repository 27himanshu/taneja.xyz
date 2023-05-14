// require.config
require.config({paths: {
  'ht': '/js',
}});


// main.js
require([
  'ht/about',
  'ht/resume',
], (about, resume) => {
  const VALID_TAB_ITEM_IDS = ['about', /* 'resume' */]; 
  const setupSessionPersistence = () => {
    window.addEventListener('visibilitychange', (event) => {
      // get selected tab
      const selectedTab = document.querySelector('.ht-tab-bar .ht-tab-button.active');
      const selectedTabId = selectedTab.getAttribute('data-tab-id');
      localStorage.setItem('selectedTabId', selectedTabId);
    });
  };

  const setTheme = (theme) => {
    const themeButton = document.querySelector('.ht-tab-bar .ht-tab-button[data-tab-id="theme"]');
    if (theme === 'dark') {
      document.querySelector('html').classList.add('darktheme');
    } else {
      document.querySelector('html').classList.remove('darktheme');
    }
    themeButton.innerText = `${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`;
    localStorage.setItem('theme', theme);
    updateTheme();
  };

  const updateTheme = () => {
  };

  const setupTab = (selectedTabId) => {
    if (selectedTabId === 'about') {
      about.setupAboutTab(document.getElementById('.ht-tab-content[data-tab-content-id="about"]'));
    } else if (selectedTabId === 'resume') {
      resume.setupResumeTab(document.querySelector('.ht-tab-content[data-tab-content-id="resume"]'));
    }
  };

  const resizeTabContent = () => {
  };

  const layout = () => {
    updateTheme();
    resizeTabContent();
  };

  const goToTab = (evt, tabId) => {
    if (tabId === 'theme') {
      const themeButton = document.querySelector('.ht-tab-bar .ht-tab-button[data-tab-id="theme"]');
      const previousTheme = themeButton.innerText.toLowerCase().replace('theme', '').trim();
      const nextTheme = (previousTheme === 'dark' ? 'light' : 'dark');
      setTheme(nextTheme);
      return;
    }
    const tabcontent = document.getElementsByClassName('ht-tab-content');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.add('ht-hidden');
    }

    const tabButtons = document.querySelectorAll('.ht-tab-bar .ht-tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }

    const selectedTabContent = document.querySelector(`.ht-tab-content[data-tab-content-id="${tabId}"]`);
    selectedTabContent.classList.remove('ht-hidden');
    evt.currentTarget.className += ' active';
    setupTab(tabId);
    layout();
  };


  // Set selected tab
  const tabContents = document.querySelectorAll('.ht-tab-content');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.add('ht-hidden');
  }

  let selectedTabId = localStorage.getItem('selectedTabId') || 'about';
  if (VALID_TAB_ITEM_IDS.indexOf(selectedTabId)<0) {
    selectedTabId = 'about';
  }
  const selectedTabContent = document.querySelector(`.ht-tab-content[data-tab-content-id="${selectedTabId}"]`);
  selectedTabContent.classList.remove('ht-hidden');

  const selectedTabButton = document.querySelector(`.ht-tab-bar .ht-tab-button[data-tab-id="${selectedTabId}"]`);
  selectedTabButton.className += ' active';
  setupTab(selectedTabId);


  const tabButtons = document.querySelectorAll('.ht-tab-bar .ht-tab-button');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', (evt) => {
      goToTab(evt, tabButtons[i].dataset.tabId);
      evt.preventDefault();
    });
  }

  // Set Theme
  let userTheme = localStorage.getItem('theme');
  if (userTheme === null) {
    userTheme = 'dark';
  }
  setTheme(userTheme);

  // Show main container
  const mainContainer = document.querySelector('.ht-main-container');

  mainContainer.style.display = 'flex';
  resizeTabContent();

  // setup session persistence
  setupSessionPersistence();
});
