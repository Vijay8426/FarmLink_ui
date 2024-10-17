const userRole = localStorage.getItem('userRole');
const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    {
      id: 'contracts',
      title: 'Contracts',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'view-contracts',
          title: 'Contracts Signed',
          type: 'item',
          icon: 'feather icon-box',
          url: '/app/view-contracts'
        },
        ...(userRole === '2' 
          ? [
              {
                id: 'contract-response',
                title: 'Contract Response',
                type: 'item',
                icon: 'feather icon-check-square',
                url: '/app/contract-res'
              }
          ]
          : [

            ]),
            ...(userRole === '1' ?
              [
                {
                  id: 'contract-requests',
                  title: 'Contract Requests',
                  type: 'item',
                  icon: 'feather icon-file-text',
                  url: '/app/contract-req'
                }
              ]:[]
            )
      ]
    },
    {
      id: 'Tender',
      title: 'Tenders',
      type: 'group',
      icon: 'icon-group',
      children: [
        ...(userRole === '2' ? [
          {
            id: 'create-tender',
            title: 'Create Tender',
            type: 'item',
            icon: 'feather icon-book',
            url: '/app/create-tender'
          }
        ] : []),
        {
          id: 'view-tender',
          title: 'View Tender',
          type: 'item',
          icon: 'feather icon-sidebar',
          url: '/app/view-tender'
        }
      ]
    },

    ...(userRole==='1'?[{
      id: 'Payment',
      title: 'Transactions',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'Payment-farmer',
          title: 'Payments',
          type: 'item',
          icon: 'feather icon-credit-card',
          url: '/app/payment-list'
        }
  ]}]:[]),
    {
      id: 'Profile',
      title: 'Info',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          icon: 'feather icon-user',
          url: '/app/profile'
        },
        {
          id: 'chat',
          title: 'Chat',
          type: 'item',
          icon: 'feather icon-mail',
          url: '/app/chat'
        },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          children: [
            // Conditionally render Sign Up and Sign In based on accessToken
            ...(localStorage.getItem('accessToken') ? [] : [
              {
                id: 'signup-1',
                title: 'Sign up',
                type: 'item',
                icon: 'feather icon-user-plus', // Icon for Sign Up
                url: '/auth/signup-1',
                breadcrumbs: false
              },
              {
                id: 'signin-1',
                title: 'Sign in',
                type: 'item',
                icon: 'feather icon-log-in', // Icon for Sign In
                url: '/auth/signin-1',
                breadcrumbs: false
              }
            ]),
            // Always include Sign Out
            {
              id: 'signin',
              title: 'Sign Out',
              type: 'item',
              icon: 'feather icon-log-out',
              url: '/auth/signin-1',
              breadcrumbs: false // This can be changed based on your routing
            }
          ]
        },
      ]
    },
  ]
};

export default menuItems;
