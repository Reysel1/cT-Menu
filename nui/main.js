Vue.component('animated-icon', {
  props: ['iconName'],
  template: `
    <lord-icon :src="iconSrc" trigger="loop" delay="750" colors="primary:#c6c6c6"></lord-icon>
  `,
  computed: {
    iconSrc() {
      return `https://cdn.lordicon.com/${this.iconName}.json`;
    }
  }
});

Vue.component('font-awesome-icon', {
  props: ['iconName'],
  template: `
    <i v-if="iconName"  :class="iconClass" ></i>
  `,
  computed: {
    iconClass() {
      return this.iconName;
    }
  }
});

Vue.component('image-icon', {
  props: ['iconName'],
  template: `
    <img draggable="false" v-if="iconName"  :src="iconSrc"/>
  `,
  computed: {
    iconSrc() {
      return `https://cfx-nui-qb-inventory/html/images/${this.iconName}.png`;
    }
  }
});

new Vue({
  el: '#app',
  data: {
    CurrentMenu: [],
    titleData: {
      menuTitleType: '', 
      menuTitleIcon: '',   
      menuTitle: ''
    },
    isMenuOpen: false
  },
  computed: {
    currentIconComponent() {
      switch (this.titleData.menuTitleType) {
        case 'animated':
          return 'animated-icon';
        case 'icon':
          return 'font-awesome-icon';
        case 'imageByItemName':
          return 'image-icon';
        default:
          return 'animated-icon';
      }
    }
  },
  methods: {
    getIconComponent(item) {
      if (item.menuTitleType === 'animated' || item.iconAnimated) return 'animated-icon';
      if (item.menuTitleType === 'icon' || item.icon) return 'font-awesome-icon';
      if (item.menuTitleType === 'imageByItemName' || item.imageByItemName) return 'image-icon';
      return null;
    },
    getIconProps(item) {
      if (item.menuTitleType === 'animated' || item.iconAnimated) return { iconName: item.menuTitleIcon || item.iconAnimated };
      if (item.menuTitleType === 'icon' || item.icon) return { iconName: item.menuTitleIcon || item.icon };
      if (item.menuTitleType === 'imageByItemName' || item.imageByItemName) return { iconName: item.menuTitleIcon || item.imageByItemName };
      return {};
    },
    setMenuData(menuData) {
      this.isMenuOpen = true;
      if (menuData) {
        this.CurrentMenu = menuData.menuItems;
        this.titleData = menuData.titleConfig;
      }
    },

    getIdByItem(item) {
      if (item.blocked && item.description) {
        return 'blocked'
      }

      if (item.blocked) {
        return 'blockItem'
      }

      if (item.description) {
        return 'itemDesc'
      }
    },

    doAction(action) {
      if (action.closeClick) { 
        this.closeMenu();
      }

      this.postURL('menuAction', action);
    },
    
    postURL(url, data) {
      $.post(`https://cT-Menu/${url}`, JSON.stringify({menuData: data}), (response) => {
        // console.log(response);
      });
    },

    closeMenu() {
      var close = new Audio('https://r2.fivemanage.com/QbMW9SvJrh8gWirlVt5Ee/movement-swipe-whoosh-4-186578.mp3');
      close.volume = .085;
      close.currentTime = 0;
      close.play();

      this.isMenuOpen = false;
      this.CurrentMenu = [];
      this.titleData = {};
      this.postURL('menuClose', {});
    }
  },
  mounted() {
    var swipe = new Audio('https://r2.fivemanage.com/QbMW9SvJrh8gWirlVt5Ee/infographic-swipe-1-184021.mp3');
    var click = new Audio('https://r2.fivemanage.com/QbMW9SvJrh8gWirlVt5Ee/click.mp3');
    var hover = new Audio('https://r2.fivemanage.com/QbMW9SvJrh8gWirlVt5Ee/hover.mp3');
    swipe.volume = .085;
    click.volume = .2;
    hover.volume = .7;

    $(document).on('click', '.menuItem', function() {click.currentTime = 0; click.play()});
    $(document).on('mouseenter', '.menuItem', function() {hover.currentTime = 0; hover.play()});
    
    window.addEventListener('message', (event) => {
      const { action, menuData } = event.data;
      if (action === 'createMenu') {
        this.setMenuData(menuData);
        swipe.currentTime = 0;
        swipe.play();
      } else if (action === 'closeMenu') {
        this.closeMenu();
      }
    });
    window.addEventListener('keydown', ({key}) => key === "Escape" && this.closeMenu())
  }
});