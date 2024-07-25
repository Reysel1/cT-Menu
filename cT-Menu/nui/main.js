Vue.component('animated-icon', {
  props: ['iconName'],
  template: `
    <lord-icon  :src="iconSrc" trigger="loop" delay="750" colors="primary:#bbbbbb"></lord-icon>
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
    <img v-if="iconName"  :src="iconSrc"/>
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
        console.log('block and desc')
        return 'blockItemDesc'
      }

      if (item.blocked) {
        console.log('no desc')
        return 'blockItem'
      }

      if (item.description) {
        console.log('no block')
        return 'itemDesc'
      }




    },

    doAction(action) {

      if (action.blocked) {
        return this.Notify('This item is blocked', 'error');
      }

      this.postURL('menuAction', action);
    },
    
    postURL(url, data) {
      $.post(`https://cT-Menu/${url}`, JSON.stringify({menuData: data}), (response) => {
        console.log(response);
      });
    },

    Notify(text, type) {

      this.postURL('notify', {text: text, type: type});

    },

    closeMenu() {
      this.isMenuOpen = false;
      this.CurrentMenu = [];
      this.titleData = {};
      this.postURL('menuClose', {});
    }
  },
  mounted() {
    window.addEventListener('message', (event) => {
      const { action, menuData } = event.data;
      if (action === 'createMenu') {
        this.setMenuData(menuData);
      } else if (action === 'closeMenu') {
        this.closeMenu();
      }
    });
    window.addEventListener('keydown', ({key}) => key === "Escape" && this.closeMenu())
  }
});
