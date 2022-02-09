import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ArticleIcon from '@mui/icons-material/Article';
import DateRangeIcon from '@mui/icons-material/DateRange';

const menuItems = [
  {
    heading: '',
    items: [
      {
        name: 'Overview',
        link: '/overview',
        icon: DesignServicesTwoToneIcon
      }
    ]
  },
  {
    heading: 'Dashboards',
    items: [
      {
        name: 'Tasks',
        link: '/dashboards/tasks',
        icon: BrightnessLowTwoToneIcon
      }
    ]
  },
  {
    heading: 'Management',
    items: [
      {
        name: 'Users',
        icon: PeopleAltIcon,
        link: '/management/users'
      },
      {
        name: 'Courses',
        icon: LaptopChromebookIcon,
        link: '/management/courses'
      },
      {
        name: 'Schedules',
        icon: DateRangeIcon,
        link: '/management/schedules'
      },
      {
        name: 'Instructors',
        icon: EmojiPeopleIcon,
        link: '/management/instructors'
      },
      {
        name: 'Teaching Materials',
        icon: ArticleIcon,
        link: '/management/teachingmaterials'
      },
      {
        name: 'Registrations',
        icon: HowToRegIcon,
        link: '/management/registrations'
      }
    ]
  },
  {
    heading: 'Money',
    items: [
      {
        name: 'Carts',
        icon: ShoppingCartIcon,
        link: '/money/carts'
      },
      {
        name: 'Transactions',
        icon: TableChartTwoToneIcon,
        link: '/money/transactions'
      },
      {
        name: 'Payments',
        icon: PaidIcon,
        link: '/money/payments'
      }
    ]
  },
  {
    heading: 'Extra Pages',
    items: [
      {
        name: 'Status',
        icon: VerifiedUserTwoToneIcon,
        link: '/status',
        items: [
          {
            name: 'Error 404',
            link: '/status/404'
          },
          {
            name: 'Error 500',
            link: '/status/500'
          },
          {
            name: 'Maintenance',
            link: '/status/maintenance'
          },
          {
            name: 'Coming Soon',
            link: '/status/coming-soon'
          }
        ]
      }
    ]
  }
];

export default menuItems;
