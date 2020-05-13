export const data = [
  {
    id: 'dashboard',
    icon: 'simple-icon-bell',
    label: 'menu.dashboard',
    to: '/app/admin/dashboard',
  },
  {
    id: 'agency',
    icon: 'iconsminds-home-1',
    label: 'menu.agency',
    to: '/app/admin/agency',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'menu.profile',
        to: '/app/admin/agency/list',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.ad',
        to: '/app/admin/agency/announcements',
      },
    ],
  },
  {
    id: 'agent',
    icon: 'simple-icon-briefcase',
    label: 'menu.agent',
    to: '/app/admin/agent',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'menu.profile',
        to: '/app/admin/agent/list',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.creci-requests',
        to: '/app/admin/creci-requests',
      },
    ],
  },
  {
    id: 'users',
    icon: 'iconsminds-mens',
    label: 'menu.users',
    to: '/app/admin/users',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'menu.users.sub',
        to: '/app/admin/users/list',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.ad',
        to: '/app/admin/users/announcements',
      },
    ],
  },
  {
    id: 'subscriptions',
    icon: 'iconsminds-handshake',
    label: 'menu.subscriptions',
    to: '/app/admin/subscriptions',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'menu.agent',
        to: '/app/admin/subscriptions/agent',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.agency',
        to: '/app/admin/subscriptions/agency',
      },
    ],
  },
  {
    id: 'plans',
    icon: 'iconsminds-check',
    label: 'menu.plans',
    to: '/app/admin/plans',
  },
  {
    id: 'transactions',
    icon: 'iconsminds-coins',
    label: 'menu.transactions',
    to: '/app/admin/transactions',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'menu.agent',
        to: '/app/admin/transactions/agent',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.agency',
        to: '/app/admin/transactions/agency',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.users',
        to: '/app/admin/transactions/users',
      },
    ],
  },
  {
    id: 'ratings',
    icon: 'simple-icon-star',
    label: 'menu.evaluations',
    to: '/app/admin/ratings',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'menu.agent',
        to: '/app/admin/ratings/agent',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.properties',
        to: '/app/admin/ratings/properties',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.users',
        to: '/app/admin/ratings/users',
      },
    ],
  },
  {
    id: 'issues',
    icon: 'simple-icon-question',
    label: 'menu.issues',
    to: '/app/admin/issues',
  },
];

export const dataAgency = [
  {
    id: 'dashboard',
    icon: 'simple-icon-bell',
    label: 'menu.dashboard',
    to: '/app/agency/dashboard',
  },
  {
    id: 'agent',
    icon: 'simple-icon-briefcase',
    label: 'menu.agent',
    to: '/app/agency/agent',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'menu.profile',
        to: '/app/agency/agent/list',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.corretagem',
        to: '/app/agency/agent/brokerage',
      },
    ],
  },
  {
    id: 'ads',
    icon: 'iconsminds-megaphone',
    label: 'menu.ad',
    to: '/app/agency/announcements',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'menu.ad-registered',
        to: '/app/agency/announcements/list',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.ad-sold',
        to: '/app/agency/announcements/sold',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.ad-disabled',
        to: '/app/agency/announcements/disabled',
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.ad-info-sold',
        to: '/app/agency/announcements/soldRequest',
      },
    ],
  },
  {
    id: 'subscriptions',
    icon: 'iconsminds-handshake',
    label: 'menu.subscriptions',
    to: '/app/agency/subscriptions',
  },
  {
    id: 'mydata',
    icon: 'iconsminds-administrator',
    label: 'menu.mydata',
    to: '/app/agency/account',
  },
];

export const dataAgencyNoAuth = [
  {
    id: 'dashboard',
    icon: 'simple-icon-bell',
    label: 'menu.waiting',
    to: '/app/agency/waiting',
  },
  {
    id: 'mydata',
    icon: 'iconsminds-administrator',
    label: 'menu.mydata',
    to: '/app/agency/account',
  },
];
