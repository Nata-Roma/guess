export const btnHome = [
  {
    name: 'artists',
    content: 'Artists',
  },
  {
    name: 'masterpieces',
    content: 'Masterpieces',
  },
  {
    name: 'settings',
    content: 'Settings',
  },
];

export const btnSettings = [
  {
    name: 'save',
    content: 'Save',
  },
  {
    name: 'cancel',
    content: 'Cancel',
  },
];

export const settings = {
  initVolume: '15',
  initTime: '20',
  music: {
    name: 'Music',
    icons: [
      {
        name: 'music-off',
        status: false,
        order: 'order-1',
      },
      {
        name: 'music',
        status: true,
        order: 'order-3',
      },
    ],
  },
  sound: {
    name: 'Sounds',
    icons: [
      {
        name: 'music-note-off',
        status: false,
        order: 'order-1',
      },
      {
        name: 'music-note',
        status: true,
        order: 'order-3',
      },
    ],
  },
};

export const enableSound = [
  [
    {
      name: settings.music.icons[0].name,
      status: true,
    },
    {
      name: settings.music.icons[1].name,
      status: false,
    },
  ],
  [
    {
      name: settings.sound.icons[0].name,
      status: true,
    },
    {
      name: settings.sound.icons[1].name,
      status: false,
    },
  ],
];

export const settingState = {
  music: {
    isMusic: false,
    volume: 0,
  },
  sound: {
    isSound: false,
    volume: 0,
  },
  timer: {
    isTimer: false,
    time: '20',
  },
};
